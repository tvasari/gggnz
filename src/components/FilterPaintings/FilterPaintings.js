import React from 'react';

const FilterPaintings = ({ onInputChange, onButtonSubmit, getFocus, x, y}) => {

	return(
		<div className='absolute' style={{left: `${(x - 230)}px`, top: `${(y + 60)}px`, width: '35%'}}>
			<p className='f4' style={{'fontSize': '1.3rem'}}>
				{'Insert a color name.'}
			</p>
			<div className='form center pa3 br3 shadow-5 block' style={{width: 'fit-content'}}>
				<input autoComplete="off" id="myTextField" type='text' style={{width: '300px'}} className='f4 pa1 center' onTouchStart={() => getFocus()} onChange={onInputChange}/>
				<button className='pointer w4 grow f4 link ph3 pv1 dib white bg-orange' style={{'fontSize': '1.3rem'}} onTouchStart={onButtonSubmit} onClick={onButtonSubmit}>
				  Detect
				</button>
			</div>
		</div>
	);

}

export default FilterPaintings;