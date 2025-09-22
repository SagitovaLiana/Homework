const person = {
  name: "Liana",
  surname: "Sagitova",
  age: 25,
}
console.log(person);
//==============================================
function isEmpty (object){
  for (const key in object){
    return false
    } 
    return true
  }
  console.log(isEmpty(person));
  //==============================================
const task = {
  title: "homework" ,
  description: "object and method" ,
  isCompleted: false ,
}
function cleanAndModify(object, modifications) {
  const object2 = {...object}
  object2.description = modifications;
  return object2
}
console.log(cleanAndModify(task, "arrays"));
  //==============================================

const myObject = {
  method (){
    console.log ('Метод 1 вызван');
  },
  method2 (){
    console.log ('Метод 2 вызван');
  },
  property: "Это не метод"
};


  const callAllMethods = (object) => {
    for (const key in object) {
    if (typeof object[key] === 'function') {
    console.log(object[key]);
    }
    }
  }
callAllMethods(myObject);