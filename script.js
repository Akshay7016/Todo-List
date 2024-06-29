document.addEventListener("DOMContentLoaded", () => {
    const todoForm = document.querySelector(".todo-form");
    const todoInput = document.querySelector(".todo-input");
    const todoSubmit = document.querySelector(".todo-submit");
    const todoList = document.querySelector(".todo-list");
    const errorMessage = document.querySelector(".error-message")

    let editMode = false;
    let editItem = null;

    todoInput.addEventListener("input", () => {
        errorMessage.style.display = "none"
    })

    todoForm.addEventListener("submit", (event) => {
        event.preventDefault();

        let todoText = todoInput.value?.trim();

        if (todoText) {
            if (editMode) {
                editItem.firstChild.textContent = todoText;
                todoSubmit.innerText = "Add Todo";
                editMode = false;
                editItem = null;
            } else {
                addTodoItem(todoText);
            }

            // After adding clear input field
            todoInput.value = "";
        } else {
            errorMessage.style.display = "block";
        }
    })

    function addTodoItem(todoText) {
        const todoItem = document.createElement("li");
        const editButton = document.createElement("button");
        const removeButton = document.createElement("button");

        todoItem.innerHTML = `<span>${todoText}</span>`;
        editButton.innerText = "✏️";
        removeButton.innerText = "❌";

        // Append edit and remove button to todoItem
        todoItem.appendChild(editButton);
        todoItem.appendChild(removeButton);

        // append todoItem to todoList
        todoList.appendChild(todoItem)
    };

    // Event delegation - preventing multiple event listeners in website
    todoList.addEventListener("click", (event) => {
        const { target } = event;

        if (target.tagName === "BUTTON") {
            // TodoItem contains span, edit button, remove button
            const todoItem = target.parentNode;

            if (target.innerText === "✏️") {
                editMode = true;
                editItem = todoItem;

                todoSubmit.innerText = "Edit Todo";
                todoInput.value = todoItem.firstChild.textContent;
                todoInput.focus();

            } else if (target.innerText === "❌") {
                todoItem.remove();
            }
        }
    })
})