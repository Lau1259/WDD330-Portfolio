const numbers = {};

function getFib(n) {
  if (n < 2) {
    return n;
  } else {
    return getFib(n - 1) + getFib(n - 2);
  }
}

function getFibMem(n) {
  if (n < 2) {
    return n;
  } else if (numbers[n]) {
    return numbers[n];
  } else {
    numbers[n] = getFibMem(n - 1) + getFibMem(n - 2);
  }
  return numbers[n];
}

self.addEventListener('message', (event) => {
  const mem = Boolean(event.data[1]);
  const n = Number(event.data[0]);
  let fib = 'Sorry, something went wrong =(';
  if (mem) {

    console.log('Memoized');
    fib = String(getFibMem(n));
  } else {
    fib = String(getFib(n));
  }
  console.log(fib);
  self.postMessage(fib);
  self.close();
}, false);