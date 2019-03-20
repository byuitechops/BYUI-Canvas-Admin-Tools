# Project Capture Document for Canvas Admin Tools 
#### *Author: Theron Dowdle*
#### *Stakeholder(s): Corey Moore & team*
#### *Date: 2/27/2019*


## Background
There are many tasks that they have to complete in canvas that take a long time, just because they have to click through many things.  They wanted something that would automate some of those clicking tasks.

-----

## Objectives
* Automate admin tasks in Canvas
	* There are many different tasks to automate, and they are continuously adding more ideas.
* Display more than the default information on courses in specific places


-----

# Requirements

### Input Requirements

#### Source of Inputs

The user will select which tools are enabled on the options page

#### Definition of Inputs

* Checklist on the options page
* The enabled tools have the checkbox area highlighted blue
* The enabled/disabled status of each tool is saved to chrome storage

---

### Output Requirements
#### Destination

Depends on the tool. Most of the tools don’t have an output.  They manipulate the DOM, but don’t give the user feedback on that.  If it does what it’s supposed to, they will see the manipulation they wanted. 

#### Definition of Outputs

N/A

---

### Interface

#### Type: 

* Options page where you can enable/disable each tool.
* Popup in the browser where the user will tell the extension to run a tool through a button press.


#### 

Options  
![Options page](/proj_Lifecycle/images/options_page.PNG)  

Popup  
![Popup](/proj_Lifecycle/images/popup.png)

-----

## Sub-Tools

[Display Section Column](/scripts/crossList/ProjectCaptureDoc_crossList.md)  
[Display Sections in Breadcrumb]()  
[Show Module Navbar]()  
[Link to Blueprint Parent]()  
[Display SubAccounts]()  
[Link Associated Blueprint Courses]()  
[Delete all Quiz Questions]()  
[Lock/Unlock Blueprint Items]()  
[Add Divs to Quiz Questions]()  
[Delete All Quizzes]()  
[Select All Files]()  
[Editor]()  

-----

## Expectations

### Timeline: Completed/maintaining

### Best Mode of Contact: Slack, email, go up and talk to him

### Next Meeting: N/A


### Action Items
\**Recap Meeting*\*
#### TechOps
* Keep adding tools to the extension as they come up with more ideas.
#### Stakeholder
* Come up with more tools that they need.

-----

#### *Approved By:* 
#### *Approval Date:*