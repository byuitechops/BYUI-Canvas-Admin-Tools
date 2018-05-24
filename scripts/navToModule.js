// let anchor = Array.from(document.querySelectorAll('a'));

// console.log(anchor);
// let filtered = anchor.filter(el => el.id.includes('module_'));
// console.log(filtered);

// filtered.forEach(setTitle);


// function setTitle(el) {
//     let titled = document.querySelector(`${el} > h2`);
//     console.log(titled);
// }

function getModules() {

    let anchorTags = document.querySelectorAll('[data-module-id]>a[id*="module_"]');

    anchorTags = Array.from(anchorTags).filter(anchorTag => {
        return anchorTag.id !== 'module_';
    });
    console.log(anchorTags);
}

function createNavbar() {
    let navbar = document.createElement('div');
    navbar.id = 'potato';
    navbar.style.height = '5vh';
    navbar.style.width = '50vw';
    navbar.style.position = 'fixed';
    navbar.style.bottom = 0;
    navbar.style.right = 0;
    // Set up the element however you need: styling, sizing, etc.
    document.querySelector('body').appendChild(navbar);
}

function setNavItems() {

}

getModules();
createNavbar();