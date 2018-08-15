function lockItems(lock) {
    // Gets the currently selected browser tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            call: 'lockItems',
            lock: lock
        }, (response) => {
            console.log('lockItems has run');
        });
    });
}

function quizQuestions() {
    // Gets the currently selected browser tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            call: 'deleteQuestions'
        }, (response) => {
            console.log('Quiz questions deleted');
        });
    });
}

function addDivs() {
    // Gets the currently selected browser tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            call: 'divsToQuestionBanks'
        }, (response) => {
            console.log('Divs added to question bank');
        });
    });
}