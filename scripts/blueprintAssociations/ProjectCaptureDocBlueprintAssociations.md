# Project Capture Document for Extension: Blueprint Associations
#### *Author: Theron Dowdle*
#### *Stakeholder(s): Corey Moore and Team*
#### *Date: 3/29/2019*


## Background

Something that Corey often had to do was go from a blueprint course to the courses associated to the blueprint.  The parent course would list its children courses, but there wasn't an easy way to get to them.  He requested something that would make the names of each course in that list also be a link to that course.

-----

## Definition of Done

This tool will take the list of associated courses, and turn each one into a link that takes you to that course. 

-----

# Requirements

### General Requirements

### Input Requirements

#### Definition of Inputs

No real inputs...
The program gets a list of courses that should be linked through the selector `#nav-tray-portal a[href*="/accounts"]`
Uses the ID of the each course to create a link, and put the name of the course as the value of the link

<!-- List here a type definition for each input. For example, if it is a CSV define the column names. If it is a JSON, give an example of the JSON structure. If it is user input, what will the user be asked for? -->

#### Source of Inputs

Directly from webpage

<!-- Paragraph of how to get inputs. From who? From where: Slack, email, server...? This also includes user selected options at runtime. How will we know what options to select? For example, in conversion tool, you'd follow the values on the Trello Board. It would also include the steps to get access to the information you need, such as getting added to a Trello Board, or access to a server. -->

---

### Output Requirements

#### Definition of Outputs

Change the name of each associated course from plain text to a link.

<!-- List here a type definition for each output? For example, if the changes are directly to the LMS, list all changes that occur. If it is a CSV define the column names. If it is a JSON, give an example of the JSON structure. -->

#### Destination of Outputs

Directly on the web page

<!-- Paragraph where/who to send outputs. To who? To where: Email, server, directly to LMS...? It would also include the steps to get access to the locations you need, such as getting added to a Trello Board, or access to a server, or the LMS. -->

---

### User Interface

#### Type:

None.

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