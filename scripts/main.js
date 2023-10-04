// FORM DATA

const taskTitle = document.getElementById("task-title");
const taskDescription = document.getElementById("task-description");

const form = document.getElementById("form");

// TO-DO LIST
const taskList = document.getElementById("task-addlist-list");
const taskText = document.getElementById("task-addlist-text");
const taskButton = document.getElementById("task-addlist-button");
let taskButtons = document.getElementsByClassName("button-remove");

const submitButton = document.getElementById("form-submit");
const taskContainer = document.getElementById("task-container");

taskButton.addEventListener('click', (ev) => {

    if (taskText.value.trim() === '') return;

    const element = document.createElement("li");
    const output = `<span><input type="checkbox"> </span><button type="button" class="button-remove">Remover</button>`

    element.innerHTML = output;
    element.firstChild.appendChild(document.createTextNode(taskText.value));

    taskList.appendChild(element);
    updateButtons();

    taskText.value = '';
    taskText.focus();
})

submitButton.addEventListener('click', (ev) => {

    const objectives = document.querySelectorAll("#task-addlist-list li");
    const element = document.createElement("article");
    element.classList.add("aside-task-article");

    const output = `
                    <h2>${taskTitle.value}</h2>
                    <p>${taskDescription.value}</p>
                    <ul>
                    </ul>
                `
    element.innerHTML = output;
    console.log(objectives)

    objectives.forEach((el) => {
        const el_clean = el;
        el_clean.removeChild(el_clean.children[1])
        element.children[2].appendChild(el_clean);
    })


    taskContainer.appendChild(element);

    form.reset();
})
// Update removeButton lists