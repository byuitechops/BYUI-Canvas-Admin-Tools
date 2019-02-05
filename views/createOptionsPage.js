function createPage(features, updates) {

    features.map(({ type, id, title, description: desc }) => {

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

    let ul = '<ul>';

    ul = updates.reduce((acc, curr) => {
        let li =
            `<li><span>${curr.version}</span> - ${curr.short}</li>`;
        acc += li;
        return acc;
    }, ul);

    ul += '</ul>';

    div.innerHTML = ul;
    document.querySelector('#extension').before(div);
    console.log(div);

}