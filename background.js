chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.greeting === 'settings') {
        chrome.storage.sync.get({
            displaySections: true,
        }, (items) => {
            console.log(items);
            console.log(JSON.stringify(items));
            sendResponse({
                result: items.displaySections
            });
            console.log(chrome.runtime.lastError);
        });
    }

});