import React from 'react';

const Footer = () => {
	return (
		<div className='footer'>
			<p className="text-uppercase black link">© <a 
				href='https://github.com/pixelRena/facial-recognition-app'
				style={{'textDecoration':'none'}}>
				pixelRena/@github</a> 
			<script>document.write(new Date().getFullYear())</script>
			</p>
		</div>
		);
}

export default Footer;
