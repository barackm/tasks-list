/**
 * @jest-environment jsdom
 */

import todoActions, { Todo } from '../src/todoActions';

describe('methods', () => {
  todoActions.createTodo = (title, description, priority, date) => {
    if (!title || !description || !priority || !date) {
      throw Error;
    }
    const todo = new Todo({
      id: 1, title, description, priority, date, complete: false,
    }, 1);
    const todos = JSON.parse(localStorage.getItem('todoList')) || [];
    todos.push({
      id: todo.data.id,
      title: todo.data.title,
      description: todo.data.description,
      priority: todo.data.priority,
      date: todo.data.date,
      complete: false,
    });
    localStorage.setItem('todoList', JSON.stringify(todos));
  };
  todoActions.removeTodo = (todoId) => {
    if (!todoId) {
      throw Error;
    }
    const todos = JSON.parse(localStorage.getItem('todoList')) || [];
    const myTodos = todos.filter((todo) => todo.id !== todoId);
    localStorage.setItem('todoList', JSON.stringify(myTodos));
  };

  todoActions.editTodos = (todoId, todo) => {
    if (!todoId || !todo || !todo.title || !todo.priority || !todo.date) {
      throw Error;
    }
    const todos = JSON.parse(localStorage.getItem('todoList')) || [];
    const myTodo = todos.find((todo) => todo.id === todoId);
    if (!myTodo) {
      throw Error;
    }
    myTodo.title = todo.title;
    myTodo.description = todo.description;
    myTodo.priority = todo.priority;
    myTodo.date = todo.date;
    myTodo.complete = todo.complete;
    todos[myTodo.id] = myTodo;
    localStorage.setItem('todoList', JSON.stringify(todos));
  };

  todoActions.completeTodo = (todoId) => {
    if (!todoId) {
      throw Error;
    }
    const todos = JSON.parse(localStorage.getItem('todoList')) || [];
    const myTodo = todos.find((todo) => todo.id === todoId);
    if (!myTodo) {
      throw Error;
    }
    myTodo.complete = true;
    todos[myTodo.id] = myTodo;
    localStorage.setItem('todoList', JSON.stringify(todos));
  };

  it('should throw an error if title is not given', () => {
    expect(() => todoActions.createTodo('description', 'priority1', '12-12-2020')).toThrow();
  });
  it('should throw an error if description is not given', () => {
    expect(() => todoActions.createTodo('title', 'priority1', '12-12-2020')).toThrow();
  });
  it('should throw an error if date is not given', () => {
    expect(() => todoActions.createTodo('title', 'priority1', 'description')).toThrow();
  });
  it('should throw an error if priority is not given', () => {
    expect(() => todoActions.createTodo('title', 'description', '12-12-2020')).toThrow();
  });
  it('should create a new todo if all data is passed', () => {
    todoActions.createTodo('title', 'description', 'priority1', '12-12-2020');
    const allTodos = JSON.parse(localStorage.getItem('todoList')) || [];
    expect(allTodos.length).toBe(1);
  });

  it('should throw an error if id is not given', () => {
    expect(() => todoActions.editTodos('description', 'priority1', '12-12-2020')).toThrow();
  });
  it('should throw an error if description is not given', () => {
    expect(() => todoActions.editTodos('title', 'priority1', '12-12-2020')).toThrow();
  });
  it('should throw an error if date is not given', () => {
    expect(() => todoActions.editTodos('title', 'priority1', 'description')).toThrow();
  });
  it('should throw an error if priority is not given', () => {
    expect(() => todoActions.editTodos('title', 'description', '12-12-2020')).toThrow();
  });
  it('should throw an error if invalid id is given', () => {
    expect(() => todoActions.editTodos(20, {
      title: 'title', description: 'description', priority: 'priority1', date: '12-12-2020', complete: false,
    })).toThrow();
  });
  it('should update the edited todo', () => {
    todoActions.editTodos(1, {
      title: 'title', description: 'new_description', priority: 'priority1', date: '12-12-2020', complete: false,
    });
    const allTodos = JSON.parse(localStorage.getItem('todoList')) || [];
    expect(allTodos[0].description).toBe('new_description');
  });
  it('should not mark the todo as complete', () => {
    expect(() => todoActions.completeTodo()).toThrow();
  });
  it('should not mark the todo as complete if we pass invalid id', () => {
    expect(() => todoActions.completeTodo(10)).toThrow();
  });
  it('should mark the todo as complete', () => {
    todoActions.completeTodo(1);
    const allTodos = JSON.parse(localStorage.getItem('todoList')) || [];
    expect(allTodos[0].complete).toBe(true);
  });
  it('should not remove the todo without a proper id passed', () => {
    expect(() => todoActions.removeTodo()).toThrow();
  });
  it('should not remove the todo without a proper id passed', () => {
    todoActions.removeTodo(1);
    const allTodos = JSON.parse(localStorage.getItem('todoList')) || [];
    expect(allTodos.length).toBe(0);
  });
});
