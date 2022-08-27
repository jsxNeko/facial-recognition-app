// Beta logo for navigation bar
import React from 'react';
import Tilty from 'react-tilty';

const Logo = () => {
	return (
		<p className='navbar-brand ml2' style={{'position':'absolute', 'left':'0'}}>
			<Tilty className="Tilt" max={50} style={{ height: 50, width: 50 }} >
				<img style={{paddingTop:'2px'}} src="https://img.icons8.com/wired/64/000000/beta.png" alt="logo"/>
			</Tilty>
		</p>
		);
}

export default Logo;