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
    const doneTask = (index) => {
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
                doneTask(index);
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

        for (const task of tasks ) {
            htmlString += `
            <li class="list__item ${task.done ? "list__item--done": ""}" >
            <button class="js-done button__done">${task.done ? "✓" : ""}</button>
                ${task.content}
                <button class="js-remove button__remove">🗑️
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