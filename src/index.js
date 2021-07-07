import { v4 as uuidv4 } from 'uuid';
import render from './dom';
import helper from './helper';

const defaultProject = [{
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
}];

if (!localStorage.getItem('projectList')) {
  localStorage.setItem('projectList', JSON.stringify(defaultProject));
}
console.log(JSON.parse(localStorage.getItem('projectList')));
render.renderAppContent(JSON.parse(localStorage.getItem('projectList')));

const formSubmit = document.querySelector('.newProjectForm');
formSubmit.addEventListener('submit', (e) => {
  e.preventDefault();
  const projectName = document.querySelector('#addProjectInput');
  helper.addProject(projectName.value);
});