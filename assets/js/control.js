/* Control Script */

const inputField = i('input');

// 
// Update input font size
// 

var inputFontSize = 22;
const maxFontSize = 32;

updateInpFontSize();

// Font size buttons control

i('increase-size').addEventListener('click', function() {
    increaseFontSize();
    moveCursorEnd(inputField.value.length);
});
i('decrease-size').addEventListener('click', function() {
    decreaseFontSize();
    moveCursorEnd(inputField.value.length);
});

function updateInpFontSize() {
    inputField.style.fontSize = `${inputFontSize}px`;
    i('fsize-count').innerHTML = inputFontSize;
}

// Increase input font size
function increaseFontSize() {
    inputFontSize++;
    if(inputFontSize > maxFontSize) {inputFontSize = maxFontSize};
    updateInpFontSize();
}

// Decrease input font size
function decreaseFontSize() {
    inputFontSize--;
    if(inputFontSize < 16) inputFontSize = 16;
    updateInpFontSize();
}

// 
// Display buttons
// 

createBtns();

function createBtns() {
    var arrRows = Object.keys(keys);
    
    for(var i = 0; i < rows;i++) {
        var row = document.createElement('div');
        row.classList.add('row');

        for(var j = 0; j < keys[arrRows[i]].length;j++) {
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

keysEl.forEach(e => e.addEventListener('click', function() {
    readKey(this.dataset.key);
}))

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
i('copy').addEventListener('click', function() {
    copyToClipboard(inputField.value);
})

function copyToClipboard(text = '') {
    if(text) {
        var inp = document.createElement('input');
        inp.value = text;
        b.appendChild(inp);
        inp.select();
        document.execCommand('copy');
        b.removeChild(inp);
        alert(`${text} copied to clipboard`);
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
    inputField.value = inputField.value.slice(0,-1);
    moveCursorEnd(inputField.value.length);
}

// Focus 
inputField.addEventListener('focus', function() {
    moveCursorEnd(this.value.length);
})