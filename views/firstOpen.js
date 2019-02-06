
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
        div.classList = 'option-description install-info';
        div.innerHTML = el.internals;
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

    let outer = document.querySelector('.all-updates-info');
    console.log(outer);

    let div = document.createElement('div');
    // div.className = 'outer-container';
    div.id = 'update_container';

    let updateText =
        `<div id="update" class="options-container">
                <div class="option-title">Version ${updateInfo.version}${updateInfo.flashyTitle ? ' - ' + updateInfo.flashyTitle : ''}</div>
                <div class="option-description">`;


    updateText += '<ol>';

    updateText = updateInfo.features.reduce((acc, curr) => {
        let item = `<li>${curr}</li>`;
        acc += item;
        return acc;
    }, updateText);

    updateText += '</ol></div></div>';


    div.innerHTML += updateText;
    console.log(div);

    outer.appendChild(div);
    document.querySelector('.all-updates-info ul').style.display = 'none';
    outer.style.animation = 'slidein .25s linear forwards';
}