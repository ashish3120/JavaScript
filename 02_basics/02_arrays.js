const marvelHeroes = ["thor", "ironman", "spiderman", "hulk"];
const dc = ["batman", "superman", "flash", "aquaman","joker"];

// Combine two arrays
const allHeroes = marvelHeroes.concat(dc);
// console.log(allHeroes);

const all_new_heros = [...marvelHeroes, ...dc]; //for more than 2 values
// console.log(all_new_heros);

const inter  = [1,2,3,[4,5,6],7,[6,7,[4,5]]]

const inter2 = inter.flat(Infinity); //flattens all levels
// console.log(inter2);

// console.log(Array.from("ashish")); //creates array from string or iterable object
// console.log(Array.from({name:"ashish", age:20})); //cannot create array from non-iterable object

let score1 = 100
let score2 = 200
let score3 = 300

console.log(Array.of(score1,score2,score3)); // creates array from arguments

