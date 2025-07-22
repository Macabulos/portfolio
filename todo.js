document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('taskInput');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');

  let todos = JSON.parse(localStorage.getItem('todos')) || [];

  function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  function renderTodos() {
    taskList.innerHTML = '';
    todos.forEach((todo, index) => {
      const taskItem = document.createElement('li');
      taskItem.classList.add('task');
      if (todo.completed) {
        taskItem.classList.add('completed');
      }
      taskItem.innerHTML = `
        <span contenteditable="true">${todo.text}</span>
        <button class="delete-btn">Delete</button>
      `;
      taskList.appendChild(taskItem);

      const deleteBtn = taskItem.querySelector('.delete-btn');
      deleteBtn.addEventListener('click', () => {
        deleteTodo(index);
      });

      const span = taskItem.querySelector('span');
      span.addEventListener('blur', () => {
        updateTodoText(index, span.innerText);
      });
    });
  }

  function addTask() {
    const taskText = taskInput.value;
    if (taskText === '') return;

    todos.push({ text: taskText, completed: false });
    saveTodos();
    renderTodos();
    taskInput.value = '';
  }

  function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
  }

  function updateTodoText(index, newText) {
    todos[index].text = newText;
    saveTodos();
  }

  addTaskBtn.addEventListener('click', addTask);

  renderTodos();
});
