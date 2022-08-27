// This is the form on the homepage after logging in or registering
// Where the user can enter a URL into the input field
import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onImageSubmit }) => {
	return (
		<div>
			<p className='f3'>
				{'Who\'s in your photo? Give us a image URL and we will detect faces for you.'}
			</p>
			<div className='center'>
				<div className='form center pa4 br3 shadow-5'>
					<input className='f4 pa2 w-100 center' type='tex' onChange={onInputChange}/>
					<button className='detect-btn w-40 grow f4 link ph3 pv2 dib white ba ba--white bg-black' onClick={onImageSubmit}>{'Detect'}</button>
				</div>
			</div>
		</div>
		);
}

export default ImageLinkForm;