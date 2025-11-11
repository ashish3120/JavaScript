const score = 400
const balance = new Number(100)

// console.log(balance) // [Number: 100]
// console.log(score) // 400

// console.log(balance.toString().length) // 3
// console.log(balance.toFixed(4)) // 100.0000

// const othernum = 123.8966

// console.log(othernum.toPrecision(3)) // gives 3 significant digits 124
// console.log(othernum.toPrecision(5)) // gives 5 significant digits 123.90

// const hundreds = 100000
// console.log(hundreds.toLocaleString('en-IN')) // 100,000 en-IN format for india


//+++++++++++++++++++ Maths +++++++++++++++++++++++

// console.log(Math.PI.toFixed(2)) // 3.14;
// console.log(Math.abs(-34)) // 34
// console.log(Math.round(4.6)) // 5
// console.log(Math.ceil(4.2)) // 5
// console.log(Math.floor(4.9)) // 4
// console.log(Math.min(34,67,23,89,2,1)) // 1
console.log(Math.floor((Math.random()*10+1))) // gives random number between 1 to 10

const max = 10
const min = 20

console.log(Math.floor(Math.random() * (max - min + 1) + min)) // gives random number between min to max
