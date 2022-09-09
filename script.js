let input = document.querySelector("#enter");
let ulList = document.querySelector(".list");
let left = document.querySelector(".left");
const theme = document.querySelector('.theme');
let icon = document.querySelector("i");

// change Theme
theme.addEventListener('click', function () {
  let darkThemeEnabled = document.body.classList.toggle('dark-theme');
  localStorage.setItem('dark-theme-enabled', darkThemeEnabled);
  document.querySelector(".icon").classList.toggle("fa-sun");
  document.querySelector(".icon").classList.toggle("dark-theme-color");
  document.querySelector("h1").classList.toggle("dark-theme-color");
  for(let i = 0; i < document.querySelectorAll(".task").length;i++){
    document.querySelectorAll(".task")[i].classList.toggle("white-li");
    document.querySelectorAll(".task")[i].classList.toggle("dark-li");
  }
});
if (JSON.parse(localStorage.getItem('dark-theme-enabled'))) {
  document.body.classList.add('dark-theme');
  document.querySelector(".icon").classList.add("fa-sun")
  document.querySelector(".icon").classList.add("dark-theme-color")
  document.querySelector("h1").classList.add("dark-theme-color");
  if(document.querySelector(".task")) document.querySelector(".task").add("dark-li");
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
    let i = document.createElement("i");
    li.className = "task";
    li.setAttribute("data-id", task.id);
    li.appendChild(document.createTextNode(task.title));
    i.className= " check fa-regular fa-circle-check";
    li.appendChild(i)
    let x = document.createElement("i");
    x.className = "fa-solid fa-xmark";
    li.appendChild(x)
    if(document.body.classList.contains("dark-theme")){
      li.classList.add("dark-li")
    }else li.classList.add("white-li")
    if (task.completed) {
      li.className = "task done";
      if(document.body.classList.contains("dark-theme")){
        li.classList.add("dark-li")
      }else li.classList.add("white-li")
      li.classList.add("completed-task")
      i.classList.remove("fa-regular");
      i.classList.add("fa-solid");
    }
    ulList.appendChild(li);
  })
  updateLeft(taskArray);
}
// add data to local storage
function toLs(taskArray) {
  window.localStorage.setItem("tasks", JSON.stringify(taskArray));
}
ulList.addEventListener("click",(e)=>{
  if(e.target.classList.contains("fa-xmark")){
    deleteFromLS(e.target.parentElement.getAttribute("data-id"))
    e.target.parentElement.remove();
  };
  if(!e.target.classList.contains("fa-xmark")){
    if (e.target.classList.contains("task")) {
      completedStatus(e.target.getAttribute("data-id"));
      e.target.classList.toggle("done");
    }else e.target.className = "task"
    if(e.target.classList.contains("task") && e.target.classList.contains("done")){
      e.target.classList.add("completed-task");
      e.target.firstElementChild.classList.remove("fa-regular");
      e.target.firstElementChild.classList.add("fa-solid");
    }else {
      e.target.classList.remove("completed-task");
      e.target.firstElementChild.classList.toggle("fa-solid");
      e.target.firstElementChild.classList.toggle("fa-regular");
      }
  } 
    let arr = [];
    let arrayT = document.querySelectorAll(".task")
    for(let i = 0; i < arrayT.length;i++){
      if(!arrayT[i].classList.contains("done")) arr.push(i);
    }
    updateLeft(arr)
})
// create array that has data from ls
function fromLS() {
  let arr = [];
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addTask(tasks);
    for(let i = 0; i < tasks.length;i++){
      if(!tasks[i].completed) arr.push(i)
    }
  }
  updateLeft(arr);
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
    updateLeft(arr);
})
// acess completed task
let completedShow = document.querySelector(".completed");
completedShow.addEventListener("click",()=>{
  todoli=document.querySelectorAll(".task");
  todoli.forEach(elem => {
    if(elem.classList.contains("done")){
        elem.style.cssText = ";display:block";
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
  if(todoli.length === 0) {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode("No Task Available"));
    li.className = "no-task"
    ulList.appendChild(li)
  }
  todoli.forEach(elem => {
    elem.style.display = "block";
  });
})
// clear All Task
let clearAll = document.querySelector(".clear-all");
clearAll.addEventListener("click", ()=>{
  console.log("im in")
  let arr =[];
  todoli=document.querySelectorAll(".task");
    todoli.forEach(elem => {
          //  from ls
          deleteFromLS(elem.getAttribute("data-id"));
          // from page
          elem.remove();
    });
    updateLeft(arr)
})
function deleteFromLS(taskId){
  taskArray = taskArray.filter(task => task.id != taskId );
  toLs(taskArray);
}
// window.localStorage.clear() 