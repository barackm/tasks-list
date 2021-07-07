import renderProjects from './projects';

const render = (function () {
  const renderAppContent = (projects) => {
    renderProjects(projects);
  };
  const updateUI = (projects) => {
    render.renderAppContent(projects);
  };
  return { renderAppContent, updateUI };
}());

export default render;