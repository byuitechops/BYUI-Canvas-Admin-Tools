# BYUI Canvas Admin Tools
## Purpose
Enables various features to Canvas that aren't available by default.
This includes features such as:
  - Deleting all quizzes or just the quiz questions within a specific quiz
  - Locking and unlocking all blueprint items
  - Adding the correct DIV to the course's html files
  - Displaying section number(s), module navigation bar, and other navigation features
  - And lots more!

## Development
### Implementation
If a user is logged in with their school email google account they should be able to go to the chrome extension store and it will be right there.
### Updating, Testing, etc.
This will contain features on how to work on, update, and organize the app.
If you're adding a new button to the extension popup:
  - Create file with desired logic within the *scripts* folder
  - Update the **manifest.json** with that file's name, based on where it'll be used (e.g. "https://\*.instructure.com/courses/\*/quizzes" if you were only going to be running this script on the quizzes page)
  - Add a button to the **popup.html** (wrap it in a label similar to the others)
    - Ensure the button and the label have separate IDs
  - Add it (in object form) to the list of features located in **options.js**
    - Add an id, title, description, and type
    - type entails whether it's a button pressed in the popup ('popup')
    - if you just want it to run in the background put 'display as the type
  - Add logic to **main.js**
    - First add to the chrome.storage.sync.get the name of the id you just created in the **options.js**
    - Set this to false
    - Make an if statement below that following the pattern of the other statements
    - Add "document.querySelector(#[insert the name of the label you put on popup.html]).style.display = 'none'
  - **Finally** add to the listener.js.
    - Add a 'case' with the name of the **button ID** to the switch statment
    - Add the function it will be calling (this function will be located in your logic/file that you made)
    - Add a sendResponse with a string saying what it successfully did (this is for the callback)
