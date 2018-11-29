function createPage(features) {

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

}