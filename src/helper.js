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
    window.location.reload();
  };

  const removeProject = (id) => {
    let allProjects = JSON.parse(localStorage.getItem('projectList'));
    allProjects = allProjects.filter((project) => project.id.toString() !== id);
    localStorage.setItem('projectList', JSON.stringify(allProjects));
    render.updateUI(JSON.parse(localStorage.getItem('projectList')));
    window.location.reload();
  };
  return { addProject, removeProject };
}());

export default helper;