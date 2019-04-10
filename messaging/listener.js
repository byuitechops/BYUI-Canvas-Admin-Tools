/* eslint-disable indent */
/*****************
 * This file listens for any messages that are sent to content scripts from the extension. 
 * It will then perform some action depending on the message that is sent. 
 * 
 * 
 *****************/

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // On any message it catches it here and runs it's respsective function
    // This is supposed to be listening to the messages sent by main.js
    switch (message) {
        case "deleteQuizQuestions":
            var elt = document.createElement("script");
            elt.innerHTML = '(' + deleteQuestions.toString() + ')()';
            document.head.appendChild(elt);
            sendResponse("Quiz questions deleted!");
            break;
        case "deleteQuizzes":
            var elt = document.createElement("script");
            elt.innerHTML = '(' + deleteAllQuizzes.toString() + ')()';
            document.head.appendChild(elt);
            sendResponse("Quizzes deleted!");
            break;
        case "lockSections":
            lockElements();
            sendResponse("Sections locked!");
            break;
        case "unlockSections":
            unlockElements();
            sendResponse("Sections unlocked!");
            break;
        case "addDivsToQuestionBank":
            loadFullPage()
                .then(clickTheButtons)
                .catch(console.error);
            sendResponse("Divs added!");
            break;
        case "editor":
            sendResponse("Editor popped up!");
            break;
        case 'options':
            chrome.runtime.openOptionsPage();
            sendResponse('Options opened');
            break;
        default:
            sendResponse("Feature could not be found.");
    }
});