const Util = require('./util');

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
