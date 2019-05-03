/* eslint-disable indent */
function loadFullPage() {
    return new Promise((resolve, reject) => {
        let more_questions = document.querySelector('#more_questions');
        if (more_questions === null) {
            return resolve(false);
        }

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


// Utility functions
/**
 * Execute a 'click' event
 * 
 * @param {*} cssSelector 
 */
function clickThing(cssSelector) {

    var click = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
    });

    if (typeof cssSelector === "string") {
        var ele = document.querySelector(cssSelector);
    } else {
        // assume that it is an element
        var ele = cssSelector;
    }
    // ele.click();
    ele.dispatchEvent(click);
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


// New thing I'm trying
function clickTheButtons() {

    /**
     * Narrow all the questions down to just the ones that need to be edited
     * @returns {Object[]} An object full of questions to edit
     */
    function getQuestionsToEditObjects() {
        let verySpecific = Array.from(allQuestions).reduce((acc, el) => {
            let returnObj;
            let things = el.querySelector('div[id*="question_text"]');
            let otherThings = el.querySelector('div[class*="question_text"]');
            if (things) {
                returnObj = things;
            } else if (otherThings) {
                returnObj = otherThings;
            }
            acc.push(returnObj);
            return acc;
        }, []);

        // Filter down to just the questions that need to be edited
        let justTheQuestionsToEdit = Array.from(verySpecific).reduce((acc, question, i) => {
            let edit = question.querySelectorAll('div[class*="byui"]');
            let match = edit[0] ? edit[0].className === `byui ${courseName}` : false;
            if (match === false || edit.length > 1) {
                acc.push({
                    fullQuestion: allQuestions[i],
                    questionText: question,
                    fastPossible: allQuestions[i].querySelector('#questions div.text > div.original_question_text > textarea.textarea_question_text') !== null,
                    index: i
                });
            }
            return acc;
        }, []);

        // Get the correct text for the question
        let completeQuestionsObject = justTheQuestionsToEdit.map(el => {
            let questionText = el.questionText;
            let firstChild = questionText.children[0];
            if (firstChild != undefined && firstChild.tagName === 'DIV') {
                let content = firstChild.innerHTML;
                firstChild.querySelectorAll('div[class*="byui"]').forEach(div => {
                    content = div.innerHTML;
                });
                firstChild.innerHTML = content;
                firstChild.className = `byui ${courseName}`;
                el.correctText = firstChild;
            } else {
                let content = questionText.innerHTML;
                let div = document.createElement('div');
                div.className = `byui ${courseName}`;
                div.innerHTML = content;
                el.correctText = div;
            }
            return el;
        });
        return completeQuestionsObject;
    }

    async function FixTheHTML(el, i) {
        // return new Promise((resolve, reject) => {
        // allQuestions = document.querySelectorAll('#questions > div');
        let fastMethodPossible = allQuestions[el.index].querySelector('div.text > div.original_question_text > textarea.textarea_question_text');
        // console.log(el);
        if (el.fastPossible) {
            // console.log('Fast: ', i);
            FastMethod(fastMethodPossible, el, i);
            // resolve();
        } else {
            clickThing(el.fullQuestion.querySelector('.edit_question_link , .edit_teaser_link'));
            // allQuestions = document.querySelectorAll('#questions > div');
            el.allQuestions = allQuestions[el.index];
            // console.log('Slow: ', i);

            return await SlowMethod(el, i);
            // .then(() => {
            //     return 'things';
            // });
        }
        // });
    }

    function SlowMethod(el, i) {
        // console.log('Slow: ', i);
        return new Promise((resolve, reject) => {
            waitFor(document, () => {
                var sel = document.querySelector('.ic-RichContentEditor [data-rich_text]');
                return sel && sel.getAttribute('data-rich_text') == 'true';
            }, () => {
                console.log(document.querySelectorAll('#questions')[el.index]);
                var diffholder = document.querySelectorAll('#questions > div')[el.index].querySelector('.question_form');
                addDivToQuestions(diffholder);
                waitFor(diffholder, () => !diffholder.querySelector('.question_form'), resolve);
                clickThing(diffholder.querySelector('.btn-primary'));
            });
        });


        /**
         * Opens the HTML editor and adds the div to the question if it's not there already
         * 
         * @param {string} questionOuterShell The container of the question being edited
         */
        function addDivToQuestions(questionOuterShell) {
            // Click button for the HTML editor
            clickThing(Array.from(questionOuterShell.querySelectorAll('.question_form a')).filter(item => item.innerText.trim() === 'HTML Editor')[0]);
            // console.log(Array.from(questionOuterShell.querySelectorAll('.question_form a'))) //.filter(item => item.innerText.trim() === 'HTML Editor')[0]);
            console.log('OuterShell: ', el.correctText.outerHTML);
            questionOuterShell.querySelector('.question .question_content').value = el.correctText.outerHTML;
            return questionOuterShell;
        }

    }

    function FastMethod(fastMethodPossible, el, i) {
        fastMethodPossible.innerHTML = el.correctText.outerHTML;
        clickThing(el.fullQuestion.querySelector('.edit_question_link , .edit_teaser_link'));
        setTimeout(() => {
            clickThing(el.fullQuestion.querySelector('.btn-primary'));
        }, 4);
    }


    /********* Main Functionality ********/
    var title = document.querySelector('#breadcrumbs [href*=\'/courses/\'] .ellipsible').innerText.replace(/\s/g, '').toLocaleLowerCase();
    var courseName = title.length > 0 ? title.replace('onlinemaster', '') : null;
    let allQuestions = document.querySelectorAll('#questions > div');
    // Get an array of objects that are just the questions that need editing
    let completeQuestionsObject = getQuestionsToEditObjects();

    // Run on the questions that need editing
    completeQuestionsObject.reduce((prev, el, i) => prev.then(() => FixTheHTML(el, i)), Promise.resolve());
}