// Temporary storage for todo items
let todos = [];

// Function to add a new todo item
function addTodo() {
  const todoInput = document.getElementById("todo-input").value;
  const todoDate = document.getElementById("todo-date").value;

  if (todoInput === "" || todoDate === "") {
    alert("Please enter both a todo item and a due date.");
  } else {
    const newTodo = {
      todo: todoInput,
      date: todoDate,
    };

    todos.push(newTodo);

    document.getElementById("todo-input").value = "";
    document.getElementById("todo-date").value = "";

    // Re-render the todo list
    renderTodos();
  }
}

// Function to render the todo list
function renderTodos() {
  const todoList = document.getElementById("todo-list");

  // Clear existing list
  todoList.innerHTML = "";

  // Render each todo item
  todos.forEach((todo, _) => {
    todoList.innerHTML += `
        <li>
            <p class="text-2xl">${todo.todo} <span class="text-sm text-gray-500">(${todo.date})</span></p>
            <hr />
        </li>`;
  });
}

// Function to delete all todo items
function deleteAllTodo() {
  todos = [];

  // Re-render the todo list
  renderTodos();
}

// Function to filter todo items (not implemented yet)
function filterTodo() {}
