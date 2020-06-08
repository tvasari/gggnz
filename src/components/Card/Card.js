import React from 'react';
import './Card.css';

const Card = ( {photo, openPopUp, setDragging, route, c, r, x, y, id } ) => {

    return(
        <div className={`${route} thumb c${c} r${r} absolute pa2 `} id={id} style={{left: `${x}px`, top: `${y}px`}}>
            {
                route === 'home' || photo === 'https://i.imgur.com/n7lk6Tn.png' ? (
                    <img src={photo} alt='' draggable="false" className='homepainting'/>
                ) : (
                    <img onClick={!setDragging ? e => openPopUp(photo): null} onTouchEnd={!setDragging ? e => openPopUp(photo): null} src={photo} alt='' draggable="false" className='painting workspainting' style={{cursor: 'pointer'}}/>         
                )
            }
        </div>
    );
}

export default Card;