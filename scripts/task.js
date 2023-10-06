class Task {

    #title;
    #description;
    #objectives;
    #creationDate;

    constructor(title, description, objectives, date = new Date()) {

        this.#title = title;
        this.#description = description;
        this.#objectives = objectives;
        this.#creationDate = typeof date === 'string' ? new Date(date) : date;

        if (typeof objectives === 'string') {
            this.#objectives = JSON.parse(objectives);
        }

    }

    get title() {
        return this.#title
    };
    get description() {
        return this.#description
    };
    get objectives() {
        return this.#objectives
    };
    get creationDate() {
        return this.#creationDate
    };

    set title(newTitle) {
        this.#title = newTitle;
        storeTasks();
    };
    set description(newDescription) {
        this.#description = newDescription;
        storeTasks();
    };
    set objectives(newObjectives) {
        this.#objectives = newObjectives
    };

    /**
     * Transforms a Javascript Object into an Article HTMLElement
     * @returns HTMLElement
     */
    createTaskElement() {
        const article = document.createElement('article');
        article.classList.add('aside-task-article');
        article.innerHTML =
            `
        <div class="relative-wrapper"><img role="button" onclick="openDeleteDialog(this)" class="close-img" src="./assets/close.svg"></div>
        <h2><span></span><span class="font-light font-75">${this.#creationDate.toLocaleString()}</span></h2>
        <p></p>
        <ul></ul>
        `

        article.querySelector("h2 span:first-child").innerText = this.#title;
        article.querySelector("p").innerText = this.#description;

        // Criação de lista de objetivos
        this.objectives.map((val) => {

            const objective = document.createElement('li');

            objective.appendChild(document.createElement('input'));
            objective.firstChild.type = 'checkbox';
            objective.firstChild.checked = Boolean(val.checked);
            objective.firstChild.onchange = storeTasks;
            objective.appendChild(document.createTextNode(val.title.trim()));
            article.querySelector("ul").appendChild(objective);
        })


        // Adiciona hover do botão para excluir tarefas
        article.onmouseenter = () => article.querySelector("img").classList.add("opacity-60");
        article.onmouseleave = () => article.querySelector("img").classList.remove("opacity-60");


        // Eventos abaixos adiciona capacidade para editar título e descrição
        article.querySelector("h2 > span:first-child").onclick = (ev) => {
      
            ev.target.innerHTML = `<input type="text" value="${ev.target.innerText}">`            
            ev.target.onblur = (ev) => {
                ev.target.parentElement.innerText = ev.target.value;
                this.title = ev.target.value;
            }
        }

        article.querySelector("p").onclick = (ev) => {
         
            ev.target.innerHTML = `<input type="text" value="${ev.target.innerText}">`
            ev.target.onblur = (ev) => {
                ev.target.parentElement.innerText = ev.target.value;
                this.description = ev.target.value;
            }
        }


        return article;

    }

    /**
     * Returns all of the local tasks
     * @returns {Array<Task>}
     */
    static getTasks() {

        const tasksArray = [];

        document.querySelectorAll("aside article.aside-task-article").forEach((el) => {
            const title = el.querySelector("h2 > span:first-child").innerText;
            const date = new Date(el.querySelector("h2").lastChild.innerText);
            const description = el.querySelector("p").innerText;
            const objectives = [];

            el.querySelectorAll("li").forEach((li) => {
                const title = li.innerText;
                const checked = li.querySelector('input[type="checkbox"]').checked;
                objectives.push({
                    title,
                    checked
                })
            });

            tasksArray.push(new Task(title, description, objectives, date))
        });

        return tasksArray;
    }
}