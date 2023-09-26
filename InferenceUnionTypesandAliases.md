# Inference

let test = 12;
test = 'Goal!';  // Error: Type string is not assignable to type number // We did not set the type, TS set it for us.

TS infers the type when you declare and set the variable; When you try to reassign the wrong type to it, it will catch it.

# Union Types

Not quite the opposite of Inference? When you need a variable to be able to be more than one type. 

let test: string | number = "Goal!";  // This checks out in .\Types-Primitives-Arrays-Objects\basics.ts  


# Alias

Definitely feels like javascript classes???

