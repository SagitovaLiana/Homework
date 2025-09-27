import { todoKeys } from "./constans.js";

const getNewTodoId = (array) => array.reduce ((maxId, todo) => Math.max (maxId, todo[todoKeys.id]),0) + 1 

export const createTodo = (array, task) => {
  const newTodo = {
      [todoKeys.id]: getNewTodoId(array),
      [todoKeys.text]: task,
      [todoKeys.is_completed]: false };
  array.push (newTodo);
  return newTodo;
};

export const completeTodoById = (array, todoId) => {
  const todo = array.find(todo => todo[todoKeys.id] === todoId);
  if (todo === undefined){
    console.error (`Todo with id ${todoId} not found`)
    return null;
  }
  todo[todoKeys.is_completed] = !todo[todoKeys.is_completed];
  return todo;
}; 

export const deleteTodoById = ( array, todoId) => {
  const todoIndex = array.findIndex(todo =>todo[todoKeys.id] === todoId);
  if (todoIndex === -1) {
    console.error (`Todo with id ${todoId} not found`)
    return array;
  }
  array.splice(todoIndex, 1);
  return array;
};