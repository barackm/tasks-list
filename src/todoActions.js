class Todo {
  constructor(data, projectId) {
    this.data = data;
    this.projectId = projectId;
  }

  addTodo() {
    const todoList = localStorage.getItem('todoList');
    const newTodo = { ...this.data, projectId: this.projectId };

    if (todoList) {
      const allTodos = JSON.parse(todoList).unshift(newTodo);
      localStorage.setItem('todoList', JSON.stringify(allTodos));
    } else {
      const allTodos = [];
      allTodos.push({ title: 'Smth' });
      localStorage.setItem('todoList', JSON.stringify(allTodos));
    }
  }
}

const todoActions = (function () {
  const editTodos = (id) => {
    console.log('editing todo', id);
  };

  const createTodo = (todo, projectId) => {
    console.log('todoActions');
    const newTodo = new Todo(todo, projectId);
    newTodo.addTodo();
  };

  return {
    editTodos,
    createTodo,
  };
}());

export default todoActions;