import React from 'react';

const FilterPaintings = ({ onInputChange, onButtonSubmit, x, y, w }) => {
	return(
		<div className='absolute' style={{left: `${x - 200}px`, top: `${y + 70}px`, width: `${w}`}}>
			<p className='f4'>
				{'Give it a try.'}
			</p>
			<div className='center'>
				<div className='form center pa3 br3 shadow-5'>
					<input type='text' className='f4 pa1 w-60 center' onChange={onInputChange}/>
					<button className='pointer w-30 grow f4 link ph3 pv1 dib white bg-orange' onClick={onButtonSubmit}>
					  Detect
					</button>
				</div>
			</div>	
		</div>
	);

}

export default FilterPaintings;