const readline = require("readline");

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askIfGreaterThan(el1, el2, callback) {
  reader.question(`Is ${el1} less than ${el2}? \n> `, response =>
    callback(/y/i.test(response) ? false : true)
  );
}

// askIfGreaterThan(1, 3, console.log);

function BubbleSortLoop(arr, i = 0, madeAnySwaps = false) {
    console.log("we are in the if", i, arr, madeAnySwaps);

    askIfGreaterThan(arr[i], arr[i + 1], function(doSwap) {
      if (doSwap) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        madeAnySwaps = true;
      }

      if (i === arr.length - 2 && madeAnySwaps) {
        BubbleSortLoop(arr);
      } else if (i === arr.length - 2 && !madeAnySwaps) {
        console.log(`${arr} is sorted`);
        reader.close();
      } else {
        BubbleSortLoop(arr, ++i, madeAnySwaps);
      }
    });
}

const arr = [2, 3, 1];
BubbleSortLoop(arr);
