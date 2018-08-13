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

function addDeleteQuizQuestions() {
    let quizPopup = `<label id="quizQuestionsDelete" class="container" for="deleteQuestions">Delete Quiz Questions
        <button type="button" id="deleteQuizQuestions">Delete Questions</button>
    </label>`
}

document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get({
        displaySections: 'potato'
    }, (items) => {
        Object.keys(items).forEach(key => {
            document.querySelector(`#${key}`).checked = items[key];
        });
    });

    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('click', setItem);
    });

    document.querySelector('#lockSections').addEventListener('click', () => {
        lockItems(true);
    });

    document.querySelector('#unlockSections').addEventListener('click', () => {
        lockItems(false);
    });

    document.querySelector('#deleteQuizQuestions').length > 1 ? document.querySelector('#deleteQuizQuestions').addEventListener('click', quizQuestions) : '';
});


/* If the option to show the cross-listed column is on, then do it */
chrome.storage.sync.get({
    deleteQuizQuestions: false,
}, function (items) {
    if (items.deleteQuizQuestions === true) {
        addDeleteQuizQuestions();
    }
});