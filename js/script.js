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
    const removeTask = (index) => {
        tasks.splice(index, 1);
        render();
    }
    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });
        render();
    }

    const render = () => {
        let htmlString = "";

        for (const task of tasks ) {
            htmlString += `
            <li>
            <button class="js-done">Done</button>
                ${task.content}
                <button class="js-remove">Usuń</button>
            </li>
            `;
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;

        const doneButtons = document.querySelectorAll(".js-done")
        const removeButtons = document.querySelectorAll(".js-remove");

        doneButtons.forEach((doneButton, index) => {
            doneButton.addEventListener("click", () => {
                tasks.splice(index, 1);
                render();
            })
        })

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        
        if (newTaskContent === "") {
            return;
        }
        addNewTask(newTaskContent);
    }
    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);

    };

    init();
}