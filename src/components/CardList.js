import React from 'react';
import Card from './Card.js';
import Draggable from 'react-draggable';
import foto from '../fotoprova/5.jpg'

const CardList = ( {controlledPosition, onControlledDrag} ) => {
	return(
		<Draggable position={controlledPosition} onDrag={onControlledDrag}>
			<div className='flex justify-center'>
          		<Card foto={foto}/>
          		<Card foto={foto}/>
          		<Card foto={foto}/>
          		<Card foto={foto}/>
      		</div>
        </Draggable>
	);
}

export default CardList;