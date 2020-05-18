import React from 'react';
import './Card.css'

const Card = ( {photo, c, r, x, y, id, w } ) => {


	return(
        <div className={`thumb c${c} r${r} absolute pa2`} id={id} style={{left: `${x}px`, top: `${y}px`, width: `${w}`}}>
            <img src={photo} alt='' draggable="false"/>
        </div>
	);
}

export default Card;