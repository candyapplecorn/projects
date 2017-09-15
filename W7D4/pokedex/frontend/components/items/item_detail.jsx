import React from 'react';

export default ({ item }) => (
  <div>
      <h5>{item.name}</h5>
      Happiness: {item.happiness}
      <br />
      Price: ${item.price}
  </div>
);
