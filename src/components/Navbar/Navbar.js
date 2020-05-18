import React from 'react';
import Social from '../Social/Social.js';
import './Navbar.css'

const Navbar = () => {
	return(
			<div className="fixed navbar center flex justify-center items-center w-100">
				<a className="navbar f6 link dim br1 ph5 mb2 dib black" href="#0" draggable="false">IT/EN</a>
				<a className="navbar f6 link dim br1 ph5 mb2 dib black" href="#0" draggable="false">HOME</a>
				<a className="navbar f6 link dim br1 ph5 mb2 dib black" href="#0" draggable="false">ABOUT ME </a>
				<a className="navbar f6 link dim br1 ph5 mb2 dib black" href="#0" draggable="false">WORKS</a>
				<a className="navbar f6 link dim br1 ph5 mb2 dib black" href="#0" draggable="false">DATES</a>
				<a className="navbar f6 link dim br1 ph5 mb2 dib black" href="#0" draggable="false">CONTACTS</a>
				<Social />
			</div>
	);
}

export default Navbar;