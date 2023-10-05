// FORM DATA

const taskTitle = document.getElementById("task-title");
const taskDescription = document.getElementById("task-description");

const form = document.getElementById("form");

// TO-DO LIST
const formTaskList = document.getElementById("task-addlist-list");
const taskText = document.getElementById("task-addlist-text");
const submitButton = document.getElementById("form-submit");

const taskContainer = document.getElementById("task-container");


// LOAD STORAGE
loadTasks();

//* EVENT FOR HANDLING ADDING LIST ITEMS BEFORE SUBMIT
const formAddButton = document.getElementById("task-addlist-button");
formAddButton.onclick = () => {

    if (taskText.value.trim() === '') return;

    const formLI = document.createElement("li");

    formLI.innerHTML = `<span><input type="checkbox"> </span><button type="button" class="button-remove" onclick="removeTask(this)">Remover</button>`;
    formLI.firstChild.appendChild(document.createTextNode(taskText.value));

    formTaskList.appendChild(formLI);

    taskText.value = '';
    taskText.focus();
}

// EVENT TO HANDLE FORM SUBMISSION
submitButton.onclick = () => {
    if (taskTitle.value === undefined || taskTitle.value.trim() === '') return;
    const objectivesArray = [];


    document.querySelectorAll("#task-addlist-list li>span").forEach((element) => {
        objectivesArray.push(
            {
            title: element.innerText.trim(),
            checked: element.querySelector('input[type="checkbox"]').checked
            }
        )
    })

    const task = new Task(taskTitle.value, taskDescription.value, objectivesArray);
    taskContainer.appendChild(task.createTaskElement());

    form.reset();
    formTaskList.replaceChildren();
    storeTasks();
}
