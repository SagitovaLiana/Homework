function calculateFinalPrice(price, sale, tax) {
  let ps
  let pt
  let fp
  ps = price * (100 - sale) / 100
  pt = ps * tax
  fp = ps + pt
  return fp
}
console.log(calculateFinalPrice(100, 10, 0.2))
//=======================================================
function checkAccess(userName, password) {
  const access = userName === "admin" && password === 123456 ? "Доступ разрещен" : "Доступ запрещен";
  return access
}
console.log(checkAccess("admin", 123456))
//=======================================================
function getTimeOfDay(time) {
  const timeOfDay = time >= 0 && time <= 5 ? "Ночь" : time <= 11 ? "Утро" : time <= 17 ? "День" : time <= 23 ? "Вечер" : "Некорректное время";
  return timeOfDay
}
console.log(getTimeOfDay(0))
//=======================================================
function findFirstEven(start, end) {
  for (let i = start; i <= end; i++) {
    if (i % 2 === 0) {
      return i
    }
    else {
      return "Четных чисел нет"
    }
  }
}
console.log(findFirstEven(2,10))