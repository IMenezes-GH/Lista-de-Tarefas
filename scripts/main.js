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


// LOAD STORAGE
getStoredNotes();
updateCheckboxes();

//* EVENT FOR HANDLING ADDING LIST ITEMS BEFORE SUBMIT
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

// EVENT TO HANDLE FORM SUBMISSION
submitButton.addEventListener('click', (ev) => {

    if (taskTitle.value === undefined || taskTitle.value.trim() === '') return;

    const creationDate = new Date();

    const objectives = document.querySelectorAll("#task-addlist-list li");
    const element = document.createElement("article");
    const datetime = creationDate.toLocaleDateString() + ' ' + creationDate.toLocaleTimeString();
    element.classList.add("aside-task-article");

    const output = `
                    <h2><span>${taskTitle.value}</span><span class="font-light font-75">${datetime}<span></h2>
                    <p>${taskDescription.value}</p>
                    <ul>
                    </ul>
                `
    element.innerHTML = output;

    objectives.forEach((el) => {
        const el_clean = el;
        el_clean.removeChild(el_clean.children[1])
        element.children[2].appendChild(el_clean);
    })


    taskContainer.appendChild(element);

    form.reset();
    updateCheckboxes();
    storeNotes();
})
