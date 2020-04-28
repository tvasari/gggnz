import React from 'react';
import Draggable from 'react-draggable';
import './Headers.css';

const Headers = ( {controlledPosition, onControlledDrag} ) => {
	return(
		<Draggable position={controlledPosition} onDrag={onControlledDrag}>
	      <div className="titoli center">
	  		<h1 className='mt0 mb4 nome'>GIUSEPPE GNOZZI</h1>
			<h3 className='mb0 artista'>ARTISTA CONCETTUALE, ASTRATTO & DI STRADA/</h3>
			<h3 className='mt0 artista'>CONCEPTUAL, ABSTRACT & STREET ARTIST</h3>
	      </div>
      	</Draggable>
	);
}

export default Headers;