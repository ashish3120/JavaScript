const name = "Ashish Singh"
const repocount = 9

// console.log(name + repocount)  //do not use this method
// console.log(`Hello my name is ${name} and my repo count is ${repocount}`)

const gameName = new String("rdxkill")
// console.log(gameName[0]) //r
// console.log(gameName.__proto__) //gives all string methods
// console.log(gameName.length) // 7
// console.log(gameName.toUpperCase()) // RDXKILL
// console.log(gameName.charAt(3)) //k starts from 0
// console.log(gameName.indexOf("k")) //3
// console.log(gameName.endsWith("kill")) //true
console.log(gameName.substring(0,3)) //rdx excludes 3 and does not accept negative index
console.log(gameName.slice(0,3)) //rdx excludes 3
console.log(gameName.slice(-4)) //kill
console.log(gameName.includes("dx")) //true
console.log(gameName.replace("rdx","pubg")) //pubgkill