# Project Capture Document for Extension: Add Div Wrapper to Question Bank Questions
#### *Author: Theron Dowdle*
#### *Stakeholder(s): Corey Moore and Team*
#### *Date: 3-26-2019*


## Background

Brother Moore's team has to add a div wrapper to all the questions in question banks. It takes a very long time to do manually because there are often 100 or more questions in a bank and each one requires multiple button clicks, and pasting code. They asked for a script that would do it programmatically for them.

-----

## Definition of Done

We are creating an extension tool that will reduce the process of adding a div wrapper to all questions in a question bank down to one button click.

-----

# Requirements

### General Requirements

### Input Requirements

#### Definition of Inputs

Button click from the user to run the tool

What class to assign the wrapper
```html
<div class="byui example">
```

#### Source of Inputs

* Manifest.json for the url(s) that will allow the tool to be run
* Chrome storage for whether the tool is active
* Extension popup for button click
* Gets the correct wrapper class from the course code

---

### Output Requirements

#### Definition of Outputs

No direct outputs, but it manipulates the LMS

* Programmatically clicks several buttons to enable editing for all questions
    * Button(s) to load all the questions for the question bank
    * Each questions:
        * Button to edit question contents
        * Button to edit question html
        * Removes extra/incorrect div wrappers
        * Add the wrapper `<div class="byui ${specificWrapper}`
        * Button to update the question


#### Destination of Outputs

* Directly in the LMS

---

### User Interface

#### Type:

Web Page: Activate or deactivate tools

![Options page](/proj_Lifecycle/images/options_page.PNG 'Activate or Deactivate Tools')

Popup: Run tool

![Popup](./editQuestionBanksPopup.PNG)

-----

## Expectations

### Timeline: Completed

### Best Mode of Contact: Slack/email

### Next Meeting: N/A

### Action Items
<!-- Recap Meeting -->
#### TechOps
#### Stakeholder

-----

#### *Approved By:* 
#### *Approval Date:*