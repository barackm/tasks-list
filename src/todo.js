function renderToDos(project) {
  console.log(project);
  const todoSection = document.querySelector('.middle-section');
  todoSection.innerHTML = '';
  const header = document.createElement('div');
  const todoContainer = document.createElement('ul');
  header.className = 'header flex-center text-center flex-column';
  if (!project) {
    header.innerHTML = '<h1>No project selected</h1><br><p>Create a new project, or select and existing one.</p>';
  } else {
    header.innerHTML = `<h1>Todos for ${project.name}</h1>`;
    todoContainer.className = 'project-todos-wrapper';
    project.todos.map((todo) => {
      const todoItem = document.createElement('li');
      todoItem.className = 'flex-between todo-item';
      todo.innerHTML = `<a href="#" class="todo-title">${todo.title}</a>
        <div class="flex-center text-center">
          <i class="bi bi-flag-fill todo-priority ${todo.priority}"></i>
          <p class="todo-due-date">${todo.date}</p>
          <button class="complete-todo flex-center">
            <i class="bi bi-check2-square"></i>
          </button>
        </div>`;
      return todoContainer.appendChild(todoItem);
    });
  }
  todoSection.appendChild(header);
  todoSection.appendChild(todoContainer);
}

export default renderToDos;