# Project Capture Document for Extension: Delete Quizzes
#### *Author: Theron Dowdle*
#### *Stakeholder(s): Corey Moore and Team*
#### *Date: 3/29/2019*


## Background

Corey Moore and his team had the task of deleting the quizzes in courses, which is a very repetitive, time-consuming task.  They requested a tool that would automate this process. 

-----

## Definition of Done

This tool will add a button to the extension popup that will delete all the quizzes for a course.

-----

# Requirements

### General Requirements

### Input Requirements

#### Definition of Inputs

* Button click to delete the quizzes  
* Confirm that they want all the quizzes deleted

#### Source of Inputs

* The first button is in the extension popup 
* The button to confirm the delete is an alert
* Finds button to delete each quiz through selector `#assignment-quizzes .quiz .delete-item`

---

### Output Requirements

#### Definition of Outputs

Deletes all quizzes in a course.

<!-- List here a type definition for each output? For example, if the changes are directly to the LMS, list all changes that occur. If it is a CSV define the column names. If it is a JSON, give an example of the JSON structure. -->

#### Destination of Outputs

Directly on the LMS

<!-- Paragraph where/who to send outputs. To who? To where: Email, server, directly to LMS...? It would also include the steps to get access to the locations you need, such as getting added to a Trello Board, or access to a server, or the LMS. -->

---

### User Interface

#### Type:

Popup button:  
![Delete Quizzes Popup Button](./popupDeleteQuizzes.PNG 'Delete all Quizzes Popup Button')


Web alert:   
![Delete Quizzes Alert](./confirmDeleteAlert.PNG 'Confirm delete all quizzes')

<!-- CLI with Flags, CLI With Prompt, Web Page, Server, Library, etc -->

<!-- What are the flags, what are Major Questions, Images of UX/UI Design. -->

-----

## Expectations

### Timeline: Done

<!-- Include Milestone List here with Deadlines and try to make each milestone a minimum viable product
- Milestone 1: Finish Design (3/19)
- Milestone 2: Build Core logic to search for words in syllabi (3/22)
- Milestone 3: Connect inputs to core logic and set up outputs (3/25)
- Milestone 4: Deliver the project (3/26)
This will probably be overkill for small projects -->

### Best Mode of Contact: Slack/email

### Next Meeting: N/A


### Action Items
<!-- Recap Meeting -->
#### TechOps
#### Stakeholder

-----

#### *Approved By:* 
#### *Approval Date:*