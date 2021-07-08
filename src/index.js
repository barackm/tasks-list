import { v4 as uuidv4 } from 'uuid';
import render from './dom';
import helper from './helper';

const defaultProjects = [
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
  localStorage.setItem('projectList', JSON.stringify(defaultProjects));
}

if (!localStorage.getItem('defaultProject')) {
  const allProjects = JSON.parse(localStorage.getItem('projectList')) || [];
  if (allProjects.length === 0) {
    localStorage.setItem('defaultProject', null);
  } else {
    let todos = [];
    let defaultProject = allProjects[0];
    const allTodos = JSON.parse(localStorage.getItem('todoList')) || [];
    if (allTodos.length > 0) {
      todos = allTodos.filter((todo) => todo.projectId.toString() === defaultProject.id.toString());
    }

    defaultProject = { ...defaultProject, todos };
    localStorage.setItem('defaultProject', JSON.stringify(defaultProject));
  }
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
if (selectTodoBtns.length > 0) {
  selectTodoBtns.map((btn) => btn.addEventListener('click', (e) => {
    e.preventDefault();
    render.updateDefaultTodo(btn.getAttribute('data-id'));
  }));

  const deleteButtons = document.querySelectorAll('.deleteTodo');
  Array.from(deleteButtons).forEach((todoDel) => {
    todoDel.addEventListener('click', (e) => {
      e.preventDefault();
      const index = e.target.parentNode.parentNode.getElementsByTagName('a')[0].getAttribute('data-id');
      let todoList = JSON.parse(localStorage.getItem('todoList'));
      todoList = todoList.filter((n) => n.id.toString() !== index.toString());
      localStorage.setItem('todoList', JSON.stringify(todoList));
    });
  });
}
