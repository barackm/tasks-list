import editTodo from './editTodo';
import renderProjects from './projects';
import renderToDos from './todo';
import todoActions from './todoActions';

let defaultProject = null;

const render = (function () {
  const renderAppContent = (projects) => {
    renderProjects(projects);
    renderToDos(defaultProject);
    editTodo({ title: 'todo1', description: 'description' }, defaultProject);
  };
  const updateUI = (projects) => {
    render.renderAppContent(projects);
  };

  const updateDefaultProject = (id) => {
    console.log('dom.js');
    const projects = JSON.parse(localStorage.getItem('projectList'));
    const project = projects.find((f) => f.id.toString() === id);
    defaultProject = project;
    const allTodos = JSON.parse(localStorage.getItem('todoList')) || [];
    let todos = [];
    if (allTodos.length > 0) {
      todos = allTodos.filter((todo) => todo.projectId.toString() === project.id.toString());
    }
    defaultProject = { ...defaultProject, todos };
    renderToDos(defaultProject);
    editTodo(null, defaultProject);

    const editTodoForm = document.querySelector('.editTodoForm');
    if (editTodoForm) {
      editTodoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.querySelector('.todo-title').value;
        const description = document.querySelector('.todo-description').value;
        const date = document.querySelector('.todo-date').value;
        const priorityId = document.querySelector('.todo-priority').value;
        const projectId = editTodoForm.getAttribute('data-project');
        const todoId = editTodoForm.getAttribute('data-todo');

        if (editTodoForm.getAttribute('data-editing') === 'true') {
          todoActions.editTodos(todoId, {
            title, description, date, priorityId,
          });
          renderToDos(defaultProject);
          editTodo(null, defaultProject);
        } else {
          todoActions.createTodo({
            title, description, date, priorityId,
          }, projectId);
          renderToDos(defaultProject);
          editTodo(null, defaultProject);
        }
      });
    }
  };
  return { renderAppContent, updateUI, updateDefaultProject };
}());

export default render;