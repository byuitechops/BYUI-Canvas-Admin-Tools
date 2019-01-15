// An array of all of the features added
// This should be the name that is used everywhere, so all the loops work
const features = [
    {
        id: 'sectionsColumn',
        title: 'Display Sections Column',
        description: 'This will display a new column listing the sections for each course on the right side of the search results.If a section was cross - listed into the course, it is highlighted in blue.Blueprint courses display as "BP", Reference courses as "REF", and courses that do not have sections but have a long title, are shortened to five letters.',
        type: 'display'
    },
    {
        id: 'sectionsBreadcrumb',
        title: 'Display Sections in Breadcrumb',
        description: 'This will display the sections for the course in the breadcrumb after the course name. If a section was cross-listed into the course, it is highlighted in blue.Blueprint courses display as "BP", Reference courses as "REF", and courses that do not have sections but have a long title, are shortened to five letters.',
        type: 'display'
    },
    {
        id: 'navToModules',
        title: 'Show Module Navbar',
        description: 'This will display the navbar on the modules page. All of the week/lesson modules have been shortened to \'W\' followed by the week/lesson.',
        type: 'display'
    },
    {
        id: 'addBlueprintParent',
        title: 'Link to Blueprint Parent Account',
        description: 'This will add a link to the modules navbar at the bottom of the page that links to the parent blueprint.If there is no blueprint for the course nothing will show up there. Operates seperate of the module navbar, so it will show up with or without the navbar option being selected.',
        type: 'display'
    },
    {
        id: 'deleteQuizQuestions',
        title: 'Delete all Quiz Questions',
        description: 'Show the option to delete all quiz questions in the extension popup. When you click the button it will confirm if you want to delete <em>All</em> of the quiz questions.It will not confirm for each individual question.',
        type: 'popup'
    },
    {
        id: 'blueprintLockItems',
        title: 'Lock/Unlock blueprint items',
        description: 'Show the option to lock and unlock blueprint items in the extension popup.',
        type: 'popup'
    },
    {
        id: 'divsToQuestions',
        title: 'Add Divs to Quiz Questions',
        description: 'Show the option to add Divs on quiz questions in the extension popup. This feature takes a little bit to run, but it\'s a lot faster than doing them individually.If you\'re looking at the console, you will see a lot of errors, but those are because the tool is running too fast for the page to load completely.',
        type: 'popup'
    },
    {
        id: 'adminAccountNames',
        title: 'Display Sub-accounts',
        description: 'This option will show the sub-account of courses in the Admin view. Will only display a sub-account if it\'s different than the previously displayed value.',
        type: 'display'
    },
    {
        id: 'blueprintAssociations',
        title: 'Link Associated Blueprint Courses',
        description: 'When you go to the associated courses tab in a blueprint course, this will make each course title a link to the correct course.',
        type: 'display'
    },
    {
        id: 'selectAllFiles',
        title: 'Select All Files Button',
        description: 'Displays the "select all" button when working with files.',
        type: 'display'
    },
    {
        id: 'killQuizzes',
        title: 'Deletes All Quizzes',
        description: 'Deletes all the quizzes in the Quizzes section.',
        type: 'popup'
    }
];

createPage(features);


/**
 * Change the color of the checkbox
 */
function colorItem(event) {
    let el;
    if (event.target) {
        el = event.target;
    } else {
        el = event;
    }
    if (el.nodeName === 'INPUT') {
        console.log(el.nodeName);
        if (el.checked) {
            el.parentNode.style.backgroundColor = '#42aaf4';
        } else {
            el.parentNode.style.backgroundColor = '#666';
        }
    }
}

/**
 * Saves options to chrome.storage
 */
function saveOptions() {
    let checkedFeatures = features.reduce((acc, curr) => {
        acc[curr.id] = document.querySelector(`#${curr.id}`).checked;
        return acc;
    }, {});

    chrome.storage.sync.set(
        checkedFeatures,
        () => {
            console.log('Options saved');
        }
    );
}

/**
 * Gets options from chrome.storage
 * Null value on the "get" returns all of the items
 */
function getOptions() {
    chrome.storage.sync.get(null, items => {
        features.forEach(curr => {
            document.querySelector(`#${curr.id}`).checked = items[curr.id];
        });
        document.querySelectorAll('.switch>input').forEach(colorItem);
    });
}

// Check if the extension was just installed
let bg = chrome.extension.getBackgroundPage().firstLoad();
if (bg <= 1) {
    console.log('First Load');
    firstOpen();
    document.querySelector('body').style.backgroundColor = 'pink';
} else {
    console.log('Not the first load');
}

document.addEventListener('DOMContentLoaded', () => {
    getOptions();
    document.querySelectorAll('.switch').forEach(el => el.addEventListener('click', colorItem));
    document.querySelectorAll('.switch').forEach(el => el.addEventListener('click', saveOptions));
});