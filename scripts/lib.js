const removeTask = function(el){
    taskList.removeChild(el.parentElement)
}

function updateCheckboxes(){
    const checkboxes = document.querySelectorAll('article input[type="checkbox"]');
    checkboxes.forEach((el) => {
        el.addEventListener("change", () => storeTasks());
    })
}
