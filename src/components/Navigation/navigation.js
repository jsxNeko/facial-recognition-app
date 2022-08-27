// Navigation bar
// Allows user to navigation to routes
import React from 'react';
import Logo from '../Logo/logo';

const Navigation = ({ onRouteChange, isSignedIn }) => {
	if(isSignedIn) {
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<Logo/>
				<p onClick={() => onRouteChange('home')} className='ba f5 link dim black pa3 mr3 pointer'>Home</p>
				<p onClick={() => onRouteChange('profile')} className='ba f5 link dim black pa3 mr3 pointer'>My Profile</p>
				<p onClick={() => onRouteChange('signout')} className='ba f5 link dim black pa3 mr3 pointer'>Sign Out</p>
			</nav>
		);
	} else {
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<Logo/>
				<p onClick={() => onRouteChange('signin')} className='ba f5 link dim black pa3 mr2 pointer'>Sign In</p>
				<p onClick={() => onRouteChange('register')} className='ba f5 link dim black pa3  mr4 pointer'>Register</p>
			</nav>
		);
	}
}

export default Navigation;