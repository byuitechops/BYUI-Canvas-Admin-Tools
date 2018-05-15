function colorItem(event) {
    if (event.target) {
        var el = event.target;
    } else {
        var el = event;
    }
    if (el.nodeName === 'INPUT') {
        console.log(el.nodeName);
        if (el.checked) {
            el.parentNode.style.backgroundColor = '#42aaf4';
        } else {
            el.parentNode.style.backgroundColor = '#666';
        }
    }
}

// Saves options to chrome.storage
function saveOptions() {
    var sectionsColumn = document.querySelector('#sectionsColumn').checked;
    chrome.storage.sync.set({
        sectionsColumn,
    }, function () {
        // console.log('Options saved');
    });

    var sectionsBreadcrumb = document.querySelector('#sectionsBreadcrumb').checked;
    chrome.storage.sync.set({
        sectionsBreadcrumb,
    }, function () {
        console.log('Options saved');
    });
}

// Gets options from chrome.storage
function getOptions() {
    chrome.storage.sync.get({
        sectionsColumn: false,
        sectionsBreadcrumb: false,
    }, function (items) {
        document.querySelector('#sectionsColumn').checked = items.sectionsColumn;
        document.querySelector('#sectionsBreadcrumb').checked = items.sectionsColumn;
        document.querySelectorAll('.switch>input').forEach(colorItem);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    getOptions();
    document.querySelectorAll('.switch').forEach(el => el.addEventListener('click', colorItem));
    document.querySelectorAll('.switch').forEach(el => el.addEventListener('click', saveOptions));
});