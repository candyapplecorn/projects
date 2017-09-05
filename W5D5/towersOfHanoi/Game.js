const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


class Game {
  constructor() {
    this.stacks = [[3, 2, 1], [], []]
  }

  promptMove(){
    // print the stacks (render)
    this.render()
    // pompt for input (reader???)
    reader.question("Chooe yours moves:\n> ", function(response){
      let almostParsed = response.replace(/(\d+).*?(\d+)/, "$1 $2"); // "1 2"
      const [n1, n2] = almostParsed.split(' ').map(Number); // ["1", "2"] Number("2")
    })
    //  prompt's callback
  }

  render(){
    let maxIndex = Math.max(... this.stacks.map(s => s.length)) - 1;

    for (; maxIndex >= 0; maxIndex--){
      console.log(`${this.stacks[0][maxIndex] || "_"}${this.stacks[1][maxIndex] || "_"}${this.stacks[2][maxIndex] || "_"}`);
    }
  }
}

const g = new Game();
g.render();
//
// 1, 2
// 1,2
// 1 2
//1, 222222222     /ba?/
