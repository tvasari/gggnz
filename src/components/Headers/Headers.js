import React from 'react';
import './Headers.css';

const Headers = ( {x, y} ) => {
	return(
	      <div className="titoli center" style={{left: `${x - 250}px`, top: `${y + 250}px`}}>
	  		<h1 className='mt0 mb4 nome'>GIUSEPPE GNOZZI</h1>
			<h3 className='mb0 artista'>ARTISTA CONCETTUALE, ASTRATTO & DI STRADA</h3>
	      </div>
	);
}

export default Headers;