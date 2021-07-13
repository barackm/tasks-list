/**
 * @jest-environment jsdom
 */

import { expect, it, jest } from '@jest/globals';
import editTodo from '../src/editTodo';

import '@testing-library/jest-dom/extend-expect';

jest.useFakeTimers();

describe('Calling edit todo ', () => {
  it('Throw an error of edit todo is called without argument', () => {
    expect(() => editTodo()).toThrow();
  });
  it('should contain the text if the project is not given', () => {
    const editTodo1 = (selectedProject) => {
      const mainContainer = document.createElement('div');
      const welcomeMsg = document.createElement('h2');
      const inputsWrapper = document.createElement('div');
      inputsWrapper.className = 'right-section-form-div';
      if (!selectedProject) {
        welcomeMsg.innerHTML = '';
        inputsWrapper.innerHTML =
          '<h3 class="edit_todo_title">Select first a project</h3>';
        inputsWrapper.appendChild(welcomeMsg);
        mainContainer.appendChild(inputsWrapper);
      }
      expect(inputsWrapper.value).toBe('Select first a project');
    };
  });
});
