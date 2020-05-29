import React from 'react';
import Social from '../Social/Social.js';
import './Navbar.css'

const Navbar = ( { onRouteChange } ) => {
	return(
			<div className="fixed navbar center flex justify-center items-center w-100">
				<p className="navbar f6 link dim br1 ph5 mb2 dib black" href="#0" draggable="false">IT/EN</p>
				<p className="navbar f6 link dim br1 ph5 mb2 dib black" href="#0" draggable="false" onClick={() => onRouteChange('home')}>HOME</p>
				<p className="navbar f6 link dim br1 ph5 mb2 dib black" href="#0" draggable="false">ABOUT ME </p>
				<p className="navbar f6 link dim br1 ph5 mb2 dib black" href="#0" draggable="false" onClick={() => onRouteChange('works')}>WORKS</p>
				<p className="navbar f6 link dim br1 ph5 mb2 dib black" href="#0" draggable="false">DATES</p>
				<p className="navbar f6 link dim br1 ph5 mb2 dib black" href="#0" draggable="false">CONTACTS</p>
				<Social />
			</div>
	);
}

export default Navbar;