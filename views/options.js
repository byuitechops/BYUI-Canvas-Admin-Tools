/**************************
 *         getJson
 * 
 * Read in the JSON file containing
 * all the information to build
 * the options page.
 * 
 **************************/
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

/*******************************
 *          colorItem
 * 
 * Change the color of the checkbox
 * when an option is selected.
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
 *          saveOptions
 * 
 * Saves options to chrome.storage
 * when one of the options is
 * selected.
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

function showUpdateInfo() {
    // This gives the computed value of the element. 
    let right = window.getComputedStyle(document.querySelector('.all-updates-info')).getPropertyValue('right');
    let box = document.querySelector('.all-updates-info').style;
    console.log(right);

    let rightNum = parseInt(right.substring(0, right.length - 2));

    if (rightNum < 0) {
        box.animation = 'slidein .25s linear forwards';
        // box.display = 'block';
    } else if (rightNum >= 0) {
        box.animation = 'slideout .25s linear forwards';
    }

    // // I'll look into this a little more in the future. It's a different way of doing the transition/animation.
    // if (box.width == 0 || box.width == '0px') {
    //     box.width = '25%';
    //     document.querySelector('.all-updates-info').style.boxShadow = '0px 10px 16px 5px rgba(0,0,0,0.2)';
    // } else {
    //     document.querySelector('.all-updates-info').style.boxShadow = 'none';
    //     box.width = '0';
    // }

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


/********************************
 * 
 * Creates the options page based
 * on the information in options.json.
 * It also sets up the event listeners
 * on each switch for color changing
 * and setting chrome storage.
 *
 ********************************/
getJson().then(data => {
    data = JSON.parse(data);
    createPage(data.details, data.update);
    return data;
}).then(data => {
    getOptions(data.details);
    document.querySelectorAll('.switch').forEach(el => el.addEventListener('click', colorItem));
    document.querySelectorAll('.switch').forEach(el => el.addEventListener('click', () => {
        saveOptions(data.details);
    }));

    document.querySelector('#allUpdates').addEventListener('click', () => {
        // Add popup type thing with the short descriptions of each update with the version number
        showUpdateInfo();

        if (document.querySelector('.all-updates-info ul').style.display == 'none') {
            setTimeout(() => {
                document.querySelector('.all-updates-info ul').style.display = 'unset';
                document.querySelector('#update_container').style.display = 'none';
            }, 250);
        }
    });

    document.querySelector('#exit').addEventListener('click', () => {
        showUpdateInfo();
    });

    // Check if the extension was just installed or updated
    if (bg === 'installed') {
        console.log('First Load');
        firstOpen(data.install);
    } else if (bg === 'updated') {
        updated(data.update[0]);
        console.log('Not the first load');
    }
});



// document.addEventListener('DOMContentLoaded', () => {
//     getOptions(features);
//     document.querySelectorAll('.switch').forEach(el => el.addEventListener('click', colorItem));
//     document.querySelectorAll('.switch').forEach(el => el.addEventListener('click', saveOptions));
// });