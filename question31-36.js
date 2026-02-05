// While loop that exits after counting 5 prime numbers

function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

let count = 0;
let n = 2;

while (count < 5) {
    if (isPrime(n)) {
        console.log("Prime:", n);
        count++;
    }
    n++;
}

//  Same loop using break

count = 0;
n = 2;

while (true) {
    if (isPrime(n)) {
        console.log("Prime (break loop):", n);
        count++;
    }
    if (count === 5) break;
    n++;
}

// For loop printing numbers 1 to 10 in reverse

for (let i = 10; i >= 1; i--) {
    console.log("Reverse:", i);
}

// Using continue, print only positive numbers

let mixedArray = [1, -6, 5, 7, -98];

for (let i = 0; i < mixedArray.length; i++) {
    if (mixedArray[i] < 0) continue;
    console.log("Positive number:", mixedArray[i]);
}


