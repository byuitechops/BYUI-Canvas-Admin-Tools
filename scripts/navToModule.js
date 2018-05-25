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
    return anchorTags;
}

function createNavbar() {
    let navbar = document.createElement('div');
    // Set up the element however you need: styling, sizing, etc.
    navbar.id = 'potato';
    navbar.style.height = '5vh';
    navbar.style.width = '50vw';
    navbar.style.zIndex = 10;
    navbar.style.backgroundColor = 'black';
    navbar.style.color = 'white';
    navbar.style.position = 'fixed';
    navbar.style.bottom = 0;
    navbar.style.right = 0;
    navbar.style.display = 'flex';

    document.querySelector('body').appendChild(navbar);

}


function fillNavbar(modules) {
    let format = '';
    modules.forEach(module => {
        let title = document.querySelector(`#${module.id} + div>h2`).innerHTML;
        format += `<span style="margin:0 10px;">${title}</span>`;
    })
    document.querySelector('#potato').innerHTML = format;
}

getModules();
createNavbar();
fillNavbar(getModules());