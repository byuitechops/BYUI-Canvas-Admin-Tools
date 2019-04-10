function blueprintAssociations() {
    let associatedCourses = document.querySelectorAll('span[dir="ltr"] .bca-associations-table tr[id^="course_"]');

    associatedCourses.forEach(v => {
        let courseID = v.id.split('_')[1];
        let linkSpan = v.querySelector('td span');
        let html = linkSpan.innerHTML;
        if (!html.includes(`<a href="/courses/${courseID}" target="_blank">${html}</a>`)) {
            linkSpan.innerHTML = `<a href="/courses/${courseID}" target="_blank">${html}</a>`;
        }
    });
}

function waitFor(parent, fn, cb) {
    var observer = new MutationObserver(() => {
        if (fn()) {
            observer.disconnect();
            cb();
        }
        observer.observe(parent, {
            childList: true,
            subtree: true,
        });
    });
    observer.observe(parent, {
        childList: true,
        subtree: true,
    });
    return observer;
}

chrome.storage.sync.get({
    blueprintAssociations: false,
}, function (items) {
    if (items.blueprintAssociations === true) {
        waitFor(document, () => document.querySelectorAll('span[dir="ltr"] .bca-associations-table tr[id^="course_"] span').length > 0, blueprintAssociations);

    }
});