//DATES

let mydate = new Date();
console.log(mydate); // Current date and time
// console.log(mydate.toString()); // Current date and time in string format
// console.log(mydate.toDateString()); // Current date in string format     
// console.log(mydate.toLocaleString()); // Current date and time in local format

// console.log(typeof mydate); // object

let specificDate = new Date("2005-07-01");
//console.log(specificDate.toDateString()); // Specific date

let myTimeStamp = Date.now()
// console.log(myTimeStamp); // Current timestamp in milliseconds from 1970 Jan 1
// console.log(specificDate.getTime()); // Timestamp of specific date
// console.log(Date.now() - specificDate.getTime()); // Difference between current date and specific date in milliseconds

let newDate = new Date();
console.log(specificDate.getMonth()+1); // Current month (0-11) +1 to make it (1-12)



