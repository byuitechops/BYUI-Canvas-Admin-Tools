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

chrome.storage.sync.get({
    deleteQuizQuestions: false,
    blueprintLockItems: false
}, function (items) {
    if (items.deleteQuizQuestions === true) {
        document.querySelector('#quizQuestionsDelete').style.display = 'unset';
    }
    if (items.blueprintLockItems === true) {
        document.querySelector('#blueprintLockItems').style.display = 'unset';
    }
});


document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('click', setItem);
    });

    document.querySelector('#lockSections').addEventListener('click', () => {
        lockItems(true);
    });

    document.querySelector('#unlockSections').addEventListener('click', () => {
        lockItems(false);
    });

    document.querySelector('#deleteQuizQuestions').addEventListener('click', quizQuestions);
});

