{
    let tasks = [];
    let hideDoneTasks = false;

    const toggleTaskDone = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            { ...tasks[index], done: !tasks[index].done},
            ...tasks.slice(index + 1),
        ];

        render();

    };
    const removeTask = (index) => {
        tasks = [
            ...tasks.slice(index, 0),
            ...tasks.slice(0 +1),
        ];

        render();

    };

    const hideDone = () => {
        hideDoneTasks=!hideDoneTasks;

        render();

    };

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];

        render();

    };
    const allTaskDone = () => {
        for(const task of tasks) {
            task.done = true;
            render();
        };
    };

    const bindEvents = () => {
        const doneButtons = document.querySelectorAll(".js-done")
        const removeButtons = document.querySelectorAll(".js-remove");

        doneButtons.forEach((doneButton, index) => {
            doneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };
    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `

            <li class="tasks__item ${task.done&& hideDoneTasks ? "tasks__item--hidden" : "" }">
            <button class="js-done 
            tasks__button--done">${task.done ? "✓" : ""}</button>
                <span class="${task.done ? "tasks__item--done" : ""}">
                   ${task.content}
                </span>
                <button class="js-remove tasks__button--remove">🗑️
                </button>
            </li>
            `;
        };
        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {
        const jsButtons = document.querySelector(".js-buttons");

        if(!tasks.length) {
            jsButtons.innerHTML = ``;

            return;
        }

        jsButtons.innerHTML = `
        <button class = "buttons js-hideDoneTasksButton">${hideDoneTasks ? "Pokaż ukończone": "Ukryj ukończone"}</button>
        <button class = "buttons js-markAllTasksDoneButton" ${tasks.every (({done})=> done) ? "disabled" : ""}>Ukończ wszystkie</button>
        `;
    };

    const bindButtonsEvents = () => {
        const markAllTasksDoneButton = document.querySelector(".js-markAllTasksDoneButton");
        
        if(markAllTasksDoneButton)
        markAllTasksDoneButton.addEventListener("click", allTaskDone);

        const hideDoneTasks = document.querySelector(".js-hideDoneTasksButton");

        if(hideDoneTasks)
        hideDoneTasks.addEventListener("click", hideDone);
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindEvents();
        bindButtonsEvents(); 
    };

    const clearTaskContent = () => {
        const form = document.querySelector(".js-form");
        form.reset();
    }
    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent === "") {
            clearTaskContent();
            newTaskContent.focus();
            return;
        }

        addNewTask(newTaskContent);
        clearTaskContent();
        newTaskElement.focus();
    };
    const init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();
}