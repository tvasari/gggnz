import React from 'react';
import SmallBox from './SmallBox.js';
import Headers from './Headers.js';
//import Navbar from './Navbar.js';

const Box = () => {
	return(
		<div className="mw9 center ph3-ns">
		  <div className="cf ph2-ns">
		  	<SmallBox />
		  	<SmallBox>
		  		<Headers />
		  	</SmallBox>
		  </div>
		</div>
	);
}

export default Box;