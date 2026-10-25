

 let tasksdata = {}
 const todo = document.querySelector("#todo");
 const progress = document.querySelector("#progress");
 const done = document.querySelector("#done");
 //const addTaskbutton = document.querySelector("#add-new-task")
 const columns = [todo,progress,done]
 let dragelement = null;



function addTask(title,desc,column){


const div = document.createElement("div")

div.classList.add("task")
div.setAttribute("draggable", "true")

div.innerHTML = `<h2>${title}</h2>

                 <p>${desc}</p>
                 <button>Delete</button>

                           ` 


column.appendChild(div)  

div.addEventListener("drag", (e)=>{

dragelement = div;


})

const deletebutton = div.querySelector("button")
deletebutton.addEventListener("click", ()=>{
   div.remove();
   updateTaskCount();
})

return div;

}


function updateTaskCount(){

columns.forEach(col =>{

const tasks = col.querySelectorAll(".task");
const count = col.querySelector(".right");

 tasksdata[ col.id ] = Array.from(tasks).map(t => {

   return{
        title: t.querySelector("h2").innerText,
        desc: t.querySelector("p").innerText
  }

 })

   localStorage.setItem("tasks", JSON.stringify(tasksdata));
   count.innerText = tasks.length;

})

}




if(localStorage.getItem("tasks")){

const data =  JSON.parse(localStorage.getItem("tasks"));
console.log(data)
for(const col in data){

const column = document.querySelector(`#${col}`);

data[col].forEach(task=>{

addTask(task.title, task.desc, column);

})

}

updateTaskCount();

}



const tasks = document.querySelectorAll(".task")


 tasks.forEach((task)=>{

 task.addEventListener("drag",(e)=>{
  dragelement = task

 })

 })

function addDragEventOnColumn(column){


column.addEventListener("dragenter",(e)=>{
e.preventDefault();
column.classList.add("hover-over");
})

column.addEventListener("dragleave",(e)=>{
e.preventDefault();
column.classList.remove("hover-over")

})


column.addEventListener("dragover",(e)=>{

e.preventDefault();

})


column.addEventListener("drop", (e)=>{
e.preventDefault();





column.appendChild(dragelement);
column.classList.remove("hover-over");



updateTaskCount();



})



 }


addDragEventOnColumn(todo);
addDragEventOnColumn(progress);
addDragEventOnColumn(done);

/*modal related logic*/

const togglemodalbutton = document.querySelector("#toggle-modal")
const modal = document.querySelector(".modal")
const modalbg = document.querySelector(".modal .bg")
const addTaskbutton = document.querySelector("#add-new-task")

togglemodalbutton.addEventListener("click", (e)=>{

modal.classList.toggle("active")

})

modalbg.addEventListener("click",(e)=>{

modal.classList.remove("active")

})


addTaskbutton.addEventListener("click",(e)=>{


const taskTitle = document.querySelector("#task-title-input").value
const taskDesc = document.querySelector("#task-desc-input").value




addTask(taskTitle ,taskDesc, todo );
updateTaskCount();
modal.classList.remove("active")

document.querySelector("#task-title-input").value="";
document.querySelector("#task-desc-input").value="";

})

























