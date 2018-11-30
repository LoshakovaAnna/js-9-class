document.addEventListener("DOMContentLoaded", init);
var arrStudents = [];
var arrIssues = [];

function init(){
    let btnCreateStudent = document.querySelector(".create-student");
    btnCreateStudent.addEventListener("click", createNewStudentByForm);

    let btnCreateIssues = document.querySelector(".create-issues");
    btnCreateIssues.addEventListener("click", createNewIssuesByForm);

    let btnShowAll= document.querySelector(".show-all");
    btnShowAll.addEventListener("click", function(){
        console.log(arrStudents);
    });

    createNewStudent("st1", "1");
    createNewStudent("st2", "4");
    createNewStudent("st3", "3");
    createNewStudent("st4", "2");
    let date1 = new Date().setMonth(5)
    let date2 = new Date().setMonth(9)
    let date3 = new Date().setMonth(11)
    let date4 = new Date().setDate(20)
    let date5 = new Date().setMonth(8)
    createIssues("task1", date1 );
    createIssues("task2", date2 );
    createIssues("task3", date3 );
    createIssues("task4", date4 );
    createIssues("task5", date5 );

    for (let i = 0; i < arrStudents.length; i++) {
        arrStudents[i].issues[0].isCompleated = true;       
    }
    console.log("Completed issues");
    console.log(arrStudents[0].getCompleted());

    console.log("Failed issues")
    console.log(arrStudents[0].getFailed());
};

function createNewStudentByForm() {
    let inputNameStudent = document.querySelector("#student-name");
    let inputGroupStudent = document.querySelector("#student-group");
    createNewStudent(inputNameStudent.value, inputGroupStudent.value);    
};

function createNewStudent(name, group){
    let newStudent = new GenStudent(name,group);
    console.log(newStudent);
    arrStudents.push(newStudent);
    let countStudent = document.querySelector(".count-student");
    countStudent.textContent = arrStudents.length;
};

function createNewIssuesByForm() {
    let inputNameIssues = document.querySelector("#issues-name");
    let inputIssuesDeadline = document.querySelector("#issues-deadline");
    createIssues(inputNameIssues.value, inputIssuesDeadline.value); 
};

function GenIssues(name, deadLine){
    this.name = name;
    this.deadLine = deadLine;
    this.isCompleated = false;
    this.mark = 0;
};

function createIssues(name, deadLine){
    let deadLineDate = new Date(deadLine);
    let newIssues = new GenIssues(name, deadLineDate);
    for (let i = 0; i < arrStudents.length; i++) {
        arrStudents[i].issues.push(newIssues); 
    }  

    console.log(newIssues);
    arrIssues.push(newIssues);
    let countIssues = document.querySelector(".count-issues");
    countIssues.textContent = arrIssues.length;
};

function GenStudent(name, group) {
    this.name = name;
    this.group = group
    this.issues = [];    
};

GenStudent.prototype.getCompleted = function() {
    let arrCopleted = [];
    for (let i = 0; i < this.issues.length; i++) {
      if (this.issues[i].isCompleated)
        arrCopleted.push(this.issues[i]);        
    }
    return arrCopleted;
};

GenStudent.prototype.getFailed = function() {
    let arrFailed = [];
    let today = new Date();
    for (let i = 0; i < this.issues.length; i++) {
      if ((!this.issues[i].isCompleated) && (this.issues[i].deadLine < today))
      arrFailed.push(this.issues[i]);        
    }
    return arrFailed;
};