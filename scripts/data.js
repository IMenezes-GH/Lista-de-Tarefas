
function getStoredNotes(){

    const notesString = localStorage.getItem("frontEndNotesStorage");
    if (!notesString) return;

    const notes = notesString.split(/\|/g).filter(Boolean);

    notes.forEach((val) => {
        const note = val.split(/\&/g);
        const title = note[0];
        const desc = note[1];
        const date = note[note.length - 1];
        const tasks = note.filter((val, index) => index >= 2 && index < note.length - 1);

        const dateFormat = new Date(date);
        const article = createArticle(title, desc, tasks, `${dateFormat.toLocaleDateString()} ${dateFormat.toLocaleTimeString()}`);
        taskContainer.appendChild(article);
    })
}

function storeNotes() {
    const notes = getNotes();
    let notesString = '';

    notes.forEach((note) => {

        const title = note.querySelector("h2>span").innerText.trim();
        const description = note.querySelector("p").innerText.trim();
        const date = note.querySelector("h2").lastChild.innerText.trim();
        notesString += title + '&' + description;

        const ulList = note.querySelector("ul");

        for (let i = 0; i < ulList.children.length; i++) {
            
            const listItem = ulList.children[i]
            const isDone = () => Boolean(listItem.firstChild.checked);
        
            notesString += '&' + (isDone() ? '[t]' : '[f]') + listItem.innerText.trim();
        }
        notesString += `&${date}|`;
    })
    notesString = notesString.substring(0, notesString.length - 1);
    localStorage.setItem("frontEndNotesStorage", notesString);
    return(notesString);
}

