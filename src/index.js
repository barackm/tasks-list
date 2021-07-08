import { v4 as uuidv4 } from 'uuid';
import render from './dom';
import helper from './helper';

const defaultProject = [
  {
    id: uuidv4(),
    name: 'CapstoneProject',
  },
  {
    id: uuidv4(),
    name: 'Todo Project',
  },
  {
    id: uuidv4(),
    name: 'RestaurauntProject',
  },
];

if (!localStorage.getItem('projectList')) {
  localStorage.setItem('projectList', JSON.stringify(defaultProject));
}

render.renderAppContent(JSON.parse(localStorage.getItem('projectList')));

const editTodoForm = document.querySelector('.editTodoForm');
if (editTodoForm) {
  editTodoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (editTodoForm.getAttribute('data-editing')) {
      helper.editTodo(editTodoForm.getAttribute('data-todo'));
    } else {
      helper.createTodo({ name: 'todo' }, 2);
    }
  });
}

const formSubmit = document.querySelector('.newProjectForm');
formSubmit.addEventListener('submit', (e) => {
  e.preventDefault();
  const projectName = document.querySelector('#addProjectInput');
  helper.addProject(projectName.value);
});

let removeProjectBtns = document.querySelectorAll('.remove-project-btn');
removeProjectBtns = Array.from(removeProjectBtns);
if (removeProjectBtns.length > 0) {
  removeProjectBtns.map((btn) => btn.addEventListener('click', (e) => {
    e.preventDefault();
    helper.removeProject(btn.getAttribute('data-id'));
  }));
}

let selectProjectBtns = document.querySelectorAll('.project-name');
selectProjectBtns = Array.from(selectProjectBtns);
if (selectProjectBtns.length > 0) {
  selectProjectBtns.map((btn) => btn.addEventListener('click', (e) => {
    e.preventDefault();
    render.updateDefaultProject(btn.getAttribute('data-id'));
  }));
}

let selectTodoBtns = document.querySelectorAll('.todo-title');
selectTodoBtns = Array.from(selectTodoBtns);
console.log(selectTodoBtns);
if (selectTodoBtns.length > 0) {
  selectTodoBtns.map((btn) => btn.addEventListener('click', (e) => {
    e.preventDefault();
    render.updateDefaultTodo(btn.getAttribute('data-id'));
  }));
}
