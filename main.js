/**
 * 
 * @param {*} event 
 */
function setItem(event) {
    var itemID = event.target.id;
    var storageInfo = {};

    storageInfo[itemID] = `${event.target.checked}`;

    chrome.storage.sync.set(storageInfo, (items) => {
        if (chrome.runtime.error) {
            console.log(chrome.runtime.error);
        }
        console.log(items);
    });
}

/**
 * Get the information from chrome
 * storage. If the elements haven't
 * been declared as visible, hide them.
 */
chrome.storage.sync.get({
    deleteQuizQuestions: false,
    killQuizzes: false,
    blueprintLockItems: false,
    divsToQuestions: false,
    adminAccountNames: false
}, function (items) {
    if (items.deleteQuizQuestions === false) {
        document.querySelector('#quizQuestionsDelete').style.display = 'none';
    }
    if (items.killQuizzes === false) {
        document.querySelector('#killQuizzes').style.display = 'none';
    }
    if (items.blueprintLockItems === false) {
        document.querySelector('#blueprintLockItems').style.display = 'none';
    }
    if (items.divsToQuestions === false) {
        document.querySelector('#addDivsToQuestions').style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    var buttons = document.querySelectorAll('button');
    var tabId = 0;
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, tabs => {
        tabId = tabs[0].id;
    });



    // Adds an event listener for each button in popup.html
    buttons.forEach(b => {
        b.addEventListener('click', () => {
            let buttonAction = b.id;
            // Sends a message with the button's ID to listener.js

            chrome.tabs.sendMessage(tabId, buttonAction, response => {
                console.log(response);
            });
        });
    });


    document.querySelector('#menuIcon').addEventListener('click', () => {
        chrome.runtime.openOptionsPage();
    });

    document.querySelector('#menuIcon').addEventListener('mouseover', () => {
        document.querySelector('#menuImg').style.transform = 'rotate(135deg)';
        // This is fancy code to grab the SVG and change its color
        // the class .st0 is the class found in the svg text (navigate to Cog.svg in VS code to see it)
        document.querySelector('#menuImg').getSVGDocument().querySelector(".st0").style.setProperty("fill", "#0076c6");
    });
    document.querySelector('#menuIcon').addEventListener('mouseout', () => {
        document.querySelector('#menuImg').style.transform = 'rotate(0deg)';
        // the class .st0 is the class found in the svg text (navigate to Cog.svg in VS code to see it)
        document.querySelector('#menuImg').getSVGDocument().querySelector(".st0").style.setProperty("fill", "#000000");
    });

});