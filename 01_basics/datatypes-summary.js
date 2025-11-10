//Primitive Data Types in JavaScript (call by value)
//total 7 data types
//1. Number
//2. String
//3. Boolean
//4. Undefined
//5. Null
//6. Symbol => gives data type to unique identifiers

    let sym1 = Symbol("my identifier")
    let sym2 = Symbol("my identifier")
    // console.log(sym1===sym2) //false because every symbol is unique
//7. BigInt

//Reference Data Types in JavaScript (call by reference)
//1. Object
//2. Arrays
//3. Functions

const heros = ["shaktiman", "naagraj", "doga"]
const myObj = {
    name: "Hitesh",
    age: 24,
    isLoggedIn: false
}

function myFunc(){
    console.log("Hello World");
}
// myFunc();


//+++++++++++++++++++++++++++++++++++++++++

/*Memory
- Stack(Primitive Data Types) : Copy of actual value is stored in stack
- Heap(Non-Primitive Data Types) : Reference of the actual value is stored in heap
*/

//STACK
 let myYttChannel = "codewithhitesh"
 let anotherChannel = myYttChannel
 anotherChannel = "chaiaurcode"
 console.log(myYttChannel);
 console.log(anotherChannel);

//  HEAP
    let userOne = {
        name: "Hitesh",
        age: 24,
        isLoggedIn: false
    }
    let userTwo = userOne
    userTwo.age = 25
    console.log(userOne);//age will be 25 because both userOne and userTwo are referencing same object in heap
    console.log(userTwo);

