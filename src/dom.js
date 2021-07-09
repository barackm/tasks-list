import editTodo from './editTodo';
import renderProjects from './projects';
import renderToDos from './todo';
import todoActions from './todoActions';

const storedDefaultProject = JSON.parse(localStorage.getItem('defaultProject'));
let defaultProject = storedDefaultProject || null;
let defaultTodo = null;

const render = (() => {
  const renderAppContent = (projects) => {
    renderProjects(projects);
    renderToDos(defaultProject);
    editTodo(defaultTodo, defaultProject);
    let completeTodoBtns = document.querySelectorAll('.complete-todo');

    const newTodoBtn = document.querySelector('.new-todo-btn');
    if (newTodoBtn) {
      newTodoBtn.addEventListener('click', () => {
        defaultTodo = null;
        render.updateDefaultProject(defaultProject.id || null);
      });
    }
    const editTodoForm = document.querySelector('.editTodoForm');

    if (editTodoForm) {
      editTodoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.querySelector('.todo-title-input').value;
        const description = document.querySelector('.todo-description').value;
        const date = document.querySelector('.todo-date').value;
        const priorityId = document.querySelector('.todo-priority-select').value;
        const projectId = editTodoForm.getAttribute('data-project');
        const todoId = editTodoForm.getAttribute('data-todo');
        if (editTodoForm.getAttribute('data-editing') === 'true') {
          todoActions.editTodos(todoId, {
            title, description, date, priorityId, id: todoId,
          });
          renderToDos(defaultProject);
          editTodo(defaultTodo, defaultProject);
          render.updateDefaultProject(defaultProject.id || null);
        } else {
          todoActions.createTodo({
            title, description, date, priorityId,
          }, projectId);
          renderToDos(defaultProject);
          render.updateDefaultProject(defaultProject.id || null);
        }
      });
    }

    completeTodoBtns = Array.from(completeTodoBtns);
    if (completeTodoBtns.length > 0) {
      completeTodoBtns.map((btn) => btn.addEventListener('click', (e) => {
        e.preventDefault();
        todoActions.completeTodo(btn.getAttribute('data-id'));
        render.updateDefaultProject(defaultProject.id);
      }));
    }

    let deleteTodoBtns = document.querySelectorAll('.delete-todo');
    deleteTodoBtns = Array.from(deleteTodoBtns);
    if (deleteTodoBtns.length > 0) {
      Array.from(deleteTodoBtns).forEach((todoDel) => {
        todoDel.addEventListener('click', (e) => {
          e.preventDefault();
          const index = todoDel.getAttribute('data-id');
          let todoList = JSON.parse(localStorage.getItem('todoList')) || [];
          todoList = todoList.filter((n) => n.id.toString() !== index.toString());
          localStorage.setItem('todoList', JSON.stringify(todoList));
          return render.updateDefaultProject(defaultProject.id || null);
        });
      });
    }
  };

  const updateUI = (projects) => {
    render.renderAppContent(projects);
  };

  const updateDefaultProject = (id) => {
    const projects = JSON.parse(localStorage.getItem('projectList'));
    const project = projects.find((f) => f.id.toString() === id);
    let myDefaultProject = project;
    const allTodos = JSON.parse(localStorage.getItem('todoList')) || [];
    let todos = [];
    if (allTodos.length > 0) {
      todos = allTodos.filter((todo) => todo.projectId.toString() === project.id.toString());
    }
    myDefaultProject = { ...myDefaultProject, todos };
    localStorage.setItem('defaultProject', JSON.stringify(myDefaultProject));
    const previousProject = defaultProject;
    renderToDos(myDefaultProject);
    if (previousProject.id === project.id) {
      editTodo(defaultTodo, myDefaultProject);
    } else {
      editTodo(null, myDefaultProject);
    }
    defaultProject = myDefaultProject;

    let selectTodoBtns = document.querySelectorAll('.todo-title');

    selectTodoBtns = Array.from(selectTodoBtns);
    if (selectTodoBtns.length > 0) {
      selectTodoBtns.map((btn) => btn.addEventListener('click', (e) => {
        e.preventDefault();
        render.updateDefaultTodo(btn.getAttribute('data-id'));
      }));
    }

    let completeTodoBtns = document.querySelectorAll('.complete-todo');

    completeTodoBtns = Array.from(completeTodoBtns);
    if (completeTodoBtns.length > 0) {
      completeTodoBtns.map((btn) => btn.addEventListener('click', (e) => {
        e.preventDefault();
        todoActions.completeTodo(btn.getAttribute('data-id'));
        renderProjects(projects);
        updateDefaultProject(id);
      }));
    }

    let deleteTodoBtns = document.querySelectorAll('.delete-todo');
    deleteTodoBtns = Array.from(deleteTodoBtns);
    if (deleteTodoBtns.length > 0) {
      Array.from(deleteTodoBtns).forEach((todoDel) => {
        todoDel.addEventListener('click', (e) => {
          e.preventDefault();
          const index = todoDel.getAttribute('data-id');
          let todoList = JSON.parse(localStorage.getItem('todoList')) || [];
          todoList = todoList.filter((n) => n.id.toString() !== index.toString());
          localStorage.setItem('todoList', JSON.stringify(todoList));
          return render.updateDefaultProject(defaultProject.id || null);
        });
      });
    }

    const editTodoForm = document.querySelector('.editTodoForm');
    const newTodoBtn = document.querySelector('.new-todo-btn');
    if (newTodoBtn) {
      newTodoBtn.addEventListener('click', () => {
        defaultTodo = null;
        updateDefaultProject(id);
      });
    }

    if (editTodoForm) {
      editTodoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.querySelector('.todo-title-input').value;
        const description = document.querySelector('.todo-description').value;
        const date = document.querySelector('.todo-date').value;
        const priorityId = document.querySelector('.todo-priority-select').value;
        const projectId = editTodoForm.getAttribute('data-project');
        const todoId = editTodoForm.getAttribute('data-todo');
        if (editTodoForm.getAttribute('data-editing') === 'true') {
          todoActions.editTodos(todoId, {
            title, description, date, priorityId, id: todoId,
          });
          renderToDos(defaultProject);
          editTodo(defaultTodo, defaultProject);
          updateDefaultProject(defaultProject.id || null);
        } else {
          todoActions.createTodo({
            title, description, date, priorityId,
          }, projectId);
          renderToDos(defaultProject);
          updateDefaultProject(defaultProject.id || null);
        }
      });
    }
  };

  function updateDefaultTodo(id) {
    const allTodos = JSON.parse(localStorage.getItem('todoList')) || [];
    const todo = allTodos.find((t) => t.id.toString() === id.toString());
    defaultTodo = todo;
    editTodo(defaultTodo, defaultProject);
    updateDefaultProject(defaultProject.id);
  }

  return {
    renderAppContent, updateUI, updateDefaultProject, updateDefaultTodo,
  };
})();

export default render;