//////Variables in JS//////
//Task 1

let firstname = 'Salma';
let lastname = 'Marouani';
const PI = 3.14;
let radius = 2;
let favoriteSuperhero = 'ME';
let favoriteQuote = 'Your I CAN is more important than your iq';
//Task 2

let fullname = firstname + ' ' + lastname;
let circleArea = PI * radius ** 2 ;
let circlePerimeter = 2 * PI * radius;
let motivation =  'A wise woman named ' +favoriteSuperhero + ' : ' + favoriteQuote ;
//Task 3 

let a = 3;
let b = 10;
let temp = a;
a = b;
b = temp ;
console.log("After swapping : a = ",a, " and b = ",b ); 


/////////Conditional Statements//////////
//Task 1

var num = 3;

if(num % 2 === 0){
    console.log("The number is even");
}else{
    console.log("The number is odd");
}


//Task 2

var day = 4;

switch(day){
    case 1:
        console.log('Monday');
        break;
    case 2:
        console.log('Tuesday') ;
        break;
    case 3:
        console.log('Wednsday');
        break;
    case 4:
        console.log('Thursday');
        break;
    case 5:
        console.log('Friday');
        break;
    case 6:
        console.log('Saturday');
        break;
    case 7:
        console.log('Sunday');
        break;
    default:
        console.log('Unvalid Day');                           

}



//Task 3

let x = -15;
let y = 6;
let z = 2.6;

let max = y;
if(x > max){
    max = x;
}
 if (z > max ){
    max = z;
}
console.log('the Max is :',max);
//Task 4

//supposing that the score is between 0 and 100
let score = 75;
if(score > 85){
    console.log('grade is A');
}else if (score > 70){
    console.log('grade is B');
}else if (score > 55){
    console.log('grade is C');
}else if (score > 40){
    console.log('grade is D');
}else if (score > 15){
    console.log('grade is E');
}else{
    console.log('grade is D')
}



