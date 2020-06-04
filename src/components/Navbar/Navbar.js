import React from 'react';
import Social from '../Social/Social.js';
import './Navbar.css'

const Navbar = ( { onRouteChange } ) => {
	return(
			<div className="fixed navbar flex justify-center items-center">
				<p className="navbar f6 link dim br1 mb2 dib black" href="#0" draggable="false" onClick={() => onRouteChange('home')}>HOME</p>
				<p className="navbar f6 link dim br1 mb2 dib black" href="#0" draggable="false">ABOUT ME </p>
				<p className="navbar f6 link dim br1 mb2 dib black" href="#0" draggable="false" onClick={() => onRouteChange('works')}>WORKS</p>
				<p className="navbar f6 link dim br1 mb2 dib black" href="#0" draggable="false">DATES</p>
				<p className="navbar f6 link dim br1 mb2 dib black" href="#0" draggable="false">CONTACTS</p>
				<p className="navbar f6 link dim br1 mb2 dib black show" href="#0" draggable="false">IT/EN</p>				
				<Social />
			</div>
	);
}

export default Navbar;