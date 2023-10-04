function removeTask(ev){
    const element = ev.target.parentElement;
    taskList.removeChild(element)
}
const updateButtons = () => {
    taskButtons = document.querySelectorAll(".button-remove");
    taskButtons.forEach((el) => el.addEventListener("click", removeTask))
    return taskButtons;
}