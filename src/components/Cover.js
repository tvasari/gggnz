import React from 'react';
import facade from './facade.jpg'
import './Cover.css'

const Cover = () => {
	return(
		<div>
			<img src={facade} alt='' className='facade'/>
		</div>
	);
}

export default Cover;