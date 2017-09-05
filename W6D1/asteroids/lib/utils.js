const Util = {
  inherits (childClass, parentClass){
    childClass.prototype = Object.create(parentClass.prototype);
    childClass.constructor = childClass;
  },

  distance(pos1, pos2){
    const [x1, y1] = pos1;
    const [x2, y2] = pos2;
    const squared = n => Math.pow(n, 2);

    return Math.sqrt(
      squared(x1 - x2) + squared(y1 - y2)
    );
  },

  // Return a randomly oriented vector with the given length.
  randomVec (length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },

    // Scale the length of a vector by the given amount.
  scale (vec, m) {
    return [vec[0] * m, vec[1] * m];
  }
};

module.exports = Util;
