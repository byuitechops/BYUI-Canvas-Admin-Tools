let thing = 'installed';
chrome.runtime.onInstalled.addListener(details => {
    if (details.reason === 'install') {
        console.log("First Load");

        chrome.runtime.openOptionsPage();
        thing++;
    } else if (details.reason == 'update') {
        console.log('Update');
        chrome.runtime.openOptionsPage();
        thing += 2;
    } else {
        console.log(details);
    }
});


function firstLoad() {

    return thing;
}