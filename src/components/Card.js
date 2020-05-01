import React from 'react';

const Card = ( {photo} ) => {
	return(
          <div>
            <img src={photo} alt='' draggable="false"/>
          </div>
	);
}

export default Card;