let first = false;
chrome.runtime.onInstalled.addListener(details => {
    if (details.reason === 'install') {
        console.log("First Load");

        chrome.runtime.openOptionsPage();
        first = true;
    } else if (details.reason == 'update') {
        console.log('Update');
    } else {
        console.log(details);
    }
});


function firstLoad() {
    return first;
}