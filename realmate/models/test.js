// What are classes in ES6? 

// example:

class Person {
    constructor(name) {
        this.name = name;
    }
    greet() {
        console.log(`Hello ${this.name}!`);
    }
}

const person = new Person("John");
