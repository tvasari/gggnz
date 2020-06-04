import React, { Fragment } from 'react';
import './PopUp.css'

const PopUp = ( { photo, openPopUp } ) => {
	return(
		<Fragment>
			<div onClick={e => openPopUp()} className='ts-layer mypopup'></div>
			<div id='mypopupid' className='popuptext mypopup'>
				<img src='https://i.imgur.com/ORymxJG.jpg' alt='' id='quadro' />
				<p id='didascalia'>Titolo, Anno, Tecnica</p>
			</div>
		</Fragment>
	);
}

export default PopUp;