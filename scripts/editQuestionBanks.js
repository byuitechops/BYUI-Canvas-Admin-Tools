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

function EditButton() {
	let editButtons = document.querySelectorAll("#questions .edit_question_link");
	editButtons.forEach(el => el.click());
	return;
}

function getClass() {

	/**
	 * Check for '.more_questions_link'
	 * if it exists, go with '.edit_teaser_link'
	 * if not '.edit_question_link'
	 */
}



// Sometimes the class needs to be replaced with ".edit_teaser_link" if there are more than 25 questions
// #1 EDIT


setTimeout(function () {
	setTimeout(function () {
		// #2 HTML
		console.log("Switching to html mode...");
		// Changes all questions to HTML editing mode
		var htmlButtons = document.querySelectorAll(".toggle_question_content_views_link");
		var i;
		for (i = 0; i < htmlButtons.length - 2; i++) {
			if (htmlButtons[i].innerHTML == "HTML Editor") {
				htmlButtons[i].click();
			};
		};

		setTimeout(function () {
			// #3 DIVS
			console.log("Adding divs...");
			// Adds proper divs to each question
			var textareas = document.querySelectorAll(".question_content");
			var i;
			for (i = 0; i < textareas.length - 1; i++) {

				// >---------------------** CHANGE THE CLASS CODE HERE **---------------------< 

				if (textareas[i].value.includes("<div class=\"byui cit365\">") != true) {
					textareas[i].value = "<div class=\"byui cit365\">" + textareas[i].value + "</div>";
				}
			};

			setTimeout(function () {
				// #4 SAVE
				console.log("Updating questions...");
				// Saves/updates all the questions
				var updateButtons = document.querySelectorAll(".btn.btn-small.submit_button.btn-primary");
				var i;
				for (i = 0; i < updateButtons.length - 1; i++) {
					updateButtons[i].click();
				};
			}, 3000);
		}, 3000);
	}, 3000);
}, 3000);

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		if (request.call === 'deleteQuestions') {
			var elt = document.createElement("script");
			elt.innerHTML = '(' + deleteQuestions.toString() + ')()';
			document.head.appendChild(elt);
		}
		sendResponse()
	});