function firstOpen() {
    // change the options page
    document.querySelector('#extensionInfo').innerHTML = '<p>This is a thing</p>';
    console.log('This is the first Load');
}

function updated() {
    // change the options page
    console.log('Things just done updated');
}