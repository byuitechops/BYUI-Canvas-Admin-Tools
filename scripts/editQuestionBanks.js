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

    /***** Inner functions *****/
    /**
     * 
     * @param {*} holder Outer container for the unedited question being worked on
     * @param {number} i Index being worked on currently (currently unused)
     */
    function clickAllButtons(holder, i) {
        return new Promise((resolve, reject) => {
            holder.querySelector('.edit_question_link , .edit_teaser_link').click();
            waitFor(document, () => {
                var sel = document.querySelector('.ic-RichContentEditor [data-rich_text]');
                return sel && sel.getAttribute('data-rich_text') == 'true';
            }, () => {
                var diffholder = document.querySelector('#questions .question_form');
                addDivToQuestions(diffholder);
                waitFor(diffholder, () => !diffholder.querySelector('.question_form'), resolve);
                diffholder.querySelector('.btn-primary').click();
            });
        });
    }

    /**
     * Opens the HTML editor and adds the div to the question if it's not there already
     * 
     * @param {string} questionOuterShell The container of the question being edited
     */
    function addDivToQuestions(questionOuterShell) {
        // Click button for the HTML editor
        Array.from(questionOuterShell.querySelectorAll('.question_form a')).filter(item => item.innerText.trim() === 'HTML Editor')[0].click();
        let content = questionOuterShell.querySelector('.question .question_content').value;
        if (!content.includes(`<div class="byui ${courseName}">`)) {
            console.log('Adding div');
            questionOuterShell.querySelector('.question .question_content').value = `<div class="byui${courseName ? ' ' + courseName : ''}"> ${content} </div>`;
        }
        return questionOuterShell;
    }

    /**
     * Waits for an event to happen within the DOM before calling a callback function
     * 
     * @param {string} parent The element you want to watch for an event
     * @param {function} fn The event you are waiting for
     * @param {function} cb What to do when the event happens
     */
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

    /***** Main Functionality *****/
    var holders = Array.from(document.querySelectorAll('#questions .question_holder')).filter(holder => !holder.querySelector('.question_form'));
    var title = document.querySelector('#breadcrumbs [href*=\'/courses/\'] .ellipsible').innerText;
    // var courseName = title.length > 0 ? title.substr(0, title.indexOf(":")).replace(" ", "").toLocaleLowerCase() : null;
    var courseName = title.length > 0 ? title.replace(/\s/g, '').toLocaleLowerCase() : null;

    holders.reduce((prev, holder, i) => prev.then(() => clickAllButtons(holder, i)), Promise.resolve());
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
