document.addEventListener("DOMContentLoaded", () => {
  let todos = [];
  let filterMode = "ALL"; // ALL | PENDING | DONE

  const filterBtn = document.querySelector(".filter");

  document.getElementById("addBtn").addEventListener("click", addTodo);
  document
    .querySelector(".delete-all")
    .addEventListener("click", deleteAllTodo);
  filterBtn.addEventListener("click", toggleFilter);

  function addTodo() {
    const taskInput = document.getElementById("taskInput");
    const dateInput = document.getElementById("dateInput");

    const task = taskInput.value.trim();
    const date = dateInput.value;

    if (!task || !date) {
      alert("Please enter both task and due date.");
      return;
    }

    todos.push({
      task,
      date,
      status: "Pending",
    });

    taskInput.value = "";
    dateInput.value = "";

    renderTodos();
  }

  function renderTodos() {
    const todoList = document.getElementById("todoList");
    todoList.innerHTML = "";

    let filteredTodos = todos
      .map((todo, index) => ({ ...todo, index })) // 🔑 simpan index asli
      .filter((todo) => {
        if (filterMode === "PENDING") return todo.status === "Pending";
        if (filterMode === "DONE") return todo.status === "Done";
        return true;
      });

    if (filteredTodos.length === 0) {
      todoList.innerHTML = `
        <tr>
          <td colspan="4" class="text-center text-gray-400 p-4">
            No task found
          </td>
        </tr>
      `;
      return;
    }

    filteredTodos.forEach((todo) => {
      todoList.innerHTML += `
        <tr class="border-t ${todo.status === "Done" ? "bg-green-50" : ""}">
          <td class="p-2 ${
            todo.status === "Done" ? "line-through text-gray-400" : ""
          }">
            ${todo.task}
          </td>
          <td class="p-2">${todo.date}</td>
          <td class="p-2 font-semibold">${todo.status}</td>
          <td class="p-2 space-x-2">
            <button
              onclick="toggleStatus(${todo.index})"
              class="text-blue-500 hover:underline">
              ${todo.status === "Pending" ? "Done" : "Undo"}
            </button>

            <button
              onclick="deleteTodo(${todo.index})"
              class="text-red-500 hover:underline">
              Delete
            </button>
          </td>
        </tr>
      `;
    });
  }

  window.toggleStatus = function (index) {
    todos[index].status =
      todos[index].status === "Pending" ? "Done" : "Pending";
    renderTodos();
  };

  window.deleteTodo = function (index) {
    todos.splice(index, 1);
    renderTodos();
  };

  function deleteAllTodo() {
    todos = [];
    renderTodos();
  }

  function toggleFilter() {
    if (filterMode === "ALL") {
      filterMode = "PENDING";
      filterBtn.textContent = "PENDING";
    } else if (filterMode === "PENDING") {
      filterMode = "DONE";
      filterBtn.textContent = "DONE";
    } else {
      filterMode = "ALL";
      filterBtn.textContent = "FILTER";
    }
    renderTodos();
  }
});
