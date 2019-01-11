function lockElements() {
    console.log('running');
    let elms = document.querySelectorAll('.icon-blueprint');
    if (elms.length === 0) {
        console.log('There is nothing to lock.');
        return;
    }
    elms.forEach(el => {
        el.click();
    })
    console.log('Locked');
}

function unlockElements() {
    let elms = document.querySelectorAll('.icon-blueprint-lock');
    if (elms.length === 0) {
        console.log('There is nothing to unlock.');
        return;
    }
    elms.forEach(el => {
        el.click();
    })
    console.log('Unlocked');
}