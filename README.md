# acquaa_ui

Implemented single page application for todo-list which provide facilty to add, list, update, delete tasks. It has facility to filter the task based on different options provided.
For storage of task, Browser Local storage is used.

how to run the code and mange todo-list:
Extract zip file provided.
Open html file using your favorite browser.
To create new task: 
  Enter task description in input box provided
  select priority for the task
  submit the task
To update the task to completed or pending
  check the checkbox for the respective task to mark as completed
  uncheck the checkbox for the respective task to mark as pending
To delete the task
  click on delete for the respective task to delete
To Filter based on the requirement
  select the filter option from the dropdown to display filtered tasks
  
   


Install cors in server
npm install cors

add below line to index.js for node server
var cors = require('cors');
app.use(cors());