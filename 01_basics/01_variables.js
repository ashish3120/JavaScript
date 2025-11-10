const accountId = 144553 //value assigned cannot be changed
let accountEmail = "Ashish312@gmail.com"
var accountPass = "123456"
accountCity = "Ranchi" //not preferred but can be used
let accountState; //this variable is has value undefined
/*
Prefer not to use var because of issue in block 
scope and function scoope
*/

//accountId = 2  //Not Allowed 
accountEmail = "hc@.com"
accountPass = "35435121"
accountCity = "Siwan"
console.log(accountId);
console.log(accountEmail);
console.table([accountEmail,accountId,accountPass,accountCity,accountState]) //want to print more than 2 variables so use table