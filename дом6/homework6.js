"use strict";
const users = [
  { name: 'Alex', age: 24, isAdmin: false },
  { name: 'Bob', age: 13, isAdmin: false },
  { name: 'John', age: 31, isAdmin: true },
  { name: 'Jane', age: 20, isAdmin: false },
]
users.push({ name: 'Ann', age: 19, isAdmin: false },
{ name: 'Jack', age: 43, isAdmin: true })

console.log(users);
//====================================================
function getUserAverageAge(array) {
  let sum = 0;
  for ( let i=0; i < array.length; i++ ){
    sum+= array[i].age;
  }
  return sum/array.length;
}
console.log(getUserAverageAge(users));
//====================================================
function getAllAdmins(array) {
  const allAdmins = [];
  for ( let i=0; i < array.length; i++ ){
    if(array[i].isAdmin===true) {
      allAdmins.push(array[i]);
    }
  }
  return allAdmins;
}
console.log(getAllAdmins(users));
//====================================================
function first(array, n) {
    const newArray = [];
    if(n==0) return [];
    if(n===undefined) return array[0];
    if( n > array.length) return console.log ("N не может быть больше длинны массива");
  for ( let i=0; i <= (n-1); i++ ){
      newArray.push(array[i]);
    }
    return newArray;
  }
console.log(first(users,8));