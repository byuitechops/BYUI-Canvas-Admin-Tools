function deleteQuestions() {
    window._confirm = window.confirm;
    window.confirm = () => true
    if (window._confirm("Are you sure you want to delete ALL the questions") === true) {
        var elms = document.querySelectorAll("#questions .display_question .delete_question_link");
        elms.forEach(el => {
            el.click();
        });
    } else {
        console.log("Questions were not deleted.")
    }
    window.confirm = window._confirm
}