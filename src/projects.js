export default function renderProjects(projects) {
  const projectSection = document.querySelector('.left-section');
  projectSection.innerHTML = '';
  const header = document.createElement('div');
  header.className = 'header flex-center flex-column';
  header.innerHTML =
    "<h1>All projects</h1><form class='w-100 newProjectForm'><input type='text' class='form-control' id='addProjectInput' placeholder='name@example.com' required/><button class='mt-2 btn bnt-primary' type='submit'>Add new project</button></form>";
  const projectList = document.createElement('ul');
  projectList.className = 'all-project-list flex-center flex-column';
  projects.map((project) => {
    const projectItem = document.createElement('li');
    projectItem.className = 'flex-between w-100';
    projectItem.innerHTML = `<a href="" class="project-name"> <h5>${project.name}</h5></a>
  <div class="flex-center project-btn-wrapper">
    <a class="project-b flex-center trash-btn remove-project-btn" data-id='${project.id}'href="#">
      <i class="bi bi-trash-fill"></i>
    </a>
    <a class="project-b flex-center add-todo-btn" href="#">
      <i class="bi bi-plus-lg"></i>
    </a>
  </div>`;
    return projectList.appendChild(projectItem);
  });
  projectSection.appendChild(header);
  projectSection.appendChild(projectList);
}
