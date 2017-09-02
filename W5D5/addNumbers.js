const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function addNumbers(sum, numsLeft, completionCallback){
  if (numsLeft-- > 0){
    reader.question("Pick a number: ", function(response){
      response = parseInt(response);

      sum += response;

      console.log(` the sum is ${sum}`);

      addNumbers(sum, numsLeft, completionCallback);

      if (numsLeft === 0) completionCallback(sum);
    });
  }
}


addNumbers(0, 3, (n)=>{
  console.log(n);
  reader.close();
});
