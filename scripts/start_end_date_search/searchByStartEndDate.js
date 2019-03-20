function getData(account, search, page) {
    return new Promise((resolve, reject) => {
        var info = {
            urlStart: 'things'
        };

        function receive() {
            var data = JSON.parse(this.responseText);
            // info.sections = data;
            resolve(data);
        }

        function onError() {
            reject(`Failure to retrieve data for course ${info.courseID}`);
        }

        var request = new XMLHttpRequest();
        request.addEventListener('load', receive);
        request.addEventListener('error', onError);
        request.open('GET', `https://byui.instructure.com/api/v1/accounts/${account}/courses?search_term=${search}&search_by=course&page=${page}&per_page=15`);
        request.send();
    });
}

(() => {

    setTimeout(() => {


        // Get how many pages there are
        let buttonList = document.querySelectorAll('nav[data-uid="Pagination"] button[data-uid="Button PaginationButton"] span');
        // console.log(buttonList);
        let button = buttonList[buttonList.length - 1];

        // num = How many pages
        let num = parseInt(button.innerText.replace(',', ''));
        let results = (num - 1) * 15;

        let url = window.location.href.split('?');
        url[1] = url[1] === '' ? url[1] = `page=${num}` : url[1].replace('page=1', 'page=3');
        // The url? 
        url = url.join('?');
        // window.location.href = url;
    }, 1500);
})();

// async function thing() {
//     await fetch('https://byui.instructure.com/api/v1/accounts/1/courses?sort=sis_course_id&search_by=course&per_page=15', {
//             'credentials': 'include',
//             'headers': {
//                 'accept': 'application/json, text/javascript, application/json+canvas-string-ids, */*; q=0.01',
//                 //'accept-language': 'en-US,en;q=0.9',
//                 'if-none-match': 'W/\'6cedd74d037dbd4101d2e75d3609e78c-gzip\'',
//                 'x-csrf-token': 'KwYeEzsv6lnOTzcq2SjqPCby4os1CR/Y2txXdrS6xFdDVFdeC3+iHrt5eB2zUbpEf5OApF5YTJWUihYu08mRLQ==',
//                 'x-requested-with': 'XMLHttpRequest'
//             },
//             'referrer': 'https://byui.instructure.com/accounts/1?',
//             'referrerPolicy': 'no-referrer-when-downgrade',
//             'body': null,
//             'method': 'GET',
//             'mode': 'cors'
//         })
//         .then((el) => {
//             // el.trailer()
//             // console.log('Keys: ', thing);
//             return el.headers.entries();
//         })
//         .then(json => {
//             console.log('Thing ', json);
//         });

// }

// thing();
// otherThing();

// Get the headers for how many pages there are: el.headers.get('Link')