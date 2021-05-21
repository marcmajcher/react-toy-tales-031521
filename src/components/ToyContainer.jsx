import React from 'react';
import ToyCard from './ToyCard';

const ToyContainer = (props) => {
  return (
    <div id="toy-collection">
      {props.toys.map((toy) => (
        <ToyCard
          toy={toy}
          key={toy.id}
          deleteToy={props.deleteToy}
          addLike={props.addLike}
        />
      ))}
    </div>
  );
};

export default ToyContainer;
