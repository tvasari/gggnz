import React from 'react';

const Card = ( {foto} ) => {
	return(
          <div className='pa3'>
            <img src={foto} alt='' draggable="false"/>
          </div>
	);
}

export default Card;