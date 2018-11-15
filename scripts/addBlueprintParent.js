function createNavbar() {
    let navbar = document.createElement('div');
    let sidebar = document.querySelector('#header');
    let sidebarWidth = window.getComputedStyle(sidebar).getPropertyValue('width');
    // Set up the element however you need: styling, sizing, etc.
    navbar.id = 'navToModule_ext';
    navbar.style.height = '24px';
    navbar.style.lineHeight = '24px';
    navbar.style.width = `calc(100vw - ${sidebarWidth})`;
    navbar.style.maxWidth = `calc(100vw - ${sidebarWidth})`;
    navbar.style.zIndex = 10;
    navbar.style.backgroundColor = 'white';
    navbar.style.borderTop = '1px solid #ddd';
    navbar.style.padding = '2px';
    navbar.style.color = 'black';
    navbar.style.position = 'fixed';
    navbar.style.bottom = 0;
    navbar.style.left = sidebarWidth;
    navbar.style.display = 'flex';

    document.querySelector('body').appendChild(navbar);

}

function addBlueprintParent() {
    function buildDetails() {
        return new Promise((resolve, reject) => {
            let courseID = new URL(document.location.href).pathname.split('/')[2];
            function receive() {
                var data = JSON.parse(this.responseText.replace('while(1);', ''));
                resolve(data);
            }
            function onError() {
                reject(`Failure to retrieve data for course ${courseID}`);
            }
            var request = new XMLHttpRequest();
            request.addEventListener('load', receive);
            request.addEventListener('error', onError);
            request.open('GET', `https://byui.instructure.com/api/v1/courses/${courseID}/blueprint_subscriptions`);
            request.send();
        });
    }
    buildDetails()
        .then(blueprintObj => {
            if (Object.keys(blueprintObj).length > 0) {
                if (!document.querySelector('#navToModule_ext')) {
                    createNavbar();
                }
                let blueprintID = blueprintObj[0].blueprint_course.id;
                document.querySelector('#navToModule_ext').innerHTML += `<a href="https://byui.instructure.com/courses/${blueprintID}" 
                id="parentBlueprintCourse" target="_blank" style="font-size: 14px;padding:0 7px;position:fixed;right:0;">Parent Blueprint</a>`;
            }
        });
}

chrome.storage.sync.get({
    addBlueprintParent: false,
}, function (items) {
    if (items.addBlueprintParent === true) {
        addBlueprintParent();
    }
});