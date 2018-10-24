function loadFullPage() {
    return new Promise((resolve, reject) => {
        let more_questions = document.querySelector('#more_questions');
        if (more_questions === null) { return resolve(false); }

        let totalPages = more_questions.dataset.totalPages;
        let currPage = more_questions.dataset.currentPage;
        let next_page = document.querySelector('#more_questions .more_questions_link');
        function openPages() {
            next_page.click();
            currPage = more_questions.dataset.currentPage;

            if (currPage < totalPages) {
                setTimeout(openPages, 100);
            } else {
                resolve(true);
            }
        }
        openPages();
    });
}

function clickTheButtons() {

    var holders = Array.from(document.querySelectorAll('#questions .question_holder')).filter(holder => !holder.querySelector('.question_form'));
    var title = document.querySelector('#breadcrumbs [href*=\'/courses/\'] .ellipsible').innerText;
    // var courseName = title.length > 0 ? title.substr(0, title.indexOf(":")).replace(" ", "").toLocaleLowerCase() : null;
    var courseName = title.length > 0 ? title.replace(/\s/g, '').toLocaleLowerCase() : null;

    holders.reduce((prev, holder, i) => prev.then(() => clickAllButtons(holder, i)), Promise.resolve());

    function clickAllButtons(holder, i) {
        return new Promise((resolve, reject) => {
            holder.querySelector('.edit_question_link , .edit_teaser_link').click();
            waitFor(document, () => {
                var sel = document.querySelector('.ic-RichContentEditor [data-rich_text]');
                return sel && sel.getAttribute('data-rich_text') == 'true';
            }, () => {
                var diffholder = document.querySelector('#questions .question_form');
                Array.from(diffholder.querySelectorAll('.question_form a')).filter(item => item.innerText.trim() === 'HTML Editor')[0].click();
                let content = diffholder.querySelector('.question .question_content').value;
                // content.match(regex expression looking for divs)
                // replace that with the one that I want.
                // if (content.includes(/&lt;div(.*)&gt|&lt;\/div&gt;/g)) {
                //     content = `<p>This includes some important stuff</p>`;
                // }

                if (content.includes(`<div class="byui${courseName ? ' ' + courseName : ''}">`) !== true) {
                    if (content.includes(/&lt;div(.*)&gt|&lt;\/div&gt;/g)) {
                        content = `<p>This includes some important stuff</p>`;
                    }
                    diffholder.querySelector('.question .question_content').value = `<div class="byui${courseName ? ' ' + courseName : ''}"> ${content} </div>`;
                }

                // else {
                // diffholder.querySelector('.question .question_content').value = '<p>This is an answer</p>';
                // }

                // Close
                waitFor(diffholder, () => !diffholder.querySelector('.question_form'), resolve);
                diffholder.querySelector('.btn-primary').click();
            });
        });
    }

    function waitFor(parent, fn, cb) {
        var observer = new MutationObserver(() => {
            if (fn()) {
                observer.disconnect();
                cb();
            }
        });
        observer.observe(parent, {
            attributes: true,
            childList: true,
            subtree: true,
        });
    }

}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.call === 'divsToQuestionBanks') {
            loadFullPage()
                .then(clickTheButtons)
                .catch(console.error);
        }
        sendResponse();
    });
