const Util = {
  createElement(arg){
    let withoutCarrots = arg.replace(/[<>]/g, "");
    let newElement = document.createElement(withoutCarrots);
    return newElement;
    // return  new DOMNodeCollection([newElement]);
  }
};

module.exports = Util;
