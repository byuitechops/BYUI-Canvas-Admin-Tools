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

