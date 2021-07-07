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
