const removeTask = function(el){
    formTaskList.removeChild(el.parentElement)
}
function focusOut(ev){
    ev.target.innerText = ev.target.querySelector("input").value
    ev.target.innerHTML = ``
}
