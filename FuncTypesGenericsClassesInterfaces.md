# Functions and Function types

//Function & Types

function add(a: number, b: number): number {  // This is inferred by TS to return a number, but here we are explicitly defining it.
    return a + b;
}

//Special return type

function print(value: any) {  // :void type (Does not 'return' a value) i.e. logs, storage writes, etc.
    console.log(value);
}

# Generics

// Generics

function insertAtBeginning(array: any[], value: any) {
    const newArray = [value, ...array]
    return newArray;
}

const demoArray = [1, 2, 3];

const updatedArray = insertAtBeginning(demoArray, -1); // [-1, 1, 2, 3]

// Typescript now does not know it has an array of numbers, because we defined "any", it's just taking groups of stuff and sticking it together.
// If we wanted to do mathy stuff to it, the typing could be an issue... enter Generics!!!!
// We basically removed Typescript from Typescript, hehe.
// So we won't get a Typescript compile error, but we will get a runtime error about typing when the code runs in the browser.

function insertAtBeginning<T>(array: T[], value: T) { // <> is strictly a TS thing;  <T> is the identifier, T is normal, but others are okay;
    const newArray = [value, ...array]
    return newArray;
}

const demoArray = [1, 2, 3];

const updatedArray = insertAtBeginning(demoArray, -1); // [-1, 1, 2, 3]

updatedArray[0].split('');  

// So! Now that we have used the generic markers, Typescript knows that it needs to check the input against the type of operation being run again it. Here it know split will not work on numbers, hence "Property 'split' does not exist on type 'number' "


# Classes

Type script allows for setting types before the constructor. Same abilities as JS classes, suchs as private variables, and private methods needed to access them.



# Interfaces

Basically another type of blueprint. So set the form of the object, or array, or whatever the Interface needs to be. then any call to 'copy' the interface gets run against it.

Basically it works on creating classes as well, which the type keywork does not.

Large projects would need this. More people creating classes that may or may not "fit" or "interface" with the other bits of software. I think, anyhooooo.