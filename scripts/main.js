function setItem(event) {
    var itemID = event.target.id;
    var storageInfo = {};

    storageInfo[itemID] = `${event.target.checked}`;

    chrome.storage.sync.set(storageInfo, (items) => {
        if (chrome.runtime.error) {
            console.log(chrome.runtime.error);
        }
        console.log(items);
    });
}

document.addEventListener('DOMContentLoaded', () => {

    chrome.storage.sync.get({
        displaySections: 'potato'
    }, (items) => {
        Object.keys(items).forEach(key => {
            document.querySelector(`#${key}`).checked = items[key];
        });
    });

    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('click', setItem);
    });
});