export default function editTodo(todo, selectedProject) {
  const mainContainer = document.querySelector('.right-section');
  const inputsWrapper = document.createElement('div');
  const welcomeMsg = document.createElement('h2');

  mainContainer.innerHTML = '';
  inputsWrapper.className = 'right-section-form-div';
  const form = document.createElement('form');

  console.log(todo);
  if (!selectedProject) {
    welcomeMsg.innerHTML = '';
    inputsWrapper.innerHTML = '<h3>Select first a project</h3>';
  } else {
    inputsWrapper.appendChild(welcomeMsg);
    welcomeMsg.innerHTML = todo ? 'Edit todo' : 'Create todo';
    form.setAttribute('data-editing', `${!!todo}`);
    form.setAttribute('data-todo', `${null}`);
    form.setAttribute('data-project', `${selectedProject.id}`);
    form.className = 'editTodoForm';
    form.innerHTML = `<div class="mb-1">
    <label for="exampleFormControlInput1" class="form-label"
      >Title</label
    >
    <input
      type="text"
      class="form-control todo-title"
      value='${todo ? todo.title : ''}'
      id="exampleFormControlInput1"
      placeholder="name@example.com"
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
      placeholder="name@example.com"
    />
  </div>
  <div class="mb-1">
    <label for="exampleFormControlInput1" class="form-label"
      >Due date</label
    >
    <input
      type="date"
      class="form-control todo-date"
      
      id="exampleFormControlInput1"
      placeholder="name@example.com"
    />
  </div>
  <p>To-do Priority</p>
  <select
    class="form-select mb-3 todo-priority"
    aria-label="Default select example"
    value=${'2'}
    >
    <option value="1" >
      <i class="bi bi-flag-fill todo-priority"></i>
      <span>Priority 1</span>
    </option>
    <option value="2" >
      <i class="bi bi-flag-fill todo-priority"></i>
      <span>Priority 2</span>
    </option>
    <option value="3">
      <i class="bi bi-flag-fill todo-priority"></i>
      <span>Priority 3</span>
    </option>
  </select>
  <button class="btn btn-primary" type="submit">${todo ? 'Update todo' : 'Add to-do'}</button>`;
  }

  inputsWrapper.appendChild(welcomeMsg);
  inputsWrapper.appendChild(form);
  mainContainer.appendChild(inputsWrapper);
}
