import React from 'react';
import Card from './Card.js';
import Draggable from 'react-draggable';
import './CardList.css'

const CardList = ( {controlledPosition, onControlledDrag, photos} ) => {
	return(
		<Draggable position={controlledPosition} onDrag={onControlledDrag}>
			<div className='container'>
        {
          photos.map((photo, i) => {
            return <Card key={i} photo={photo.url} />
          })
        }		
  		</div>
    </Draggable>
	);
}

export default CardList;