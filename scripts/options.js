// An array of all of the features added
// This should be the name that is used everywhere, so all the loops work
const features = ['sectionsColumn', 'sectionsBreadcrumb', 'navToModules', 'addBlueprintParent', 'deleteQuizQuestions', 'blueprintLockItems', 'divsToQuestions', 'adminAccountNames', 'blueprintAssociations'];

/**
 * Change the color of the checkbox
 */
function colorItem(event) {
    let el;
    if (event.target) {
        el = event.target;
    } else {
        el = event;
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

/**
 * Saves options to chrome.storage
 */
function saveOptions() {
    let checkedFeatures = features.reduce((a, c) => {
        a[c] = document.querySelector(`#${c}`).checked;
        return a;
    }, {});

    chrome.storage.sync.set(
        checkedFeatures,
        () => {
            console.log('Options saved');
        }
    );
}

/**
 * Gets options from chrome.storage
 * Null value on the "get" returns all of the items
 */
function getOptions() {
    chrome.storage.sync.get(null, items => {
        features.forEach(c => {
            document.querySelector(`#${c}`).checked = items[c];
        });
        document.querySelectorAll('.switch>input').forEach(colorItem);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    getOptions();
    document.querySelectorAll('.switch').forEach(el => el.addEventListener('click', colorItem));
    document.querySelectorAll('.switch').forEach(el => el.addEventListener('click', saveOptions));
});