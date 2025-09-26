"use strict";

const todoKeys = {
  id: 'id',
  text: 'text',
  is_completed: 'is_completed',
}

const todos=[];
const getNewTodoId = (array) => array.reduce ((maxId, todo) => Math.max (maxId, todo[todoKeys.id]),0) + 1 

const createTodo = (array, task) => {
  const newTodo = {
      [todoKeys.id]: getNewTodoId(array),
      [todoKeys.text]: task,
      [todoKeys.is_completed]: false };
  array.push (newTodo);
  return newTodo;
};

const completeTodoById = (array, todoId) => {
  const todo = array.find(todo => todo[todoKeys.id] === todoId);
  if (todo === undefined){
    console.error (`Todo with id ${todoId} not found`)
    return null;
  }
  todo[todoKeys.is_completed] = !todo[todoKeys.is_completed];
  return todo;
}; 

const deleteTodoById = ( array, todoId) => {
  const todoIndex = array.findIndex(todo =>todo[todoKeys.id] === todoId);
  if (todoIndex === -1) {
    console.error (`Todo with id ${todoId} not found`)
    return array;
  }
  array.splice(todoIndex, 1);
  return array;
};

const form = document.querySelector ('.form');
const input = document.querySelector ('.input');
const todos2 = document.querySelector ('.todos');

form.addEventListener ("submit",  )

const createTodoElement = (task) => {
const todo = document.createElement ("li")
todos2.append (todo);
todo.classList.add ('todo');
todo.innerHTML= `<div class="todo-text">${task}</div>
          <div class="todo-actions">
            <button class="button-complete button">&#10004;</button>
            <button class="button-delete button">&#10006;</button>
          </div>`;
}
const handleCreateTodo = (array, task) => {
  const create = createTodo(array, task);
  const createElement = createTodoElement(task);
  return create;
}
