"use strict";

/* Tools script */

var q = document.querySelector.bind(document);
var i = document.getElementById.bind(document);
var qa = document.querySelectorAll.bind(document);
var b = document.body;

// Display buttons variables

var rows = 4;
var keys = {
  row1: ['ص', 'ش', 'س', 'ز', 'ر', 'ذ', 'د', 'خ', 'ح', 'ج', 'ث', 'ت', 'ب', 'ا'],
  row2: ['ي', 'و', 'ه', 'ن', 'م', 'ل', 'ك', 'ق', 'ف', 'غ', 'ع', 'ظ', 'ط', 'ض'],
  row4: ['٠', '٩', '٨', '٧', '٦', '٥', '٤', '٣', '٢', '١', '؟', '؛', '،', '.'],
  row3: ['ء', 'ؤ', 'ى', 'ئ', 'Space', 'ة', 'آ', 'إ', 'أ']
};

// Recent search

var recentCount = 5;
/* Control Script */

var inputField = i('input');

// 
// Update input font size
// 

var inputFontSize = 22;
var maxFontSize = 32;
updateInpFontSize();

// Font size buttons control

i('increase-size').addEventListener('click', function () {
  increaseFontSize();
  moveCursorEnd(inputField.value.length);
});
i('decrease-size').addEventListener('click', function () {
  decreaseFontSize();
  moveCursorEnd(inputField.value.length);
});
function updateInpFontSize() {
  inputField.style.fontSize = "".concat(inputFontSize, "px");
  i('fsize-count').innerHTML = inputFontSize;
}

// Increase input font size
function increaseFontSize() {
  inputFontSize++;
  if (inputFontSize > maxFontSize) {
    inputFontSize = maxFontSize;
  }
  ;
  updateInpFontSize();
}

// Decrease input font size
function decreaseFontSize() {
  inputFontSize--;
  if (inputFontSize < 16) inputFontSize = 16;
  updateInpFontSize();
}

// 
// Display buttons
// 

createBtns();
function createBtns() {
  var arrRows = Object.keys(keys);
  for (var i = 0; i < rows; i++) {
    var row = document.createElement('div');
    row.classList.add('row');
    for (var j = 0; j < keys[arrRows[i]].length; j++) {
      // Create btn
      var k = keys[arrRows[i]][j];
      var btn = document.createElement('button');
      btn.classList.add('btn-key');
      btn.setAttribute('data-key', k);
      btn.textContent = k;
      // Append btn
      row.appendChild(btn);
    }
    q('.keyboard').appendChild(row);
  }
}

// Add space key and numbers collapse element

addSpaceKey();
function addSpaceKey() {
  var space = q('[data-key="Space"]');
  space.classList.add('btn-space');
  space.innerHTML = '&nbsp;';
  space.dataset.key = ' ';
}

// 
// Read key
// 

var keysEl = qa('[data-key]');
keysEl.forEach(function (e) {
  return e.addEventListener('click', function () {
    readKey(this.dataset.key);
  });
});
function readKey(key) {
  inputField.value += key;
  moveCursorEnd(inputField.value.length);
}
function moveCursorEnd(leng) {
  inputField.focus();
  inputField.setSelectionRange(leng, leng);
}

// 
// Text control
// 

// Copy to clipboard
i('copy').addEventListener('click', function () {
  copyToClipboard(inputField.value);
});
function copyToClipboard() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  if (text) {
    var inp = document.createElement('input');
    inp.value = text;
    b.appendChild(inp);
    inp.select();
    document.execCommand('copy');
    b.removeChild(inp);
    alert("".concat(text, " copied to clipboard"));
  }
}

// Clear input
i('clear').addEventListener('click', clearInp);
function clearInp() {
  inputField.value = '';
  moveCursorEnd(inputField.value.length);
}

// Backspace

i('back').addEventListener('click', backspace);
function backspace() {
  inputField.value = inputField.value.slice(0, -1);
  moveCursorEnd(inputField.value.length);
}

// Focus 
inputField.addEventListener('focus', function () {
  moveCursorEnd(this.value.length);
});
/* Search script */

// Queries

var googleQuery = 'https://www.google.com/search?hl=en&q=';
var youtubeQuery = 'https://www.youtube.com/results?search_query=';

// Btns

var ytBtn = i('youtube');
var GlBtn = i('google');

// Get link
function getYoutube(value) {
  return youtubeQuery + value;
}
function getGoogle(value) {
  return googleQuery + value;
}
function SearchPlatform(plat, value) {
  if (plat === 'youtube') return getYoutube(value);else if (plat === 'google') return getGoogle(value);
}
ytBtn.addEventListener('click', function () {
  var value = inputField.value;
  var parent = this.parentElement;
  if (value) {
    var href = getYoutube(inputField.value);
    parent.setAttribute('href', href);
    setTimeout(function () {
      return parent.removeAttribute('href');
    }, 0);
    updateRecentSearch(value, 'youtube');
    displayRecentSearch();
  }
});
GlBtn.addEventListener('click', function () {
  var value = inputField.value;
  var parent = this.parentElement;
  if (value) {
    var href = getGoogle(inputField.value);
    parent.setAttribute('href', href);
    setTimeout(function () {
      return parent.removeAttribute('href');
    }, 10);
    updateRecentSearch(value, 'google');
    displayRecentSearch();
  }
});

// Display recent Search

var recentContainer = q('.recent-search');
var recent = i('recent-search');
displayRecentSearch();
function displayRecentSearch() {
  var loc = localStorage.getItem('recent'),
    arr;
  arr = loc ? JSON.parse(loc) : [];
  if (arr.length) {
    recent.innerHTML = '';
    recentContainer.style.display = 'block';
    for (var i = 0; i < arr.length; i++) {
      var el = arr[i];
      var a = document.createElement('a');
      a.setAttribute('href', SearchPlatform(el.plat, el.value));
      a.setAttribute('target', '_blank');
      a.innerHTML = "\n            <button class=\"btn-plat\" role=\"button\">\n            <span>".concat(el.value, "</span>\n            <img src=\"imgs/").concat(el.plat, ".svg\" alt=\"\" class=\"img\">\n            </button>\n            ");
      recent.appendChild(a);
    }
  } else {
    recentContainer.style.display = 'none';
  }
}

//
// Store recent searchs
//

function updateRecentSearch(value, platform) {
  var loc = localStorage.getItem('recent'),
    arr;
  arr = loc ? JSON.parse(loc) : [];
  var obj = {
    value: value,
    plat: platform
  };
  arr.push(obj);
  arr = arr.slice(-recentCount);
  localStorage.setItem('recent', JSON.stringify(arr));
}