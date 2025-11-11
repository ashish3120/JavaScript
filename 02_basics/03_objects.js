//Singelton

//object Literal


Object.create(null) // creates empty object without prototype

const mySum = Symbol("key1") // creates unique key

const Juser = {
    name : "Ashish",
    age : 21,
    [mySum] : 45, // using symbol as key this is the format
    location : "India",
    email : "ashish@google.com",
    isLoggedIn : true,
    lastLoginDays : ["Monday","Friday"]
}

// console.log(Juser.name); // Ashish
// console.log(Juser["email"]); // ashish@google.com
// console.log(Juser[mySum]);

Juser.age = 19 // update age
//Object.freeze(Juser) // freezes the object no updation allowed after this
Juser.age = 25 // will not update
// console.log(Juser)  


Juser.greeting = function(){
    console.log("Hello JS User");
}

Juser.greetingtwo = function(){
    console.log(`Hello JS user , ${this.name}`)
}

Juser.greeting();
Juser.greetingtwo();
