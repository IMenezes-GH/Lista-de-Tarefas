
function getStoredNotes(){


    const notesString = localStorage.getItem("frontEndNotesStorage");
    if (!notesString) return;

    const notes = notesString.split(/\|/g).filter(Boolean);

    notes.forEach((val) => {
        const note = val.split(/\&/g);
        console.log(note);
        const title = note[0];
        const desc = note[1];
        const tasks = []
        console.log(val);
        for (let i = 2; i < note.length; i++){
            tasks.push(`<span><input ${note[i].charAt(1) === 't' ? 'checked ' : ''}type="checkbox"> ${note[i].substring(3)}</span>`);
        }

        const article = createArticle(title, desc, tasks);
        taskContainer.appendChild(article);
    })
}

function storeNotes() {
    const notes = getNotes();
    let notesString = '';

    notes.forEach((note) => {
        const title = note.children[0].innerText.trim();
        const description = note.children[1].innerText.trim();
        notesString += title + '&' + description;

        const ulList = note.children[2];
        for (let i = 0; i < ulList.children.length; i++) {
            const listItem = ulList.children[i]

            const isDone = () => Boolean(listItem.firstChild.firstChild.checked);
            notesString += '&' + (isDone() ? '[t]' : '[f]') + listItem.innerText.trim();
        }
        notesString += '|';
    })
    notesString = notesString.substring(0, notesString.length - 1);
    localStorage.setItem("frontEndNotesStorage", notesString);
    return(notesString);
}

