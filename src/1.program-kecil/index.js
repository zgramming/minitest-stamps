const arr = Array.from({ length: 100 });

const temp = [];

function isPrime(num) {
  if (num === 1) {
    return false;
  }

  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
  }

  return true;
}

for (let i = 1; i <= 100; i++) {
  if (!isPrime(i)) {
    if (i % 3 === 0 && i % 5 === 0) {
      temp.push('FooBar');
    } else if (i % 3 === 0) {
      temp.push('Foo');
    } else if (i % 5 === 0) {
      temp.push('Bar');
    } else {
      temp.push(i);
    }
  }
}

const join = temp.reverse().join(', ');

console.log(join);
