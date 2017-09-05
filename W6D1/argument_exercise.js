function sum2(){
  let arg = Array.from(arguments);
  let total = 0;
  for(let i = 0; i < arg.length; i++){
    total += arg[i];
  }
  return total;
}

function sum(...args){
  if (args.length === 1){
    return args.pop();
  }else{
    // return args.shift() + sum(...args);
    return args.shift() + sum.apply(null, args);
  }
}

// console.log(sum(1,2,3,4));



Function.prototype.myBind = function myBind(){
  let args = Array.from(arguments); // [breakfast, ?????]
  let self = this;
  return function (){
    let allArgs = args.concat(Array.from(arguments));
    self.call(allArgs.shift(), ...allArgs);
    // self.apply(allArgs.shift(), allArgs);
  };
};

class Cat {
  constructor(name) {
    this.name = name;
  }

  says(sound, person) {
    // console.log(`${this.name} says ${sound} to ${person}!`);
    return true;
  }
}

const markov = new Cat("Markov");
const breakfast = new Cat("Breakfast");

// markov.says("meow", "Ned");
// Markov says meow to Ned!
// true

// bind time args are "meow" and "Kush", no call time args
markov.says.myBind(breakfast, "meow", "Kush")();
// Breakfast says meow to Kush!
// true

// no bind time args (other than context), call time args are "meow" and "me"
markov.says.myBind(breakfast)("meow", "a tree");
// Breakfast says meow to a tree!
// true

// bind time arg is "meow", call time arg is "Markov"
markov.says.myBind(breakfast, "meow")("Markov");
// Breakfast says meow to Markov!
// true

// no bind time args (other than context), call time args are "meow" and "me"
const notMarkovSays = markov.says.myBind(breakfast);
notMarkovSays("meow", "me");
// Breakfast says meow to me!
// true

function sumThree(num1, num2, num3) {
  return num1 + num2 + num3;
}

Function.prototype.curry = function curry(numArgs) {
  let args = [];

  //old style with self
  // let self = this;
  // return function _curried(arg) {
  //   args.push(arg);
  //   if (args.length !== numArgs){
  //     return _curried;
  //   }else{
  //     // return self.apply(null, args);
  //     return self.call(null, ...args);
  //   }
  // };

  //use arrow function (best practice)
  // let _curried = arg => {
  //   args.push(arg);
  //   if (args.length !== numArgs){
  //     return _curried;
  //   }else{
  //     // return self.apply(null, args);
  //     return this.call(null, ...args);
  //   }
  // };


  let _curried = (...newArgs) => {
    args.push(...newArgs);
    if (args.length !== numArgs){
      return _curried;
    }else{
      return this.apply(null, args);
      // return this.call(null, ...args);
    }
  };

  //use bind
//   let _curried = function(arg) {
//     args.push(arg);
//     if (args.length !== numArgs){
//       return _curried;
//     }else{
//       // return self.apply(null, args);
//       return this.call(null, ...args);
//     }
//   }.bind(this);
//
  return _curried;
};

sumThree(4, 20, 6); // == 30

// you'll write `Function#curry`!
let f1 = sumThree.curry(3); // tells `f1` to wait until 3 arguments are given before running `sumThree`
f1 = f1(4); // [Function]
f1 = f1(20); // [Function]
f1 = f1(6); // = 30

// or more briefly:
console.log(sumThree.curry(3)(20,6)(7)); // == 30
