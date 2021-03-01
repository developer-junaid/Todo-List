// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// Functions
function addTodo(event) {
  event.preventDefault(); // Prevent form from submitting

  // Todo Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // Create li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");

  // Add new Todo to todoDiv
  todoDiv.appendChild(newTodo);

  // ADD TO LOCAL STORAGE
  saveLocalTodos(todoInput.value);

  // Checkmark button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");

  // Add Button to todoDiv
  todoDiv.appendChild(completedButton);

  // Trash Button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");

  // Add Button to todoDiv
  todoDiv.appendChild(trashButton);

  // Attach the Big Div to actual ul - Todo List
  todoList.appendChild(todoDiv);

  // Clear todo Input value
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  // Delete Todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    // Animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    // After animation remove
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  // Check Mark
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;

      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;

      case "incomplete":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  // Check --- What do I have ?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  // Push todo
  todos.push(todo);

  // Add to localStorage
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    // Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");

    // Add new Todo to todoDiv
    todoDiv.appendChild(newTodo);

    // Checkmark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");

    // Add Button to todoDiv
    todoDiv.appendChild(completedButton);

    // Trash Button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");

    // Add Button to todoDiv
    todoDiv.appendChild(trashButton);

    // Attach the Big Div to actual ul - Todo List
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
