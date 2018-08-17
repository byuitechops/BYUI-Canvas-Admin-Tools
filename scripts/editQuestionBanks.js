/**
 * 1. Click edit button
 * 
 * 2. Click "htlm" button
 * 
 * 3. Add div's
 * 
 * 4. Save
 * 
 */

function loadFullPage() {
	return new Promise((resolve, reject) => {
		let more_questions = document.querySelector('#more_questions')
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
	})
}

function getClass(check) {
	let classCheck = check ? '.edit_teaser_link' : '.edit_question_link';
	// console.log(classCheck);
	return classCheck;
}

function editButton(button) {
	button.click();
	console.log('Edit button clicked');
	return;
}

function htmlClick(button, i) {
	console.log(button, button.style.display)
	button.click();
	return `HTML button ${i} clicked!`;
}


function main(check) {
	return new Promise((resolve, reject) => {
		let buttonClass = getClass(check);
		let allQuestions = document.querySelectorAll('#questions .links');
		let editButtons = document.querySelectorAll(`#questions ${buttonClass}`);
		let htmlButtons;

		allQuestions.forEach((question, index) => {
			editButton(editButtons[index])
			htmlButtons = document.querySelectorAll('#questions .toggle_question_content_views_link');
			htmlButtons = Array.from(htmlButtons).filter(button => {
				return button.innerHTML === "HTML Editor"
			})

			setTimeout(() => {
				htmlClick(htmlButtons[index], index)
				console.log('HTML click');
			}, 5000)
		})

		// editButton(buttonClass)
		// 	.then(resolve('Finished'));
		// console.log(buttonClass);
	})
}

// function doThings() {
// 	// Determines the amount of pages of questions and clicks "more questions" if it's available
// 	loadFullPage()
// 		.then(() => {
// 			// #0 Get name of course to put into divs
// 			var title = document.querySelectorAll(".ellipsible")[1].innerHTML;
// 			var courseName = title.substr(0, title.indexOf(":")).replace(" ", "").toLocaleLowerCase();

// 			setTimeout(function () {
// 				setTimeout(function () {
// 					// #1 EDIT --------------------------------------------------------------------------
// 					console.log("Clicking all the edit buttons...");
// 					var editButtons = document.querySelectorAll("#questions .edit_teaser_link");
// 					var i;
// 					for (i = 0; i < editButtons.length; i++) {
// 						editButtons[i].click();
// 					};

// 					setTimeout(function () {
// 						// #2 HTML -----------------------------------------------------------------------
// 						console.log("Switching to html mode...");
// 						// Changes all questions to HTML editing mode
// 						var htmlButtons = document.querySelectorAll(".toggle_question_content_views_link");
// 						var i;
// 						for (i = 0; i < htmlButtons.length - 2; i++) {
// 							if (htmlButtons[i].innerHTML == "HTML Editor") {
// 								htmlButtons[i].click();
// 							};
// 						};

// 						setTimeout(function () {
// 							// #3 DIVS -----------------------------------------------------------------------
// 							console.log("Adding divs...");
// 							// Adds proper divs to each question
// 							var textareas = document.querySelectorAll(".question_content");
// 							var i;
// 							for (i = 0; i < textareas.length - 1; i++) {
// 								if (textareas[i].value.includes(`<div class=\"byui ${courseName}\">`) != true) {
// 									textareas[i].value = `<div class=\"byui ${courseName}\">` + textareas[i].value + "</div>";
// 								}
// 							};

// 							setTimeout(function () {
// 								// #4 SAVE -----------------------------------------------------------------------
// 								console.log("Updating questions...");
// 								// Saves/updates all the questions
// 								var updateButtons = document.querySelectorAll(".btn.btn-small.submit_button.btn-primary");
// 								var i;
// 								for (i = 0; i < updateButtons.length - 1; i++) {
// 									updateButtons[i].click();
// 								};
// 							}, 10000);
// 						}, 10000);
// 					}, 10000);
// 				}, 10000);

// 			}, 1000);
// 		});
// }

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		if (request.call === 'divsToQuestionBanks') {
			// doThings();
			loadFullPage()
				.then(main)
				// .then(console.log)
				.catch(console.error);
		}
		sendResponse()
	});

// Awesome stuff that Ben wrote and whatever!

// var holder = Array.from(document.querySelectorAll('#questions .question_holder')).filter(holder => !holder.querySelector('.question_form'))[0]
// // 
// holder.querySelector('.edit_question_link , .edit_teaser_link').click()
// holder.querySelector('.question_teaser_link').click()
// setTimeout(() => {

// //     setTimeout(() => {
//    holder.querySelector('.question_teaser_link').click()
//    holder.querySelector('.toggle_question_content_views_link').click()
// //     },500)
// },500)


//console.log(holder.querySelector('.question_content').value)
//setTimeout(() => holder.querySelector('.question_content').value = "howdy",1000)
var $_ = sel => Array.from(document.querySelector(sel))
var $$_ = sel => Array.from(document.querySelectorAll(sel))

$$_("#questions .question .edit_teaser_link").slice(0, 1).forEach((n, i) => n.click())
setTimeout(() => {
	$$_("#questions .question .toggle_question_content_views_link").slice(0, 1).forEach((n, i) => n.click())
	$$_("#questions .question .question_content").slice(0, 1).forEach((n, i) => n.value = "AGHHHHHHH!")
}, 0)
