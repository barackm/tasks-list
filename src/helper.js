import { v4 as uuidv4 } from 'uuid';
import render from './dom';

export function NewProject(name) {
  this.id = uuidv4();
  this.name = name;
}

const helper = (() => {
  const addProject = (name) => {
    const project = new NewProject(name);
    const allProjects = JSON.parse(localStorage.getItem('projectList')) || [];
    allProjects.unshift(project);
    localStorage.setItem('projectList', JSON.stringify(allProjects));
    render.updateUI(JSON.parse(localStorage.getItem('projectList')));
    window.location.reload();
  };

  const removeProject = (id) => {
    let allProjects = JSON.parse(localStorage.getItem('projectList')) || [];
    allProjects = allProjects.filter((project) => project.id.toString() !== id);
    localStorage.setItem('projectList', JSON.stringify(allProjects));
    render.updateUI(JSON.parse(localStorage.getItem('projectList')));
    window.location.reload();
  };

  const getProjects = () => JSON.parse(localStorage.getItem('projectList')) || [];

  return {
    addProject,
    removeProject,
    getProjects,
  };
})();

export default helper;
