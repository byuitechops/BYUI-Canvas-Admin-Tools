/********************************
 *
 * When the extension is added, this 
 * function will run automatically.
 * It should show some information 
 * about the extension that should
 * help navigate and use it without
 * too much difficulty
 * 
 * Not currently being used. 
 * I left it here just in case
 * we want to use it at some point 
 * in the future to display 
 * information
 *
 ********************************/
function firstOpen(installInfo) {
    // change the options page
    console.log('This is the first Load');

    // installInfo.forEach(el => {
    //     let selector = document.querySelector(el.selector);
    //     let before = document.querySelector(el.before);

    //     let div = document.createElement('div');
    //     div.classList = 'option-description install-info';
    //     div.innerHTML = el.internals;
    //     selector.insertBefore(div, before);

    // });
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

    // The div containing all the information
    let outer = document.querySelector('.all-updates-info');

    // back button
    let img = document.createElement('img');
    img.id = 'back';
    img.src = '/images/back.png';

    // The inner information
    // Contains all the information about the selected update
    let inner_div = document.createElement('div');
    inner_div.id = 'single_update_container';
    let updateText =
        `<div class="option-title">Version ${updateInfo.version}${updateInfo.flashyTitle ? ' - ' + updateInfo.flashyTitle : ''}</div>
    <div class="option-description">`;
    updateText += '<ul>';
    updateText = updateInfo.features.reduce((acc, curr) => {
        let item = `<li>${curr}</li>`;
        acc += item;
        return acc;
    }, updateText);
    updateText += '</ul></div>';
    inner_div.innerHTML += updateText;
    let created = document.querySelector('#update_container') ? document.querySelector('#update_container') : null;

    // Container for all info
    // This is here to make it easier to hide all the information
    let div = document.createElement('div');
    div.id = 'update_container';

    div.appendChild(img);
    div.appendChild(inner_div);

    if (created) {
        outer.replaceChild(div, created);
    } else {
        outer.appendChild(div);
    }

    if (!document.querySelector('#shadow')) {
        showUpdate();
    }

    document.querySelector('#back').addEventListener('click', () => {
        let allVersions = document.querySelector('#all-updates-container');
        let oneVersion = document.querySelector('#update_container');
        hideOneShowAnother(oneVersion, allVersions);
    });
}