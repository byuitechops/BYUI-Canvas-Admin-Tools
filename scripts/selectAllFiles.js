function displaySelectAllButton() {
    let checkBox = document.querySelector('#selectAllCheckbox');
    let label = document.querySelector('#selectAllCheckbox+[for=selectAllCheckbox]');

    checkBox.classList.remove("screenreader-only");
    label.classList.remove("screenreader-only");
    console.log("Running script");
}

/* If the option to show the cross-listed column is on, then do it */
chrome.storage.sync.get({
    selectAllFiles: false,
}, function (items) {
    if (items.selectAllFiles === true) {
        // DOES NOT RUN EVERY TIME. MOST THE TIME.
        displaySelectAllButton();
    }
});