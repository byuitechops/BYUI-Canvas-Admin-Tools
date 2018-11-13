var courseRows = [];

function buildDetails(row) {
    return new Promise((resolve, reject) => {
        var info = {
            row: row,
            courseLink: row.querySelector('a[href*="/courses/"]'),
            courseID: row.querySelector('a[href*="/courses/"]').getAttribute('href').split('/courses/')[1],
            sections: []
        };

        function receive() {
            var data = JSON.parse(this.responseText.replace('while(1);', ''));
            info.sections = data;
            resolve(info);
        }

        function onError() {
            reject(`Failure to retrieve data for course ${info.courseID}`);
        }

        var request = new XMLHttpRequest();
        request.addEventListener('load', receive);
        request.addEventListener('error', onError);
        request.open('GET', `https://byui.instructure.com/api/v1/courses/${info.courseID}/sections`);
        request.send();
    });
}

function createColumn(columnID, Title) {
    if (document.querySelector(`#${columnID}`)) {
        return;
    }
    var headerRow = document.querySelector('thead>tr');
    var newHeader = document.createElement('th');
    newHeader.id = columnID;
    newHeader.innerText = Title;
    headerRow.appendChild(newHeader);
}

function createColumnCells(columnID) {
    courseRows.forEach(courseRow => {
        if (courseRow.querySelector(`.${columnID}`)) {
            return;
        }
        var newCell = document.createElement('td');
        newCell.classList.add(columnID);
        courseRow.appendChild(newCell);
    });
}

function populateSectionsColumn(courses, columnID) {
    courses.forEach(course => {
        var cellContents = '';

        cellContents = course.sections.map(section => {
            var colorClass = section.nonxlist_course_id !== null ? 'color:#42aaf4' : '';
            var sectionName = section.name.replace(/section/i, '').replace(/\s*/, '');
            // Reference courses to REF
            sectionName = sectionName.includes('Reference') ? 'REF' : sectionName;
            // Course Council View courses to CCV
            sectionName = sectionName.includes('Course Council View') ? 'CCV' : sectionName;
            // Blueprint courses to BP
            sectionName = sectionName.includes('Blueprint') ? 'BP' : sectionName;
            // Long section names to just 3 letters with ...
            sectionName = sectionName.length > 5 ? sectionName.substring(0, 5) + '...' : sectionName;
            // Pad single numbers with a 0
            if (sectionName.length === 1) {
                sectionName = '0' + sectionName;
            }
            return `<span style="${colorClass}">${sectionName}</span>`;
        }).join(', ');

        var termCell = course.row.lastChild;

        if (termCell.classList.value.includes(columnID)) {
            termCell.innerHTML = cellContents;
        }
    });
}

function main() {
    return new Promise((resolve, reject) => {
        courseRows = Array.from(document.querySelectorAll('tr')).slice(1);

        /* Create columns and cells */
        createColumn('crossListedSections', 'Sections');
        createColumnCells('crossListedSections', courseRows);

        var allCourseRows = courseRows.map(row => buildDetails(row));

        Promise.all(allCourseRows)
            .then(courses => {
                /* Populate columns here with their respective functions */
                populateSectionsColumn(courses, 'crossListedSections');
            })
            .then(resolve)
            .catch(reject);
    });
}

/* If the option to show the cross-listed column is on, then do it */
chrome.storage.sync.get({
    sectionsColumn: false,
}, function (items) {
    if (items.sectionsColumn === true) {
        var tableHTML = '';
        /* Check if the search results have changed at all, and if they have, insert sections */
        setInterval(() => {
            var currTable = document.querySelector('tbody').innerHTML;
            if (tableHTML !== currTable) {
                main()
                    .then(() => {
                        tableHTML = document.querySelector('tbody').innerHTML;
                    })
                    .catch(console.error);
            }
        }, 250);
    }
});