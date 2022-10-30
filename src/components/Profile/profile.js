// This page allows the user to edit their profile information/settings
// User can update or delete their account with validation
import React from 'react';
import Modal from 'react-modal';
import {alertMe} from '../Alert/alertBox';

class Profile extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			nameChange: '',
			emailChange: '',
			passwordChange: '',
			confirmPasswordChange: '',
			deletePassword: '',
			showModal: false
		}
		// Bind the modal to the open and close handle
		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
	}

	// Show modal when the 'Delete Account' is clicked
	handleOpenModal = () => {
		this.setState({showModal: true});
	}

	// Close modal when the 'X' button is clicked
	handleCloseModal = () => {
		this.setState({showModal: false});
	}

	// Listen for email, password, confirm password, and name changes in the fields
	// Set states according to values
	onEmailChange = (event) => {
		this.setState({emailChange: event.target.value})
	}

	onPasswordChange = (event) => {
		this.setState({passwordChange: event.target.value})
	}

	onConfirmPasswordChange = (event) => {
		this.setState({confirmPasswordChange: event.target.value})
	}

	onNameChange = (event) => {
		this.setState({nameChange: event.target.value})
	}

	onDeletePassword = (event) => {
		this.setState({deletePassword: event.target.value})
	}

	// On account delete, send the users data to the back-end for validation
	onDeleteSubmit = () => {
		let {user, onRouteChange} = this.props;
		fetch(`https://jsxneko-face-recognition-api.herokuapp.com/profile/${user.id}`, {
			method: 'DELETE',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify({
				id: user.id,
				email: user.email,
				password: this.state.deletePassword,
			})
		})
		.then(res => res.json())
		.then(data => {
			// If error occurrs when attempting to delete, prompt the alertbox for more details
			if(data.error !== undefined) {
				return alertMe(data.error)
			} else {
				// If delete is successfully, reroute user to the sign in page
				alertMe('Account deleted successfully.')
				onRouteChange('signout');
			}
		})
		.catch(err => alertMe(err))
	}

	onSubmitInfoChange = () => {
		let {nameChange, emailChange, passwordChange, confirmPasswordChange} = this.state;
		let {user, loadUser, onRouteChange} = this.props;
		let name = nameChange;
		let email = emailChange;
		let password = passwordChange;
		let confirm_password = confirmPasswordChange;

		// Pre-validation before fetching
		if(nameChange === '' || nameChange.length === 0) name = user.name
		if(emailChange === '' || emailChange.length === 0) email = user.email
		if(passwordChange === '' || passwordChange.length === 0) password = '';
		if(confirmPasswordChange === '' || confirmPasswordChange.length === 0) confirm_password = '';

		// Send users information
		fetch(`https://jsxneko-face-recognition-api.herokuapp.com/profile/${user.id}`, {
			method: 'POST',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify({
				id: user.id,
				name: name,
				oldEmail: user.email,
				email: email,
				password: password,
				confirmPassword: confirm_password,
				entries: user.entries,
				joined: user.joined,
			})
		})
		.then(res => {
			return res.json()
		})
		.then(userData => {
			// If there is an error, display the error in alertbox
			// or display success and reroute user to homepage with userData loaded
			if(userData.error !== undefined) { 
				alertMe(userData.error)
			} else if(userData.id !== undefined){
				alertMe('Profile successfully updated')
				loadUser(userData)
				onRouteChange('home')
			} else if(userData.message !== undefined) {
				alertMe(userData.message)
				onRouteChange('profile')
			}
		})
		.catch(err => alertMe(err))
	}

	render(){
	const {user} = this.props;
	return (
		<article className="br0 shadow-5 ba mb5 b--black w-100 w-50-m w-25-l center">
			<main className="pa4 black-80">
				<fieldset id="edit_info" className="ba b--transparent ph0 mh0">
					<div className="mb3 fw6">Edit Your Profile</div>
					<div className='avatar'>
						<svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
						  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
						  <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
						</svg>
					</div>

					<div className='acc-information'>
						<div className="mt3">
							<label className="db fw6 lh-copy f6" htmlFor="name">Name:</label>
							<div className='input-container'>
								<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="white bg-black pa1 bi bi-person" viewBox="0 0 16 16">
								  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
								</svg>
								<input 
								className="pa2 input-reset ba b--black bg-clear-coat hover-bg-black hover-white w-100" type="text" 
								name="name"  
								id="name" 
								onChange={this.onNameChange} 
								placeholder={user.name}
								/>
							</div>
						</div>

						<div className="mt3">
							<label className="db fw6 lh-copy f6" htmlFor="email-address">Email:</label>
							<div className='input-container'>
								<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="pa1 white bg-black bi bi-envelope" viewBox="0 0 16 16">
								  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
								</svg>
								<input 
								className="pa2 input-reset ba b--black bg-clear-coat hover-bg-black hover-white w-100" 
								type="email" 
								name="email-address"  
								id="email-address" 
								onChange={this.onEmailChange} 
								placeholder={user.email}
								/>
							</div>
						</div>

						<div className="mv3">
							<label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
							<div className='input-container'>
								<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="pa1 bi bi-key white bg-black" viewBox="0 0 16 16">
								  <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z"/>
								  <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
								</svg>
								<input 
								className="b pa2 input-reset ba b--black bg-clear-coat hover-bg-black hover-white w-100" 
								type="password" 
								name="password"  
								id="password" 
								onChange={this.onPasswordChange}
								/>
							</div>
							<label className="db fw6 lh-copy f6 mt3" htmlFor="password">Confirm New Password</label>
							<div className='input-container'>
								<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="pa1 bi bi-key white bg-black" viewBox="0 0 16 16">
								  <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z"/>
								  <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
								</svg>
								<input 
								className="b pa2 input-reset ba b--black bg-clear-coat hover-bg-black hover-white w-100" 
								type="password" 
								name="confirm_password"  
								id="confirm_password" 
								onChange={this.onConfirmPasswordChange}
								/>
							</div>
						</div>

						<p className='fw6'>Your Entries:</p> <span>{user.entries}</span>
						<p className='fw6'>Date joined:</p> <span>{user.joined}</span>
					</div>
				</fieldset>

				<div>
					<Modal 
					isOpen={this.state.showModal} 
					className='Modal' 
					overlayClassName='Overlay'
					>
					  <div className='input-container'>
						  <h3>Are you sure?</h3>
						  <span 
						  className='link' 
						  onClick={this.handleCloseModal}>
						  X
						  </span>
					  </div>

					  <hr/>

					  <div>
						<p className='mb4 f4'>Your account will be permanently deleted and cannot be retrieved. To delete your account, enter your current password.</p>
						<input className="center b pa2 input-reset ba b--black bg-transparent w-80" 
						type="password" 
						name="delete_password"  
						id="delete_password"
						onChange={this.onDeletePassword}
						/>
					  </div>
					  
					  <div className='mt4 mb3 center'>
						<input 
						className="b ph3 pv2 input-reset ba b--black bg-red grow pointer f6 dib" 
						type="submit" 
						value="Confirm & Delete"
						onClick={this.onDeleteSubmit}
						/>
					  </div>
					</Modal>
				</div>

			  <div className='mt2'>
				  <input 
				  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
				  type="submit" 
				  value="Save Changes" 
				  onClick={this.onSubmitInfoChange}/>
				  <br/>
				  <input className="mt2 b ph3 pv2 input-reset ba b--black bg-red grow pointer f6 dib" 
				  type="submit"
				  value="Delete My Account" 
				  onClick={this.handleOpenModal}
				  />
			  </div>
			</main>
		</article>
		);
	}
}

export default Profile;
