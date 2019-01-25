/********************************
 *
 * When the extension is added, this 
 * function will run automatically.
 * It should show some information 
 * about the extension that should
 * help navigate and use it without
 * too much difficulty
 *
 ********************************/
function firstOpen(installInfo) {
    // change the options page
    console.log('This is the first Load');

    installInfo.forEach(el => {
        let selector = document.querySelector(el.selector);
        let before = document.querySelector(el.before);

        let div = document.createElement('div');
        div.className = 'install-info';
        div.innerHTML = `<p>${el.internals}</p>`;
        selector.insertBefore(div, before);

    });
}

/********************************
 * 
 * When the extension is updated,
 * this will run. It should contain 
 * some information about the update.
 * 
 * What changes were made?
 * How do you use them?
 * bug fixes
 * etc...
 * 
 ********************************/
function updated(updateInfo) {
    // change the options page
    console.log('Things just done updated');
    console.log(updateInfo);
}
