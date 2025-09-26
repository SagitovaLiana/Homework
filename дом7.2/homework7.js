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

const formElement = document.querySelector ('.form');
const inputElement = document.querySelector ('.input');
const todosElement = document.querySelector ('.todos');


const createTodoElement = (todo) => {
const todoElement = document.createElement ("li");
todoElement.classList.add ('todo');
todoElement.dataset.id = todo[todoKeys.id]; 
todoElement.innerHTML= `<div class="todo-text">${todo[todoKeys.text]}</div>
  <div class="todo-actions">
    <button class="button-complete button">&#10004;</button>
    <button class="button-delete button">&#10006;</button>
  </div>`;
  return todoElement;
}
const handleCreateTodo = (array, task) => {
  const todo = createTodo(array, task);
  const todoElement = createTodoElement(todo);
  todosElement.prepend(todoElement);
}

formElement.addEventListener ("submit", (event) => {
  event.preventDefault();
  const text = inputElement.value.trim()
  if (text == "" ){
    return;
  }
  handleCreateTodo(todos, text);
  inputElement.value = "";
} );

todosElement.addEventListener( 'click', ({target}) =>{
  const todo = target.closest (".todo");
  if (todo == ""){
    return;
    //тоже самое  if(!todo) return
  }
  const todoID= Number(todo.dataset.id);
  if (target.matches(".button-complete")){
    completeTodoById (todos, todoID);
    todo.classList.toggle("completed");
  }
    if (target.matches(".button-delete")){
    deleteTodoById (todos, todoID);
    todo.remove();
  }
})