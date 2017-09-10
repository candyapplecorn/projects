/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(2);
const DOMNodeCollection = __webpack_require__(1);

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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(2);

class DOMNodeCollection {
  constructor(htmlElements){
    this.HTMLElements = htmlElements;
    this.events = {}; // {"click" => [fn1, fn2 ...]}
  }

  on(event, callback) {
    // (li).addEventListener('click',cb)
    // step 1: add 'event' type listener to each HTML element

    if (!this.events[event]) {
      this.events[event] = [callback];

      this.HTMLElements.forEach( he => {
        he.addEventListener(event, (ev) => {
          this.events[event].forEach( fn => fn(ev));
        });
      });

    } else {
      this.events[event].push(callback);
    }
  }

  off(event, callback) {
    if (!this.events[event]) {
      return;
    }

    const idx = this.events[event].indexOf(callback);

    if (idx === -1) {
      return;
    }

    this.events[event].splice(idx, 1);
    //                   START /    \ REMOVE THIS MANY


  }

  remove() {
    this.HTMLElements.forEach( e => e.remove());
    this.HTMLElements = [];
  }

  find(selector) {
    const findlist = [];

    this.HTMLElements.forEach( e => {
      let selected = e.querySelectorAll(selector);
      findlist.push(... Array.from(selected));
    });

    return new DOMNodeCollection(findlist);
  }

  parent(){
    const parentsList = [];

    this.HTMLElements.forEach(he => {
      if (!parentsList.includes(he.parentElement)) {
        parentsList.push(he.parentElement);
      }
    });

    return new DOMNodeCollection(parentsList);
  }

  children(){
    // 1. make an empty list
    const list = [];
    // 2. for each of our htmlElements' CHILDREN, wrap THEM in DOMNodes,
    //        append to the list.
    this.HTMLElements.forEach(e => {
      const children = e.children;

      Array.from(children).forEach(cn => {
        list.push(new DOMNodeCollection([cn]));
      });
    });
    // 3. return the list
    return list;
  }

  html(str){
    // else return innerHTML of first node
    if (str === undefined)
      return this.HTMLElements.innerHTML;

    // if str, make into innerHTML of each this.htmlElements
    this.HTMLElements.forEach(e => {
      e.innerHTML = str;
    });
  }

  empty() {
    this.html("");
  }

  append(mysteryArg) {
    // if mysteryArg is wrapped collection [ex . $l('li')]
    //    then append outerHTML of each item to the innerHTML
    //    of each element
    // '<li>', 'li'
    if (typeof mysteryArg === 'string' &&
      mysteryArg.replace(/[^<>]/g,"").length > 2) {
        mysteryArg = {
          HTMLElements: [{outerHTML: mysteryArg}]
        };
    } else if (typeof mysteryArg === 'string' && /<.+>/.test(mysteryArg)) {
      const newEl = Util.createElement(mysteryArg); // DOMNodeCollection
      mysteryArg = new DOMNodeCollection([newEl]); // overwrite '<li>' with domnode
    } else if (typeof mysteryArg === 'string'){ // "li"
      const elements = document.querySelectorAll(mysteryArg);
      mysteryArg = new DOMNodeCollection(elements);
    } else if (mysteryArg instanceof HTMLElement)
      {
        mysteryArg = new DOMNodeCollection([mysteryArg]);
      }
    this.HTMLElements.forEach(he => { // he is a single UL
      mysteryArg.HTMLElements.forEach(ms => { // ms is a single LI
        he.innerHTML += ms.outerHTML;
      });
    });
  }

  addClass(className) {

    this.HTMLElements.forEach(he => {
      he.classList.addClass(className);
    });
  }

  removeClass(className) {
    this.HTMLElements.forEach(he => {
      he.classList.removeClass(className);
    });
  }

  // if passed one argument, get the value for that attribute
  attr(attrName, value) {
    if (value === undefined) {
      return this.HTMLElements[0].getAttribute(attrName);
    } else {
      this.HTMLElements.forEach(he => {
        he.setAttribute(attrName, value);
      });
    }
  }

}

module.exports = DOMNodeCollection;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

const Util = {
  createElement(arg){
    let withoutCarrots = arg.replace(/[<>]/g, "");
    let newElement = document.createElement(withoutCarrots);
    return newElement;
    // return  new DOMNodeCollection([newElement]);
  }
};

module.exports = Util;


/***/ })
/******/ ]);