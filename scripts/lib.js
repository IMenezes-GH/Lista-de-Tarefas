function removeTask(ev){
    const element = ev.target.parentElement;
    taskList.removeChild(element)
}
function updateButtons(){
    taskButtons = document.querySelectorAll(".button-remove");
    taskButtons.forEach((el) => el.addEventListener("click", removeTask))
    return taskButtons;
}

function updateCheckboxes(){
    const checkboxes = document.querySelectorAll('article input[type="checkbox"]');
    checkboxes.forEach((el) => {
        el.addEventListener("change", () => storeNotes());
    })
}

function getNotes() {
    const notes = document.querySelectorAll("article.aside-task-article");
    return notes;
}

function createArticle(title, description, taskListArray, date) {
    const article = document.createElement("article");
    article.classList.add("aside-task-article");

    const output =
        `
    <h2><span>${title}</span><span class="font-light font-75">${date}<span></h2>
    <p>${description}</p>
    <ul>
    </ul>
    `

    article.innerHTML = output;

    for (let i = 0; i < taskListArray.length; i++){
        const liItem = document.createElement("li");
        liItem.innerHTML = taskListArray[i];
        article.children[2].appendChild(liItem);
    }

    return article;
}