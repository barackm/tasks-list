import moment from 'moment';

function renderToDos(project) {
  const todoSection = document.querySelector('.middle-section');
  todoSection.innerHTML = '';
  const header = document.createElement('div');
  const todoContainer = document.createElement('ul');
  header.className = 'header flex-center text-center flex-column';
  if (!project) {
    header.innerHTML = '<h1>No project selected</h1><br><p>Create a new project, or select and existing one.</p>';
  } else {
    header.innerHTML = `<h1>Todos for ${project.name}</h1> <button class="new-todo-btn flex-center">
    <i class="bi bi-plus-lg"></i>
  </button> `;
    todoContainer.className = 'project-todos-wrapper';
    project.todos.map((todo) => {
      const todoItem = document.createElement('li');
      todoItem.className = 'flex-between todo-item';
      todoItem.innerHTML = `<a href="#" class="todo-title" data-id='${todo.id}'>${todo.title}</a>
        <div class="flex-center text-center">
          <i class="bi bi-flag-fill todo-priority ${todo.priorityId}"></i>
          <p class="todo-due-date">${moment(todo.date).subtract(1, 'days').calendar()}</p>
          <button data-id=${todo.id} class="complete-todo flex-center ${todo.complete}">
            <i class="bi bi-check2-square"></i>
          </button>

          <button data-id=${todo.id} class="delete-todo flex-center">
          <i class="bi bi-trash-fill"></i>
          </button>
          
        </div>`;
      return todoContainer.appendChild(todoItem);
    });
  }
  todoSection.appendChild(header);
  todoSection.appendChild(todoContainer);
}

export default renderToDos;