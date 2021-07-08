import { v4 as uuidv4 } from 'uuid';

class Todo {
  constructor(data, projectId) {
    this.data = data;
    this.projectId = projectId;
  }

  addTodo() {
    const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
    const newTodo = { id: uuidv4(), ...this.data, projectId: this.projectId };

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
    todoList[todoIndex] = myTodo;
    localStorage.setItem('todoList', JSON.stringify(todoList));
    window.location.reload();
  }
}

const todoActions = (function () {
  const editTodos = (todoId, todo) => {
    const updateTodo = new Todo(todo);
    updateTodo.updateTodo(todoId);
  };

  const createTodo = (todo, projectId) => {
    const newTodo = new Todo(todo, projectId);
    newTodo.addTodo();
  };

  return {
    editTodos,
    createTodo,
  };
}());

export default todoActions;