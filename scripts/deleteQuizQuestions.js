










function deleteQuestions() {
    let deleteIcon = document.querySelectorAll(".display_question .delete_question_link");
    console.log(deleteIcon);
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.call === 'deleteQuestions') {
            deleteQuestions();
        }
    });