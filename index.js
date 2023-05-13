window.onload = loadTask;

document.querySelector('.dark-mode').addEventListener('click', () => {
    document.body.classList.toggle('dark')
})

const text_task = document.getElementById('add-task');
const submit = document.querySelector('.submit');
let current_task;

submit.addEventListener('click', () => {
    add();
});


//to append lists in <ul>
function templete(ele) {
    let ul = document.querySelector('.tasks');
    let li = document.createElement('li');

    li.innerHTML = `
    <input type="checkbox" name="completed" id="completed" onclick="mark(this)" ${ele.completed ? 'checked' : ''} >
    <input type="text" name="task" id="task" value="${ele.value}" class="${ele.completed ? 'strike' : ''}" onfocus = "change(this)" onblur="edit(this)">
    <button id="Delete" onclick="del(this)"><i class="fa-solid fa-trash-can"></i></button>
    `;

    ul.appendChild(li);
}


//fetching all tasks from localstorage and converting it to array then returning
function haveTask() {
    return Array.from(JSON.parse(localStorage.getItem("tasks")));
}


//getting all tasks from localstorage  
function loadTask() {
    if (localStorage.length != 0) {
        let all_tasks = haveTask();

        all_tasks.forEach(ele => {
            templete(ele);   //appending each task to <ul>
        });
        // console.log(all_tasks);
    }
}


//adding task when clicked on add task
function add() {
    let input_val = text_task.value.toUpperCase();
    text_task.value = "";

    //check if input is empty
    if (input_val == "") {
        swal("Error!", "Empty entry!", "error");
        return false;
    }

    //check if input already exists in DOM
    if (document.querySelector(`input[value=${input_val}]`)) {
        swal("Error!", "Already exists!", "error");
        return false;
    }
    // let all_tasks = haveTask();
    // all_tasks.forEach((e) => {
    //     if (e.value == input_val) {
    //         alert("Already Exist");
    //         return false;
    //     }
    // })

    //create an object to add into localstorage as value of key = task;
    let obj = {
        value: input_val,
        completed: false
    }

    //appending to value of task..Here we are creating value as an array of objects with the task-value and completed status
    localStorage.setItem("tasks", JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || "[]"), obj]));
    templete(obj);    //append to <ul>
    // swal("Good Job!", "New task added", "success");

    // console.log(haveTask());
}


//mark the checkbox for showing completion of task and then changing comleted value of obj, then adding strike class to input box value
function mark(ele) {
    let all_tasks = haveTask();
    all_tasks.forEach((e) => {
        if (e.value === ele.nextElementSibling.value) {
            e.completed = !e.completed;
        }
    })
    localStorage.setItem("tasks", JSON.stringify(all_tasks));
    ele.nextElementSibling.classList.toggle('strike');
}


//getting current value of task-box to change
function change(ele) {
    current_task = ele.value;
    // console.log(current_task)
}


//edit the valeue to new input value
function edit(ele) {
    if (ele.value == "") {
        ele.value = current_task;
        swal("Error!", "Empty entry!", "error");
        return false;
    }
    if (ele.value.toUpperCase() === current_task) {
        swal("Error!", "Already exists!", "error");
        return false;
    }

    let all_tasks = haveTask();
    all_tasks.forEach((e) => {
        if (e.value === current_task) {
            ele.value =ele.value.toUpperCase();
            e.value = ele.value;
        }
    })

    localStorage.setItem("tasks", JSON.stringify(all_tasks));
    swal("Good Job!", "Task updated", "success");
}


//delete the task
function del(ele) {
    let element = ele.parentNode;  //get the <li> element
    let all_tasks = haveTask();
    all_tasks.forEach((e) => {
        if (e.value === ele.parentNode.children[1].value) {
            all_tasks.splice(all_tasks.indexOf(e.value), 1);  //delete from array of objects
        }
    })
    localStorage.setItem("tasks", JSON.stringify(all_tasks));  //update the localstorage
    element.remove();  //remove the li element
    swal("Triggered!", "Task will be deleted", "warning");

    // console.log(element);
}








