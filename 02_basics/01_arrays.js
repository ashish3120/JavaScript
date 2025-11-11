//ARRAY

const myArr = [0,1,2,3,4,true,"ashish",[5,6,7]] //array inside array these arrays can be resized
const myArr2 = new Array(1,2,3,4) // another method to create array


// console.log(myArr[7][0]) // 5
// console.log(myArr.length) // 9
// console.log(typeof myArr) // object
// console.log(Array.isArray(myArr)) // true


//Arrays methods
// myArr2.push("newitem") // adds item at the end
// myArr2.pop() // removes item from the end
myArr2.unshift("start") // adds item at the start
// myArr2.shift() // removes item from the start
// // console.log(myArr2)
// console.log(myArr2.includes(3)) // true
// console.log(myArr2.indexOf(3)) // 3
// console.log(myArr2.reverse()) // reverses the array

// const newArr = myArr2.join("*") // joins array elements with _ separator
// console.log(newArr) // start*1*2*3*4

//Slice and Splice
// console.log("A ",myArr);

// const myn1 = myArr.slice(1,3) // slices from index 1 to 3 excludes 3
// console.log(myn1);
// console.log("B ",myArr);

// const myn2 = myArr.splice(1,3,"newitem1","newitem2") // from index 1 removes 3 items and adds newitem1 and newitem2
// console.log(myn2);
// console.log("C ",myArr);

