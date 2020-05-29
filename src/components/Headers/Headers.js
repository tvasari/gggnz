import React from 'react';
import './Headers.css';

const Headers = ( {x, y, w} ) => {
	return(
	      <div className="titoli center" style={{left: `${x}px`, top: `${y}px`, width: `${w}`}}>
	  		<h1 className='mt0 mb4 nome'>GIUSEPPE GNOZZI</h1>
			<h3 className='mb0 artista'>ARTISTA CONCETTUALE, ASTRATTO & DI STRADA</h3>
	      </div>
	);
}

export default Headers;