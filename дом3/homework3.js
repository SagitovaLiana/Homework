for ( let i = 1; i <=20; i++){
  if (i% 4 == 0) {
    continue
  } else {
    console.log(i)
  }
}
//==============================================
const number = +prompt ("Напишите любое число", 5);
let factorial = 1
for (let i= 1; i <= number; i++){
  factorial=factorial*i
console.log(factorial)
}