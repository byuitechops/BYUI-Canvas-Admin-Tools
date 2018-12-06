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
    deleteQuizzes: false,
    blueprintLockItems: false,
    divsToQuestions: false,
    adminAccountNames: false
}, function (items) {
    if (items.deleteQuizQuestions === true) {
        document.querySelector('#quizQuestionsDelete').style.display = 'unset';
    }
    if (items.deleteQuizzes === true) {
        document.querySelector('#killQuizzes').style.display = 'unset';
    }
    if (items.blueprintLockItems === true) {
        document.querySelector('#blueprintLockItems').style.display = 'unset';
    }
    if (items.divsToQuestions === true) {
        document.querySelector('#addDivsToQuestions').style.display = 'unset';
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

    document.querySelector('#deleteQuizzes').addEventListener('click', deleteQuizzes);

    document.querySelector('#addDivsToQuestionBank').addEventListener('click', addDivs);
});

