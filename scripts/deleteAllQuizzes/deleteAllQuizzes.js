/**
 * Currently not in use.
 * Adds delete button to options above quizzes.
 * We have added the functionality to the chrome extension popup instead.
 */
// function addDeleteButton() {
//     var toolbar = document.querySelector(".header-bar-right #toolbar-1");
//     var deleteOption = document.createElement("li");
//     deleteOption.classList.add("ui-menu-item");

//     var deleteButton = document.createElement("a");
//     deleteButton.id = "killQuizzes";
//     deleteButton.classList.add("icon-trash", "ui-corner-all");
//     deleteButton.innerHTML = "Delete All Quizzes";

//     deleteOption.appendChild(deleteButton);
//     toolbar.appendChild(deleteOption);
// }

/**
 * Alerts the user that they're about to delete all the quizzes.
 * Deletes all the quizzes
 */
function deleteAllQuizzes() {
    var realConfirm = window.confirm;
    window.confirm = () => true;

    if (realConfirm("Are you sure you want to delete ALL the quizzes?")) {
        var deleteButtons = document.querySelectorAll("#assignment-quizzes .quiz .delete-item");
        deleteButtons.forEach(button => {
            console.log(window.confirm);
            button.click();
        });
    } else {
        console.log("Quizzes were not deleted.")
    }
    window.confirm = realConfirm;
}