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
});
