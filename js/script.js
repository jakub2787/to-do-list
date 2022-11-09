{
    const tasks = [
        {
            content: "Pójść na basen",
            done: false,
        },
        {
            content: "Zjeść obiad",
            done: true,
        },
    ];
    const toggleTaskDone = (index) => {
        tasks[index].done = !tasks[index].done;
        render();
    };
    const removeTask = (index) => {
        tasks.splice(index, 1);
        render();
    };
    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });
        render();
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
    }

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="tasks__item " >
            <button class="js-done tasks__button--done">${task.done ? "✓" : ""}</button>
                <span classs="${task.done ? "tasks__item--done" : ""}">${task.content}
                </span>
                <button class="js-remove tasks__button--remove">🗑️
                </button>
            </li>
            `;
        };
        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        }
        addNewTask(newTaskContent);
    };
    const init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();
}