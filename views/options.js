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
            reject();
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
            el.parentNode.style.backgroundColor = 'var(--blue1)';
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
 *      getOptions(features)
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

/******************************
 *        showUpdate()
 * 
 * Will show the update div on
 * the options page. 
 * It adds a shadow covering the
 * other elements of the page,
 * and makes them unaccessible.
 * It then adds an event listener
 * on the shadow so when you click
 * the shadow, it will exit the 
 * updates div and show the rest
 * of the page.
 ******************************/
function showUpdate() {
    // Variables
    let box = document.querySelector('.all-updates-info'),
        shadow;

    // Move udpdate div to be visible
    box.style.animation = 'slidein .25s linear forwards';

    // Create shadow div for a shadow around everything except update div
    shadow = maskAllExcept(document.querySelector('.all-updates-info'));

    // Create event listener for clicking the shadow div that will close the update div and remove the shadow div
    shadow.addEventListener('click', () => {
        hideUpdate();
    });

}

/********************************
 *         hideUpdate()
 * 
 * Hides the div that displays 
 * information about the all 
 * the updates.
 * Removes the shadow element.
 * 
 ********************************/
function hideUpdate() {
    // Variables
    let box = document.querySelector('.all-updates-info');
    let allUpdates = document.querySelector('#all-updates-container');
    let singleUpdate = document.querySelector('#update_container');
    let shadow = document.querySelector('#shadow');

    // Move update div off the page
    box.style.animation = 'slideout .25s linear forwards';

    // Remove the box shadow around the updates div
    box.style.boxShadow = 'unset';

    // Remove the Shadow div
    document.querySelector('body').removeChild(shadow);

    // Change the contents of the div to show the main update page if specific information is displayed
    // set timeout 250 before changing contents.
    if (singleUpdate && singleUpdate.style.display !== 'none') {
        setTimeout(() => {
            hideOneShowAnother(singleUpdate, allUpdates);
        }, 250);
    }
}

/****************************
 *   hideOneShowAnother(hide,show,action)
 * 
 * Hides or shows an element that
 * you specify. If no action is
 * declared, it will hide the first
 * and show the second elements.
 * 
 * @param {} hide 
 * @param {} show  
 * @param {string} action - 'hide', 'show'
 * 
 ****************************/
function hideOneShowAnother(hide, show = null, action = 'both') {
    switch (action) {
        case 'hide':
            hide.style.display = 'none';
            if (show) show.style.display = 'none';
            break;
        case 'show':
            hide.style.display = 'grid';
            if (show) show.style.display = 'grid';
            break;
        default:
            hide.style.display = 'none';
            show.style.display = 'grid';
            break;
    }
}

/******************************
 *     maskAllExcept(div)  
 *  *Drawn from stackoverflow*  
 * https://stackoverflow.com/questions/22249885/disable-everything-except-a-div-element#answer-22249975
 * 
 * Inserts a div behind the element
 * included as a parameter. 
 * The div will add a shadow over 
 * page, and will block everything
 * else on the page.
 * 
 * return value: HTMLDivElement
 * 
 * @param {*} div - Element to put in front of div
 * @returns {DOM Element} The DOM element containing the shadow
 ******************************/
function maskAllExcept(div) {
    console.log(div);
    var shadow = document.createElement('div');
    shadow.id = 'shadow';
    shadow.style.position = "absolute";
    shadow.style.left = shadow.style.right = shadow.style.top = shadow.style.bottom = "0";
    shadow.style.height = shadow.style.width = '100%';
    shadow.style.backgroundColor = 'rgba(0, 0, 0, .5)';
    shadow.style.zIndex = 1000;
    div.style.zIndex = 1001;
    document.body.appendChild(shadow);
    return shadow;
}

/******************************
 *     showFeedbackDiv()
 * 
 * Show the feedback div
 * 
 * return value: void
 ******************************/
function showFeedbackDiv() {
    let div = document.querySelector('#feedback-div');
    let shadow = maskAllExcept(document.querySelector('#feedback-div'));
    shadow.addEventListener('click', () => {
        document.querySelector('body').removeChild(shadow);
        hideOneShowAnother(div, null, 'hide');
    });
    hideOneShowAnother(div, null, 'show');
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
let bg = chrome.extension.getBackgroundPage();
bg = bg ? chrome.extension.getBackgroundPage().firstLoad() : null;

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
    // document.querySelectorAll('.switch').forEach(el => el.addEventListener('click', colorItem));
    document.querySelectorAll('.switch').forEach(el => el.addEventListener('click', (el) => {
        colorItem(el);
        saveOptions(data.details);
    }));

    // Div containing information about the different udpates
    document.querySelector('#allUpdates').addEventListener('click', () => {
        // Add popup type thing with the short descriptions of each update with the version number
        showUpdate();
    });

    // Exit Update div
    document.querySelector('#exit').addEventListener('click', () => {
        hideUpdate();
    });

    // Each update number
    // Displays the extended information about the selected update
    document.querySelectorAll('#update_list li span').forEach(el => {
        el.addEventListener('click', () => {
            let allUpdates = document.querySelector('#all-updates-container');
            hideOneShowAnother(allUpdates, null, 'hide');
            updated(data.update[el.id]);
        });
    });

    // Shows a div containing a feedback form
    document.querySelector('.feedback-button').addEventListener('click', () => {
        showFeedbackDiv();
    });

    // Check if the extension was just installed or updated
    if (bg === 'installed') {
        // Not being used right now
        firstOpen(data.install);
    } else if (bg === 'updated') {
        updated(data.update[0]);
        let allUpdates = document.querySelector('#all-updates-container');
        hideOneShowAnother(allUpdates, null, 'hide');
    }
});