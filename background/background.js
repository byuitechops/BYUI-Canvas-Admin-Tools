/********************************
 *
 *
 *
 ********************************/
let thing = '';
chrome.runtime.onInstalled.addListener(details => {
    if (details.reason === 'install') {
        console.log("First Load");

        chrome.runtime.openOptionsPage();
        thing = 'installed';
    } else if (details.reason == 'update') {
        console.log('Update');
        chrome.runtime.openOptionsPage();
        thing = 'updated';
    } else {
        console.log(details);
    }
});

/********************************
 *
 *
 *
 ********************************/
function firstLoad() {
    let returnValue = thing;
    thing = '';
    return returnValue;
}