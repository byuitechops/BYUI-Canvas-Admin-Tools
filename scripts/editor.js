// Is the editor open? Starts false, changes to true when open
var openEditor = false;

/******************************************************
 *                  loadEditor()
 *
 * Arguments: None
 * 
 * Description: The loadEditor() function is the "main"
 * function for the editor. It contains all of the
 * functions/code required to load the editor in both
 * D2L and Canvas. The only code this function runs is 
 * the switch statement below to determine the user's
 * location and run the correct driver function.
 * To add more driver functions add more cases.
 * 
 * Return Type: Void
 ******************************************************/
function loadEditor() {
    'use strict';

    // Get the title of the current webpage.
    var title = document.title;
    // Get the url of the current webpage.
    var url = window.location.href;
    console.log("TEST");
    canvasDriver();

}

/*******************************************************************************************************************************/

// Canvas Functions

/******************************************************
 *                 canvasDriver()
 * Arguments: None
 * 
 * Description: The canvasDriver() function is the 
 * driver for the editor to work properly in Canvas. 
 * The function uses a promise chain to handle any 
 * async operations and/or errors. The function first 
 * checks to see if the editor is already open. If it 
 * is, it returns. If the editor encounters an error, 
 * the function catches the error and prompts the user 
 * to submit a ticket.
 * 
 * Return Type: Void
 ******************************************************/
function canvasDriver() {
    // If the editor is already open, don't do anything
    if (!openEditor) {
        canvasClickButton()
            .then(canvasGetHTML)
            .then(runEditor)
            .catch(err => {
                console.log(err);
                if (confirm('The editor has experienced a problem or the current page is not an edit page. Would you like to submit a ticket? (This will take you to another page)')) {
                    window.location = 'https://docs.google.com/forms/d/e/1FAIpQLSfJQX_njx43MMLkatwn-MvPUmJfB6IHnzIyVwdkK1GaqtQ7Lw/viewform?usp=sf_link';
                }
                return;
            });
    } else {
        console.log('The editor is already open!');
        return;
    }
}

/******************************************************
 *                 canvasClickButton()
 * 
 * Arguments: None
 * 
 * Description: The canvasClickButton() function clicks
 * the edit HTML button in Canvas. If the user is not 
 * in a quiz, the function finds and clicks the button. 
 * 
 * If the user is located in quizzes the function 
 * checks whether the user is editing the quiz 
 * description or a quiz question. If the user is 
 * editing quiz questions the function will default to
 * the first open question and click its Edit HTML 
 * button, unless the user has clicked inside a 
 * question. If the user has clicked inside a question 
 * the function clicks the edit HTML button for that 
 * question. If the editor is editing the quiz 
 * description it clicks the edit HTML button for the 
 * quiz description.
 * 
 * Return Type: Promise
 ******************************************************/
function canvasClickButton() {
    return new Promise((resolve, reject) => {
        var button;
        // Check if the user is editing a quiz
        if (!url.includes('/quizzes/') && !url.includes('/question_banks/')) {
            try {
                // Check if the user has already clicked the HTML Editor button
                // Get the Button to click 
                button = Array.from(document.querySelectorAll('a')).filter((item) => item.innerText.trim() === 'HTML Editor')[0];
                if (button.style.display !== 'none') {
                    // Click the button 
                    button.click();
                    resolve();
                } else {
                    // HTML Editor button already clicked
                    resolve();
                }
            } catch (err) {
                reject(err);
            }
        } else {
            try {
                // The user is editing Quizzes
                // Find out if the user is editing the quiz description or quiz questions
                if (document.getElementsByClassName('ui-tabs-active ui-state-active')[0].getAttribute('aria-controls') === 'options_tab') {
                    // User is editing the Quiz Description
                    // Get the Button to click 
                    button = Array.from(document.querySelectorAll('a')).filter((item) => item.innerText.trim() === 'HTML Editor')[0];
                    // Check if the user has already clicked the HTML Editor button
                    if (button.style.display !== 'none') {
                        // Click the button 
                        button.click();
                        resolve();
                    } else {
                        // HTML Editor button already clicked
                        resolve();
                    }
                } else if (document.getElementsByClassName('ui-tabs-active ui-state-active')[0].getAttribute('aria-controls') === 'questions_tab' || url.includes('question_banks')) {
                    // User is editing Quiz Questions

                    // Check if the user has a question in focus
                    if (document.activeElement.tagName === 'IFRAME' || document.activeElement.tagName === 'TEXTAREA') {
                        // The following line of code needs to be improved. It can easily break.
                        var parent = document.activeElement.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('toggle_question_content_views_link');
                        // check if the user has already clicked the HTML editor button
                        if (parent[1].style.display !== 'inline') {
                            parent[1].click();
                            // Now set the html editor's display to 'none', and the rich text editor button to 'block'
                            parent[0].style.display = 'none';
                            parent[1].style.display = 'inline';
                            resolve();
                        } else {
                            // HTML Editor button already clicked
                            resolve();
                        }
                    } else {
                        // Just grab the first question's html
                        // Get the button to click
                        button = Array.from(document.querySelectorAll('a')).filter((item) => item.innerText.trim() === 'HTML Editor')[0];
                        // Check if the user has already clicked the HTML Editor button
                        if (button.style.display !== 'none') {
                            // Click the button 
                            button.click();
                            resolve();
                        } else {
                            // HTML Editor button already clicked
                            resolve();
                        }
                    }
                }
            } catch (err) {
                reject(err);
            }
        }
    });
}

/******************************************************
 *                  canvasGetHTML()
 *
 * Arguments: None
 * 
 * Description: The canvasGetHTML() function gets the
 * html from the Edit HTML text area. If the user is
 * editing quiz questions the function defaults to the
 * first quiz question unless the user is clicked
 * inside a question. The function returns an object
 * containing three things: The HTML string, where
 * to inject the editor, and where to put the code back
 * once the user is dont editing.
 * 
 * Return Type: Promise(JS Object)
 ******************************************************/
function canvasGetHTML() {
    return new Promise((resolve, reject) => {
        try {
            var htmlString,
                whereToInjectCode,
                placeToPutBack;
            // Check if the user is editing a quiz
            if (!url.includes('/quizzes/') && !url.includes('/question_banks/')) {
                htmlString = document.querySelectorAll('textarea[id][class]')[0].value;
                whereToInjectCode = 'body';
                placeToPutBack = document.querySelectorAll('textarea[id][class]')[0];
            } else {
                // The user is editing a Quiz
                // check if the user is editing a quiz description or question
                if (document.getElementsByClassName('ui-tabs-active ui-state-active')[0].getAttribute('aria-controls') === 'options_tab') {
                    // User is editing the Quiz Description
                    htmlString = document.getElementById('quiz_description').value;
                    whereToInjectCode = 'body';
                    placeToPutBack = document.getElementById('quiz_description');
                } else if (document.getElementsByClassName('ui-tabs-active ui-state-active')[0].getAttribute('aria-controls') === 'questions_tab' || url.includes('question_banks')) {
                    // User is editing Quiz Questions

                    // Check if the user has a question in focus
                    if (document.activeElement.tagName === 'TEXTAREA') {
                        // Get its HTML
                        var currentElement = document.activeElement;
                        htmlString = currentElement.value;
                        whereToInjectCode = 'body';
                        placeToPutBack = currentElement;
                    } else {
                        // Just get the first open question's HTML, then resolve
                        var textAreas = Array.from(document.querySelectorAll('textarea'));
                        var questions = textAreas.filter(textArea => {
                            return textArea.id.includes('question_content_');
                        });
                        htmlString = questions[0].value;
                        whereToInjectCode = 'body';
                        placeToPutBack = questions[0];
                    }
                }
            }
            resolve({
                htmlString,
                whereToInjectCode,
                placeToPutBack
            });
        } catch (err) {
            reject(err);
        }
    });
}
// End Canvas Functions

/*****************************************************************************************************************************************/

/******************************************************
 *                  runEditor()
 * Arguments: JS Object
 * 
 * Description: The runEditor() function is in charge
 * of putting the editor on the screen correctly. The
 * function takes in an HTML string, the place to put
 * the editor, and the place to put the edited code
 * back. The function first creates the HTML code for
 * the footer and the div and styles for the editor.
 * The function then puts the footer's HTML into the
 * footerDiv. The function then appends both the
 * editor and footer divs to the wrapperDiv. The
 * function then makes the editor, loads the default
 * or user settings, and beautifies the code.
 * 
 * The footer contains buttons that allow the user to
 * close the editor, reset the settings, wrap the text,
 * and change the editor's settings. When the user
 * closes the editor the current settings are saved to
 * local storage and then the editor puts the code back
 * into the textbox.
 * 
 * Return Type: Void
 ******************************************************/
function runEditor({
    htmlString,
    whereToInjectCode,
    placeToPutBack
}) {
    // Create the variables needed to create the editor
    var wrapperDiv,
        editorDiv,
        footerDiv,
        localstorageKey = 'jmBookmarkletCodeEditor',
        editor,
        options,
        footerHTML = '';

    // Create the HTML for the the footer    
    footerHTML += '<button class="closeButtonEditor" style="font-size:20px;margin-right:15px;">close</button>';
    footerHTML += '<label style="margin-right:15px;font-size: 20px;">Wrap Text<input type="checkbox" class="wrapTextEditor" /></label>';
    footerHTML += '<a href="https://github.com/ajaxorg/ace/wiki/Default-Keyboard-Shortcuts" style="color:blue;margin-right: 15px;font-size: 20px;" target="_blank" >Keyboard Shortcuts</a>';
    footerHTML += '<a href="https://content.byui.edu/items/7b0deacf-7b0f-477d-85e0-aaa75dcecb08/1/" style="color:blue;margin-right:15px;font-size: 20px;" target="_blank">Equella Location</a>';
    footerHTML += '<button class="beautifyEditor" style="font-size:15px;margin-right:15px;" >Beautify HTML</button>';
    footerHTML += '<button class="resetSettingsEditor" style="font-size:15px;margin-right:15px;" >Reset Settings</button>';
    footerHTML += '<button class="editorSettings" style="font-size:15px;" >Open Settings Panel</button>';

    // Create the divs needed to create the editor
    wrapperDiv = document.createElement('div');
    wrapperDiv.setAttribute('id', 'editorDiv');
    wrapperDiv.style.cssText = 'background-color: white;border:3px solid black;height: 90%;width: 90%;position: absolute;top: 50px;left: 5vw;z-index: 2000;';
    editorDiv = document.createElement('div');
    editorDiv.style.cssText = 'width: 100%; height: calc(100% - 40px);';
    footerDiv = document.createElement('div');
    footerDiv.setAttribute('id', 'editorFooter');
    footerDiv.style.cssText = 'margin-top:5px;margin-right:20px;';

    // Put the footer HTML into the footerDiv
    footerDiv.innerHTML = footerHTML;

    // Append the editor and footer divs to the wrapperDiv
    wrapperDiv.appendChild(editorDiv);
    wrapperDiv.appendChild(footerDiv);
    document.querySelector(whereToInjectCode).appendChild(wrapperDiv);

    // Make the editor, place it in the editorDiv
    editor = ace.edit(editorDiv);
    openEditor = true;
    console.log('Editor Opened');

    // Set the options
    // Starting Options for the Editor
    var startingOptions = {
        'animatedScroll': false,
        'behavioursEnabled': true,
        'displayIndentGuides': true,
        'dragDelay': 0,
        'fadeFoldWidgets': false,
        'fontSize': 14,
        'highlightActiveLine': true,
        'highlightGutterLine': true,
        'highlightSelectedWord': true,
        'hScrollBarAlwaysVisible': false,
        'keyboardHandler': null,
        'mode': 'ace/mode/html',
        'newLineMode': 'auto',
        'overwrite': false,
        'printMarginColumn': 80,
        'readOnly': false,
        'scrollSpeed': 2,
        'showFoldWidgets': true,
        'showGutter': true,
        'showInvisibles': false,
        'showPrintMargin': false,
        'tabSize': 4,
        'theme': 'ace/theme/iplastic',
        'useSoftTabs': true,
        'useWorker': true,
        'wrap': 'off',
        'vScrollBarAlwaysVisible': false,
        'wrapBehavioursEnabled': true
    };
    options = JSON.parse(localStorage.getItem(localstorageKey)) || startingOptions;
    editor.setOptions(options);

    // Beautify the text, then put the text into the editor
    editor.getSession().setValue(makePretty(htmlString));

    // Set focus to the editor
    document.getElementsByClassName('ace_text-input')[0].focus();

    // When you click the beautifyHTML button, clean the code.
    document.getElementsByClassName('beautifyEditor')[0].onclick = () => {
        editor.getSession().setValue(makePretty(editor.getSession().getValue()));
        console.log('Code Beautified');
    };

    // When you click the close button, save the user's settings, put the code back in, and close the editor.
    document.getElementsByClassName('closeButtonEditor')[0].onclick = () => {
        localStorage.setItem(localstorageKey, JSON.stringify(editor.getOptions()));
        console.log('Settings Saved');
        placeToPutBack.value = editor.getSession().getValue();
        placeToPutBack.focus();
        editor.destroy();
        editor.container.remove();
        document.body.removeChild(wrapperDiv);
        openEditor = false;
        console.log('Editor Closed');
    };

    // When you click the settings button, open the editor's settings.
    document.getElementsByClassName('editorSettings')[0].onclick = () => {
        editor.execCommand('showSettingsMenu');
        console.log('Settings Opened');
    };

    // When you click the reset settings button, reset the editor's settings.
    document.getElementsByClassName('resetSettingsEditor')[0].onclick = () => {
        editor.setOptions(startingOptions);
        console.log('Settings Reset');
    };

    // When you click the wrap text checkbox, wrap, or unwrap the text
    document.getElementsByClassName('wrapTextEditor')[0].onclick = () => {
        editor.getSession().setUseWrapMode(document.getElementsByClassName('wrapTextEditor')[0].checked);
        console.log('Wrapping Text =', document.getElementsByClassName('wrapTextEditor')[0].checked);
    };

    // Call this function to clean up the editor's text.
    function makePretty(html) {
        return html_beautify(html, {
            'wrap_line_length': 0,
            unformatted: ['a', 'abbr', 'area', 'audio', 'b', 'bdi', 'bdo', 'cite', 'data', 'datalist', 'del', 'dfn', 'em', 'i', 'input', 'ins', 'kbd', 'keygen', 'map', 'mark', 'math', 'meter', 'noscript', 'output', 'progress', 'q', 'ruby', 's', 'samp', 'select', 'small', 'span', 'strong', 'sub', 'sup', 'template', 'time', 'u', 'var', 'wbr', 'text', 'acronym', 'address', 'big', 'dt', 'ins', 'small', 'strike', 'tt', 'pre'],
            extra_liners: []
        });
    }
}

// Not Working
// chrome.runtime.onMessage.addListener(
//     function (request, sender, sendResponse) {
//         if (request.call === 'editor') {
//             loadEditor();
//         }
//         sendResponse("test");
//     });