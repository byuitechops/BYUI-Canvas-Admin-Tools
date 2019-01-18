/********************************
 *
 *
 *
 ********************************/
function firstOpen() {
    // change the options page
    console.log('This is the first Load');

    let info = {
        popup: {
            internals: '<p class="install-info">The tools under this label will only run when you click the button in the popup. The button will only appear if the option below is selected. These tools primarily automate tasks. They turn several button clicks into just a few.</p>',
            selector: document.querySelector('div#popup'),
            before: document.querySelector('div#popup div')
        },
        display: {
            internals: '<p class="install-info">The tools under the Displays label will run automatically on the correct pages. The purpose of these tools is to make navigation easier. There are a couple that do things when clicked, but most of them are for navigation.</p>',
            selector: document.querySelector('div#display'),
            before: document.querySelector('div#display div')
        },
        extension: {
            internals: '<p class="install-info">The purpose of this extension is to make navigating and manipulating Canvas as an admin easier.</p>',
            selector: document.querySelector('body'),
            before: document.querySelector('div')
        }
    };

    Object.keys(info).forEach(el => {
        let div = document.createElement('div');
        div.className = 'install-info';
        div.innerHTML = info[el].internals;
        info[el].selector.insertBefore(div, info[el].before);

        console.log(el);
        console.log(info[el]);
    });

}

/********************************
 * 
 * 
 * 
 ********************************/
function updated() {
    // change the options page
    console.log('Things just done updated');





}