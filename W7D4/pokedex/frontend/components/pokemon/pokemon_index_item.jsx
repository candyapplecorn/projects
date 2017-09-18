import React from 'react';
import { Link } from 'react-router-dom';

export default ({pokemon}) => {
  const {name, image_url: imageUrl, id} = pokemon;

  return (
    <li>
      <Link to={`/pokemon/${id}`}>
        <span>{name}</span>
        <img src={imageUrl} />
      </Link>
    </li>
  );
};
