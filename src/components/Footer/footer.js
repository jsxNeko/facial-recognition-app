import React from 'react';

const Footer = () => {
	return (
		<div className='footer'>
			<p class="text-uppercase black link">© <a 
				href='https://github.com/serenuy/facial-recognition-app'
				style={{'text-decoration':'none'}}>
				Serenuy/@github</a> 
			<script>document.write(new Date().getFullYear())</script>
			</p>
		</div>
		);
}

export default Footer;