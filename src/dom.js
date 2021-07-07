import renderProjects from './projects';
import renderToDos from './todo';

let defaultProject = null;

const render = (function () {
  const renderAppContent = (projects) => {
    renderProjects(projects);
    renderToDos(defaultProject);
  };
  const updateUI = (projects) => {
    render.renderAppContent(projects);
  };

  const updateDefaultProject = (id) => {
    const projects = JSON.parse(localStorage.getItem('projectList'));
    const project = projects.find((f) => f.id.toString() === id);
    defaultProject = project;
    const todos = [];
    defaultProject = { ...defaultProject, todos };
    renderToDos(defaultProject);
  };
  return { renderAppContent, updateUI, updateDefaultProject };
}());

export default render;