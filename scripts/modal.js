class Modal{

    constructor(task, modalType) {
        this.task = task.parentElement.parentElement;
        this.type = modalType;

        return this.createDialogElement()
    }

    static dialogCancel(el) {
        el.close();
    }

    createDialogElement() {

        const dialog = document.createElement("dialog");

        switch (this.type) {

            case 'deleteTask':
                dialog.innerHTML =
                    `
                <form action="/" method="dialog">
                <h1>Tem certeza que você deseja excluir essa tarefa?</h1>
                <p>Essa ação não pode ser retomada.</p>
                <div class="button-wrapper">
                <button type="button" class="button-cancel">Cancelar</button>
                <button type="button">Confirmar</button>
                <div />
                </form>
                `
                dialog.querySelector("button.button-cancel").addEventListener('click', () => {
                    dialog.close();
                })

                dialog.querySelector("button:last-of-type").addEventListener("click", () => {
                    taskContainer.removeChild(this.task);
                    dialog.close();
                    storeTasks();
                })

                return dialog;

        }

    }
}