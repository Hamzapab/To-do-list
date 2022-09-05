let input = document.querySelector("#enter");
let ulList = document.querySelector(".list");
let left = document.querySelector(".left");
const theme = document.querySelector('.theme');
let icon = document.querySelector("i");

// change Theme
theme.addEventListener('click', function () {
  let darkThemeEnabled = document.body.classList.toggle('dark-theme');
  localStorage.setItem('dark-theme-enabled', darkThemeEnabled);
  icon.classList.toggle("fa-sun");
  if(icon.style.color === "black") icon.style.color = "white";
  else icon.style.color = "black";
  if(document.querySelector("h1").style.color === "black") document.querySelector("h1").style.color = "white";
  else document.querySelector("h1").style.color = "black";
});
if (JSON.parse(localStorage.getItem('dark-theme-enabled'))) {
  document.body.classList.add('dark-theme');
}




let taskArray = [];


// Check if Theres Tasks In Local Storage
if (localStorage.getItem("tasks")) {
  taskArray = JSON.parse(localStorage.getItem("tasks"));
}

fromLS()

input.addEventListener("blur", function () {
  if (input.value !== "") {
    toArray(input.value);
    input.value = ""; 
  }
});
// push task to taskarray
function toArray(taskText){ // taskText is the input.value;
  let task = {
    id : Date.now(),
    title : taskText,
    completed : false,
  }
taskArray.push(task);
  addTask(taskArray);
  toLs(taskArray);
}

// Add Task to the page
function addTask(taskArray){
  ulList.innerHTML ="";
  taskArray.forEach((task) => {
    let li = document.createElement("li");
    li.className = "task";
    if (task.completed) {
      li.className = "task done";
      li.style.cssText = "background-color : #b9b2b2; text-decoration: line-through;display : none;"
    }
    li.setAttribute("data-id", task.id);
    li.appendChild(document.createTextNode(task.title));
    // let span = document.createElement("span")
    // span.className = "check";
    // li.appendChild(span)
    ulList.appendChild(li);
  })
  updateLeft(taskArray);
}
// add data to local storage
function toLs(taskArray) {
  window.localStorage.setItem("tasks", JSON.stringify(taskArray));
}
ulList.addEventListener("click",(e)=>{
  if (e.target.classList.contains("task")) {
    completedStatus(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }else e.target.className = "task"
  if(e.target.classList.contains("task") && e.target.classList.contains("done")){
    e.target.style.cssText = "background-color : #b9b2b2; text-decoration: line-through;"
  }else  e.target.style.cssText = "background-color : white;"
})
// create array that has data from ls
function fromLS() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addTask(tasks);
    updateLeft(tasks);
  }
}
function completedStatus(taskId) {
  for (let i = 0; i < taskArray.length; i++) {
    if (taskArray[i].id == taskId) {
      taskArray[i].completed == false ? (taskArray[i].completed = true) : (taskArray[i].completed = false);
    }
  }
  updateLeft(taskArray)
  toLs(taskArray);
}

//  working on the info div
function updateLeft(arr){
  left.innerHTML = "";
  left.innerHTML = `${arr.length} items left`
}


let todoli=document.querySelectorAll(".task");
todoli.forEach(elem => {
  if(elem.classList.contains("done")){
      elem.style.display="none";
  }else{
      elem.style.display="block";
  }
});
// clear completed task
let clear = document.querySelector(".clear");
clear.addEventListener("click", ()=>{
  todoli=document.querySelectorAll(".task");
  let arr = [];
    todoli.forEach(elem => {
        if(elem.classList.contains("done")){
          //  from ls
          deleteFromLS(elem.getAttribute("data-id"));
          // from page
          elem.remove();
        } else arr.push(1)
    });
    console.log(arr)
    updateLeft(arr);
})
// acess completed task
let completedShow = document.querySelector(".completed");
completedShow.addEventListener("click",()=>{
  todoli=document.querySelectorAll(".task");
  todoli.forEach(elem => {
    if(elem.classList.contains("done")){
        elem.style.cssText = "background-color : #b9b2b2; text-decoration: line-through;display:block";
    }else{
      elem.style.display = "none";
    }
  });
})


// accsess active Task
let activeShow = document.querySelector(".active");

activeShow.addEventListener("click",()=>{
  todoli=document.querySelectorAll(".task");
  todoli.forEach(elem => {
    if(elem.classList.contains("done")){
        elem.style.display= "none";
    }else{
      elem.style.display = "block";
    }
  });
})

// accsess ALL Task
let allShow = document.querySelector(".all");

allShow.addEventListener("click",()=>{
  todoli=document.querySelectorAll(".task");
  if(todoli.length === 0) ulList.appendChild(document.createTextNode("No Task"))
  todoli.forEach(elem => {
    elem.style.display = "block";
  });
})

function deleteFromLS(taskId){
  taskArray = taskArray.filter(task => task.id != taskId );
  toLs(taskArray);
}

// window.localStorage.clear() 