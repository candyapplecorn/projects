const Util = require('./util');
const DOMNodeCollection = require('./dom_node_collection');

window.$l = function core(arg){ // arg: "#id .className elementType"
  if (typeof arg === "function")
    {
      document.addEventListener('DOMContentLoaded', arg);
    }
  else if (arg instanceof HTMLElement)
    {
      return new DOMNodeCollection([arg]);
    }
  else if (/<.+>/.test(arg)) // "<div>"
    {
      // let withoutCarrots = arg.replace(/[<>]/g, "");
      // let newElement = document.createElement(withoutCarrots);
      // return  new DOMNodeCollection([newElement]);
      return  new DOMNodeCollection([Util.createElement(arg)]);
    }
  else if (typeof arg === 'string')
    {
      const elements = document.querySelectorAll(arg);
      return new DOMNodeCollection(elements);
    }
};
let $l = window.$l;

$l(() => {
  console.log($l('li').length === $('li').length); // CHECK!
});

// empty
// remove
// attr
// addClass
// removeClass
// html
// find
// children
// parent
