const todoForm = document.querySelector("#todoForm");
const todoInput = document.querySelector("#todoInput");
const addTodo = document.querySelector("#addTodo");
const todoList = document.querySelector("#todoList");

function addTodoItem(todoValue) {
  const todoItem = document.createElement("li");
  todoItem.classList.add("list-group-item");

  const todoContent = document.createElement("div");
  todoContent.classList.add("todo-content");
  todoItem.appendChild(todoContent);

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("todo-check");
  checkbox.id = "todoCheck";
  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      todoContent.classList.add("checked");
    } else {
      todoContent.classList.remove("checked");
    }
  });
  todoContent.appendChild(checkbox);

  const todoText = document.createElement("span");
  todoText.textContent = todoValue;
  todoText.classList.add("todo-text");
  todoContent.appendChild(todoText);

  const listActions = document.createElement("div");
  listActions.classList.add("list-actions");

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");

  const editButton = document.createElement("button");
  editButton.classList.add("edit-button");

  const editIcon = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  editIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  editIcon.setAttribute("viewBox", "0 0 512 512");
  editIcon.setAttribute("fill", "currentColor");
  editIcon.classList.add("svg-icon");
  const editIconPath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  editIconPath.setAttribute(
    "d",
    "M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"
  );
  editIcon.appendChild(editIconPath);
  editButton.appendChild(editIcon);
  listActions.appendChild(editButton);

  const deleteIcon = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  deleteIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  deleteIcon.setAttribute("viewBox", "0 0 448 512");
  deleteIcon.setAttribute("fill", "currentColor");
  deleteIcon.classList.add("svg-icon");
  const deleteIconPath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  deleteIconPath.setAttribute(
    "d",
    "M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
  );
  deleteIcon.appendChild(deleteIconPath);
  deleteButton.appendChild(deleteIcon);
  listActions.appendChild(deleteButton);

  todoItem.appendChild(listActions);
  todoList.appendChild(todoItem);
}

function editTodoItem(e) {
  const item = e.target.closest("li");
  const todoContent = item.querySelector(".todo-content");
  const todoText = todoContent.querySelector(".todo-text");
  const todoInput = document.createElement("input");
  todoInput.type = "text";
  todoInput.classList.add("change-todo");
  todoInput.value = todoText.textContent;
  todoContent.replaceChild(todoInput, todoText);
  todoInput.focus();
  todoInput.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      const newTodoText = document.createElement("span");
      newTodoText.textContent = todoInput.value;
      newTodoText.classList.add("todo-text");
      todoContent.replaceChild(newTodoText, todoInput);
    }
  });
}

function deleteTodoItem(e) {
  const item = e.target.closest("li");
  item.remove();
}

addTodo.addEventListener("click", function (e) {
  e.preventDefault();
  const todoValue = todoInput.value;
  if (todoValue) {
    addTodoItem(todoValue);
    todoInput.value = "";
  } else {
    alert("Please enter a todo item");
  }
});

todoList.addEventListener("click", function (e) {
  if (e.target.closest(".edit-button")) {
    editTodoItem(e);
  }

  if (e.target.closest(".delete-button")) {
    deleteTodoItem(e);
  }
});

function saveTodoList() {
  const todoItems = Array.from(todoList.children).map((item) => {
    const todoText = item.querySelector(".todo-text").textContent;
    return {
      text: todoText,
      checked: item.querySelector(".todo-check").checked,
    };
  });
  sessionStorage.setItem("todoList", JSON.stringify(todoItems));
}

function loadTodoList() {
  const savedTodoList = sessionStorage.getItem("todoList");
  if (savedTodoList) {
    const todoItems = JSON.parse(savedTodoList);
    todoItems.forEach((item) => {
      addTodoItem(item.text);
      const lastTodoItem = todoList.lastElementChild;
      lastTodoItem.querySelector(".todo-check").checked = item.checked;
      if (item.checked) {
        lastTodoItem.querySelector(".todo-content").classList.add("checked");
      }
    });
  }
}

addTodo.addEventListener("click", function (e) {
  saveTodoList();
});

todoList.addEventListener("click", function (e) {
  saveTodoList();
});

window.addEventListener("load", function () {
  loadTodoList();
});
