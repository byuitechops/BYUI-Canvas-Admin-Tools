function createPage(features, updates) {

    features.map(({
        type,
        id,
        title,
        description: desc
    }) => {

        let output =
            `<label class="switch">
                    <input id="${id}" type="checkbox" checked />
                    <div></div>
                </label>
                <div class="option-title">${title}</div>
                <div class="option-description">${desc}</div>`;

        let div = document.createElement('div');
        div.className = 'option-container';
        div.innerHTML = output;
        document.querySelector(`#${type}`).appendChild(div);

    });
    createUpdateDiv(updates);
}

function createUpdateDiv(updates) {
    let div = document.createElement('div');
    div.className = 'all-updates-info';
    let title = '<h1 id="updateTitle>Version History</h1>';
    let ul = '<div id="all-updates-container"><img src="/images/exit.png" id="exit"><h1>Version History</h1><ul id="update_list"><hr>';

    ul = updates.reduce((acc, curr, i) => {
        let li =
            `<li><span id="${i}">${curr.version}</span> - ${curr.short}</li><hr>`;
        acc += li;
        return acc;
    }, ul);

    ul += '</ul></div>';
    div.innerHTML = title;
    div.innerHTML += ul;
    document.querySelector('#extension').before(div);
}