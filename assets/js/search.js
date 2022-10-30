/* Search script */



// Queries

const googleQuery = 'https://www.google.com/search?hl=en&q=';
const youtubeQuery = 'https://www.youtube.com/results?search_query=';

// Btns

const ytBtn = i('youtube');
const GlBtn = i('google');

// Get link
function getYoutube(value) {
    return youtubeQuery + value;
}

function getGoogle(value) {
    return googleQuery + value;
}

function SearchPlatform(plat, value) {
    if(plat === 'youtube') return getYoutube(value);
    else if(plat === 'google') return getGoogle(value);
}

ytBtn.addEventListener('click', function() {
    var value = inputField.value;
    var parent = this.parentElement;
    if(value) {
        var href = getYoutube(inputField.value);
        parent.setAttribute('href', href);
        setTimeout(() => parent.removeAttribute('href'), 0);
        updateRecentSearch(value, 'youtube');
        displayRecentSearch();
    }
});

GlBtn.addEventListener('click', function() {
    var value = inputField.value;
    var parent = this.parentElement;
    if(value) {
        var href = getGoogle(inputField.value);
        parent.setAttribute('href', href);
        setTimeout(() => parent.removeAttribute('href'), 10);
        updateRecentSearch(value,'google');
        displayRecentSearch();
    }
});

// Display recent Search

const recentContainer = q('.recent-search');
const recent = i('recent-search');

displayRecentSearch();

function displayRecentSearch() {
    var loc = localStorage.getItem('recent'), arr;
    arr = loc ? JSON.parse(loc) : [];
    if(arr.length) {
        recent.innerHTML = '';
        recentContainer.style.display = 'block';

        for(var i = 0; i < arr.length; i++) {
            var el = arr[i];
            var a = document.createElement('a');
            a.setAttribute('href', SearchPlatform(el.plat, el.value));
            a.setAttribute('target', '_blank');
            a.innerHTML = `
            <button class="btn-plat" role="button">
            <span>${el.value}</span>
            <img src="imgs/${el.plat}.svg" alt="" class="img">
            </button>
            `
            recent.appendChild(a);
        }
    }

    else {
        recentContainer.style.display = 'none';
    }
}

//
// Store recent searchs
//

function updateRecentSearch(value, platform) {
    var loc = localStorage.getItem('recent'), arr;
    arr = loc ? JSON.parse(loc) : [];

    var obj = {
        value: value,
        plat: platform
    }

    arr.push(obj);
    arr = arr.slice(-recentCount);

    localStorage.setItem('recent', JSON.stringify(arr));
}