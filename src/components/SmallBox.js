import React from 'react';

const SmallBox = (props) => {
	return(
		<div className="fl w-100 w-50-ns pa2">
			{props.children}
	    </div>
	);
}

export default SmallBox;