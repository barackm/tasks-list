const editTodo = (todo, selectedProject) => {
  const mainContainer = document.querySelector('.right-section');
  const inputsWrapper = document.createElement('div');
  const welcomeMsg = document.createElement('h2');
  const currentDate = new Date().toISOString().slice(0, 10);
  mainContainer.innerHTML = '';
  inputsWrapper.className = 'right-section-form-div';
  const form = document.createElement('form');

  if (!selectedProject) {
    welcomeMsg.innerHTML = '';
    inputsWrapper.innerHTML = '<h3 class="edit_todo_title">Select first a project</h3>';
  } else {
    inputsWrapper.appendChild(welcomeMsg);
    welcomeMsg.innerHTML = todo ? 'Edit todo' : 'Create todo';
    form.setAttribute('data-editing', `${!!todo}`);
    form.setAttribute('data-todo', `${todo ? todo.id : null}`);
    form.setAttribute('data-project', `${selectedProject.id}`);
    form.className = 'editTodoForm';
    form.innerHTML = `<div class="mb-1">
    <label for="exampleFormControlInput1" class="form-label"
      >Title</label
    >
    <input
      type="text"
      class="form-control todo-title-input"
      value='${todo ? todo.title : ''}'
      id="exampleFormControlInput1"
      placeholder="Ex: Todo 1"
      required
    />
  </div>
  <div class="mb-1">
    <label for="exampleFormControlInput1" class="form-label"
      >Description</label
    >
    <input
      type="text"
      class="form-control todo-description"
      value='${todo ? todo.description : ''}'
      id="exampleFormControlInput1"
      placeholder="Ex: My description"
      required
    />
  </div>
  <div class="mb-1">
    <label for="exampleFormControlInput1" class="form-label"
      >Due date</label
    >
    <input
      type="date"
      class="form-control todo-date"
      value=${todo ? todo.date : currentDate}
      id="exampleFormControlInput1"
      required
    />
  </div>
  <p>To-do Priority</p>
  <select
    class="form-select mb-3 todo-priority-select"
    aria-label="Default select example"
    value=${todo ? todo.priorityId : ''}
    >
    <option value="priority1" >
      <i class="bi bi-flag-fill todo-priority"></i>
      <span>Priority 1</span>
    </option>
    <option value="priority2" >
      <i class="bi bi-flag-fill todo-priority"></i>
      <span>Priority 2</span>
    </option>
    <option value="priority3">
      <i class="bi bi-flag-fill todo-priority"></i>
      <span>Priority 3</span>
    </option>
  </select>
  <button class="btn btn-primary" type="submit">${
  todo ? 'Update todo' : 'Add to-do'
}</button>`;
  }

  inputsWrapper.appendChild(welcomeMsg);
  inputsWrapper.appendChild(form);
  mainContainer.appendChild(inputsWrapper);
};

export default editTodo;