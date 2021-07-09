import { v4 as uuidv4 } from 'uuid';

class Todo {
  constructor(data, projectId) {
    this.data = data;
    this.projectId = projectId;
  }

  addTodo() {
    const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
    const newTodo = {
      id: uuidv4(),
      ...this.data,
      priorityId: this.data.priorityId,
      projectId: this.projectId,
      complete: false,
    };
    if (todoList.length === 0) {
      todoList.push(newTodo);
      localStorage.setItem('todoList', JSON.stringify(todoList));
      window.location.reload();
    } else {
      todoList.push(newTodo);
      localStorage.setItem('todoList', JSON.stringify(todoList));
      window.location.reload();
    }
  }

  updateTodo(todoId) {
    const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
    const todoIndex = todoList.findIndex((t) => t.id.toString() === todoId.toString());
    const myTodo = todoList[todoIndex];
    myTodo.title = this.data.title;
    myTodo.description = this.data.description;
    myTodo.date = this.data.date;
    myTodo.priorityId = this.data.priorityId;
    myTodo.complete = this.data.complete;
    todoList[todoIndex] = myTodo;
    localStorage.setItem('todoList', JSON.stringify(todoList));
    window.location.reload();
  }

  completeTodo() {
    const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
    const todoIndex = todoList.findIndex((t) => t.id.toString() === this.data.toString());
    const myTodo = todoList[todoIndex];
    myTodo.complete = !myTodo.complete;
    todoList[todoIndex] = myTodo;
    localStorage.setItem('todoList', JSON.stringify(todoList));
    window.location.reload();
  }

  deleteTodo() {
    const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
    const newTodoList = todoList.filter((todo) => todo.id.toString() !== this.data.toString());
    localStorage.setItem('todoList', JSON.stringify(newTodoList));
    window.location.reload();
  }
}

const todoActions = (() => {
  const editTodos = (todoId, todo) => {
    const updateTodo = new Todo(todo);
    updateTodo.updateTodo(todoId);
  };

  const createTodo = (todo, projectId) => {
    const newTodo = new Todo(todo, projectId);
    newTodo.addTodo();
  };

  const completeTodo = (todoId) => {
    const newTodo = new Todo(todoId);
    newTodo.completeTodo();
  };

  const deleteTodo = (todoId) => {
    const newTodo = new Todo(todoId);
    newTodo.deleteTodo();
  };

  return {
    editTodos,
    createTodo,
    completeTodo,
    deleteTodo,
  };
})();

export default todoActions;