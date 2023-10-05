class Task{

    #title;
    #description;
    #objectives;
    #creationDate;

    constructor(title, description, objectives, date = new Date()){
        
        this.#title = title;
        this.#description = description;
        this.#objectives = objectives;
        this.#creationDate = typeof date === 'string' ? new Date(date) : date;

        if (typeof objectives === 'string'){
            this.#objectives = JSON.parse(objectives);
        }

    }

    get title() {return this.#title};
    get description() {return this.#description};
    get objectives() {return this.#objectives};
    get creationDate() {return this.#creationDate};

    set title(newTitle) { this.#title = newTitle };
    set description(newDescription) { this.#description = newDescription};
    set objectives(newObjectives) { this.#objectives = newObjectives };

    /**
     * Transforms a Javascript Object into an Article HTMLElement
     * @returns HTMLElement
     */
    createTaskElement(){
        const article = document.createElement('article');
        article.classList.add('aside-task-article');
        article.innerHTML = 
        `
        <h2><span>${this.#title}</span><span class="font-light font-75">${this.#creationDate.toLocaleString()}</span></h2>
        <p>${this.#description}</p>
        <ul></ul>
        `

        this.#objectives.map((val, index) => {
            const objective = document.createElement('li');
            objective.appendChild(document.createElement('input'));
            objective.firstChild.type = 'checkbox';
            objective.firstChild.checked = Boolean(val.checked);
            objective.appendChild(document.createTextNode(val.title.trim()));

            article.querySelector("ul").appendChild(objective);
        })

        return article;

    }

    static getTasks(){
        
        const tasksArray = [];

        document.querySelectorAll("aside article.aside-task-article").forEach((el) => {
            const title = el.querySelector("h2 > span:first-child").innerText;
            const date = new Date(el.querySelector("h2").lastChild.innerText);
            const description = el.querySelector("p").innerText;
            const objectives = [];

            el.querySelectorAll("li").forEach((li) => {
                const title = li.innerText;
                const checked = li.querySelector('input[type="checkbox"]').checked;
                objectives.push({title, checked})
            });

            tasksArray.push(new Task(title, description, objectives, date))
        });

        return tasksArray;
    }
}