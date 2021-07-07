import { v4 as uuidv4 } from 'uuid';
import render from './dom';

function NewProject(name) {
  this.id = uuidv4();
  this.name = name;
}

const helper = (function () {
  const addProject = (name) => {
    const project = new NewProject(name);
    const allProjects = JSON.parse(localStorage.getItem('projectList'));
    allProjects.unshift(project);
    localStorage.setItem('projectList', JSON.stringify(allProjects));
    render.updateUI(JSON.parse(localStorage.getItem('projectList')));
    console.log(JSON.parse(localStorage.getItem('projectList')));
  };
  return { addProject };
}());

export default helper;