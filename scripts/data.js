
function storeTasks() {
    const tasks = Task.getTasks();
    const tasksObject = {}

    for (let i = 0; i < tasks.length; i++){
        const task = tasks[i]
        tasksObject[i] = {order: i, title: task.title, description: task.description, datetime: task.creationDate, objectives: task.objectives};
    }   
    
    localStorage.setItem("tarefas", JSON.stringify(tasksObject))
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tarefas"));
    
    Object.keys(tasks).forEach((index) => {
        const t = tasks[index];
        const task = new Task(t.title, t.description, t.objectives, t.datetime);
        taskContainer.appendChild(task.createTaskElement());
    })

}