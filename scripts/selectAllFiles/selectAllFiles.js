/**
 * Waits for an event to happen within the DOM before calling a callback function
 * 
 * @param {string} parent The element you want to watch for an event
 * @param {function} fn The event you are waiting for
 * @param {function} cb What to do when the event happens
 */
function waitFor(parent, fn, cb) {
    var observer = new MutationObserver(() => {
        if (fn()) {
            observer.disconnect();
            cb();
        }
    });
    observer.observe(parent, {
        attributes: true,
        childList: true,
        subtree: true,
    });
}

/**
 * Waits for the document to load.
 * Then, it shows the "select all" button
 */
function displaySelectAllButton() {
    var checkbox, label;
    waitFor(document, () => {
        checkbox = document.querySelector('#selectAllCheckbox');
        label = document.querySelector('#selectAllCheckbox+[for=selectAllCheckbox]');
        return checkbox && label;
    }, () => {
        checkbox.classList.remove("screenreader-only");
        label.classList.remove("screenreader-only");
        console.log("Running script");
    });
}

/* If the option to show the select-all button is on, then do it */
chrome.storage.sync.get({
    selectAllFiles: false,
}, function (items) {
    if (items.selectAllFiles === true) {
        displaySelectAllButton();
    }
});