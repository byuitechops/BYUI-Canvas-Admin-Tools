# Project Capture Document for Canvas Admin Tools 
#### *Author: Theron Dowdle*
#### *Stakeholder(s): Corey Moore & team*
#### *Date: 2/27/2019*


## Background
There are many tasks that Corey and his team have to complete in canvas that take a long time, just because they have to click through many things.  They wanted something that would automate some of those clicking tasks.
The solution we decided on was to create a chrome extension that would automate those things for them.  The extension contains many tools, and each tool has its own capture doc describing it more in detail.

-----

## Objectives
* Build a container, which shall contain many tools. 
    * Make it easy to add more tools
* Give end-user a nice UI to interact with each tool. 
* The container holds the code that traffics the tool to canvas.
* Deliver an extension to stakeholder that makes it easy for them do repetitive admin tasks on Canvas.

-----

# Requirements

### Input Requirements

#### Source of Inputs

The user will select which tools are enabled on the options page of the extension. The options on that page set which tools are enabled/disabled. The program consumes their settings by reading it from local Chrome storage.

#### Definition of Inputs

* Checklist on the options page
    * The enabled tools have the checkbox area highlighted blue
* The enabled/disabled status of each tool is saved to chrome storage

The input will be a key-pair value, where the key is the name of the tool, and the value will be true or false. True means the tool is enabled, false means the tool has been disabled. For example:
```javascript
{
    deleteQuizQuestions: false,
    killQuizzes: false,
    blueprintLockItems: false,
    divsToQuestions: false,
    adminAccountNames: false
}
```

---

### Output Requirements
#### Destination

Depends on the tool. Most of the tools don’t have an output.  They manipulate the DOM, but don’t give the user feedback on that.  If it does what it’s supposed to, they will see the manipulation they wanted. 

The destination of the settings that the user selects is the user's local Chrome storage.

#### Definition of Outputs

The outputs look like the inputs.

---

### Interface

#### Type: 

* Options page where you can enable/disable each tool.
* Popup in the browser where the user will tell the extension to run a tool through a button press.
* The extension pop-up acts as an interface between the user for some tools, other tools run behind the scenes, if they are enabled.


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

#### *Approved By:* Aaron Shiffler
#### *Approval Date:* 3 April 2019