function blueprintAssociations() {
    let associatedCourses = document.querySelectorAll('span[dir="ltr"] .bca-associations-table tr[id^="course_"]');

    associatedCourses.forEach(v => {
        let courseID = v.id.split('_')[1];
        let thing = v.querySelector('td span');
        let html = thing.innerHTML;
        console.log('CourseID: ', courseID);
        console.log('Thing: ', thing);
        console.log('InnerHtml: ', html);
        thing.innerHTML = `<a href="/courses/${courseID}" target="_blank">${html}</a>`;
    });
}

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

chrome.storage.sync.get({
    blueprintAssociations: false,
}, function (items) {
    if (items.blueprintAssociations === true) {
        waitFor(document, document.querySelectorAll('span[dir="ltr"] .bca-associations-table tr[id^="course_"]').length > 0, blueprintAssociations);
    }
});