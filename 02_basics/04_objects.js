//Singelton Object

//const tinderUser = new Object() // creating object using object constructor Singleton
const tinderUser2 = {} // object literal syntax non singleton 
//console.log(typeof tinderUser); // object

tinderUser2.name = "ashish" // adding key value pair
tinderUser2.id = "as123"
tinderUser2.isLoggedIn = false
// console.log(tinderUser2);


const regularUser = {
    email : "someemail@gmail.com",
    Full_name : {
        Userfullname : {
            Firstname : "Ashish",
            Lastname : "Singh"
        }
    }
}

// console.log(regularUser.Full_name.Userfullname.Firstname); // accessing nested object

const obj1 = {
    key1 : "value1",
    key2 : "value2"
}

const obj2 = {
    key3 : "value3",
    key4 : "value4"
}

const obj3 = {...obj1, ...obj2} // merging two objects using spread operator
// console.log(obj3);


const users = [
    {userId : 1, userName : "ashish"},
    {userId : 2, userName : "john"},
    {userId : 3, userName : "doe"}
]
console.log(users[0].userId); // 1
console.log(Object.keys(tinderUser2)); // name, id, isLoggedIn
console.log(Object.values(tinderUser2)); // ashish, as123, false

console.log(Object.entries(tinderUser2)); // [ [ 'name', 'ashish' ], [ 'id', 'as123' ], [ 'isLoggedIn', false ] ]

console.log(tinderUser2.hasOwnProperty("name")); // true
console.log(tinderUser2.hasOwnProperty("age")); // false
