////// Loops //////
//Task 1

let num = 5;
let f = 1 ;
for(let i = 1 ; i <= num ; i++){
    f*=i;
}
console.log("The factorial of ",num ,"is",f);


//Task 2 

var n = 0;
let counter = 0;
if( n === 0){
    counter = 1;
}else {
    while (n > 0 ){
    counter++;
    n = Math.floor( n /10);
}
}

console.log(counter);

//Task 3

let x = 4;
for( let i = 1 ; i <= x ; i++ ){
    console.log(
        ' '.repeat( x- i ) +'*'.repeat( 2 * i -1) +''.repeat(x-i)
    )
}



///////functions///////

//Task

function factorial(n){
    let f = 1 ;
for(let i = 1 ; i <= n ; i++){
    f*=i;
}
return f;
}


function nDigits(number){
    let counter = 0;
if( number === 0){
    counter = 1;
}else {
    while (n > 0 ){
    counter++;
    number = Math.floor( number /10);
}
}
return counter;
}


function max (a, b, c){
    let max = a;
if(b > max){
    max = b;
}
 if (c > max ){
    max = c;
}
return max;
}


function myGrade(score){
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

}


function numberToDay(number){
    switch(number){
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
}

//Task 2
function combination(p,n){
    return factorial(n)/factorial(p)*factorial(n-p);
}


//Task 3

function Calculator( sign, a, b){
switch(sign){
    case '+':
        return a + b ;
        break;
    case '-':
        return a - b;
    case '*':
        return a * b;
    case '/':
        if(b===0){
            return 'Division by zero is not allowed';
    
        }  
        return a / b;
        break;
    case '%':
        return a % b;
        break;
    case 'c':
        return conbination(a,b);
        break;
    default:
        return 'Invalid operation';                    
}

    
}