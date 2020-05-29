import React from 'react';
import './Card.css'

const Card = ( {photo, openPopUp, setDragging, route, c, r, x, y, id, w } ) => {
	return(
        <div className={`thumb c${c} r${r} absolute pa2 `} id={id} style={{left: `${x}px`, top: `${y}px`, width: `${w}`}}>
        	{
        		route === 'home' || photo === 'https://i.imgur.com/n7lk6Tn.png' ? (
        			<img src={photo} alt='' draggable="false" className='painting'/>
    			) : (
        			<img onClick={!setDragging ? e => openPopUp(photo): null} src={photo} alt='' draggable="false" className='painting'/>       	
    			)
        	}
        </div>
	);
}

export default Card;