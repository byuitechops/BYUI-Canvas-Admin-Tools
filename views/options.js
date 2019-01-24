function getJson() {
    return new Promise((resolve, reject) => {
        let extId = chrome.runtime.id;

        function receive() {
            let stuff = this.response;
            resolve(stuff);
        }

        function onError(err) {
            console.error(err);
        }

        var request = new XMLHttpRequest();
        request.addEventListener('load', receive);
        request.addEventListener('error', onError);
        request.open('GET', `chrome-extension://${extId}/options.json`);
        request.send();
    });
}

getJson().then(el => {
    let features = JSON.parse(el).details;
    createPage(features);
    return features;
}).then(features => {
    getOptions(features);
    document.querySelectorAll('.switch').forEach(el => el.addEventListener('click', colorItem));
    document.querySelectorAll('.switch').forEach(el => el.addEventListener('click', () => {
        saveOptions(features);
    }));
});

/*******************************
 * 
 * 
 * Change the color of the checkbox
 * 
********************************/
function colorItem(event) {
    let el;
    if (event.target) {
        el = event.target;
    } else {
        el = event;
    }
    if (el.nodeName === 'INPUT') {
        console.log(el.nodeName);
        if (el.checked) {
            el.parentNode.style.backgroundColor = '#42aaf4';
        } else {
            el.parentNode.style.backgroundColor = '#666';
        }
    }
}


/********************************
 * 
 * 
 * Saves options to chrome.storage
 * 
********************************/
function saveOptions(features) {
    let checkedFeatures = features.reduce((acc, curr) => {
        acc[curr.id] = document.querySelector(`#${curr.id}`).checked;
        return acc;
    }, {});

    chrome.storage.sync.set(
        checkedFeatures);
}


/********************************
 *
 * Gets options from chrome.storage
 * Null value on the "get" returns all of the items
 *
 ********************************/
function getOptions(features) {
    chrome.storage.sync.get(null, items => {
        features.forEach(curr => {
            document.querySelector(`#${curr.id}`).checked = items[curr.id];
        });
        document.querySelectorAll('.switch>input').forEach(colorItem);
    });
}

/********************************
 *
 * Check to see if the extension
 * was just downloaded or updated.
 * If one of those things is true,
 * it will add some stuff to the
 * page to help with navigation. 
 *
 ********************************/
let bg = chrome.extension.getBackgroundPage().firstLoad();
if (bg === 'installed') {
    console.log('First Load');
    firstOpen();
} else if (bg === 'updated') {
    updated();
    console.log('Not the first load');
}

// document.addEventListener('DOMContentLoaded', () => {
//     getOptions(features);
//     document.querySelectorAll('.switch').forEach(el => el.addEventListener('click', colorItem));
//     document.querySelectorAll('.switch').forEach(el => el.addEventListener('click', saveOptions));
// });