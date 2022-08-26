import React, {Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/rank';
import FaceRecognition from './components/FaceRecognition/faceRecognition';
import SignIn from './components/SignIn/signIn';
import Register from './components/Register/register';
import Profile from './components/Profile/profile';
import ParticlesBox from "./components/Particles/particles";
import Footer from './components/Footer/footer';
import {alertMe} from './components/Alert/alertBox';

const initialState = {
		input: '',
		imageUrl: '',
		box: [],
		route: 'signin',
		isSignedIn: false,
		user: {
			id:'',
			email: '',
			name: '',
			entries: 0,
			joined: ''
		}
}

class App extends Component {
	constructor() {
		super();
		this.state = initialState;
	}

	loadUser = (user) => {
		this.setState({
			user: {
				id: user.id,
				email: user.email,
				name: user.name,
				entries: user.entries,
				joined: user.joined
		}})
	}

	calculateFaceLocation = (data) => {
	 const clarifaiFaceEach = data.outputs[0].data.regions;
	 const image = document.getElementById('input-image');
	 const width = Number(image.width);
	 const height = Number(image.height);
	 const each_box = clarifaiFaceEach.map((area) => {
			 return ({
				leftCol: area.region_info.bounding_box.left_col * width,
				topRow: area.region_info.bounding_box.top_row * height,
				rightCol: width - (area.region_info.bounding_box.right_col * width),
				bottomRow: height - (area.region_info.bounding_box.bottom_row * height),
			})
	 })
	 return each_box;
	}

	displayFaceBox = (box) => {
		this.setState({box: box})
	}

	onInputChange = (event) => {
		this.setState({input: event.target.value});
	}

	onImageSubmit = () => {
		this.setState({imageUrl: this.state.input})
		fetch('https://serenuy-face-api.herokuapp.com/imageurl', {
			method: 'POST',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify({input: this.state.input})
		})
		.then(res => res.json())
		.then(res => {
			if(res) {
				fetch('https://serenuy-face-api.herokuapp.com/image', {
					method: 'PUT',
					headers: {'Content-Type':'application/json'},
					body: JSON.stringify({
						id: this.state.user.id
					})
				})
				.then(res => res.json())
				.then(count => {
					this.setState(Object.assign(this.state.user, {entries:count}))
				})
			}
			this.displayFaceBox(this.calculateFaceLocation(res)
		)})
		.catch(err => {
			if(!this.state.input.length)  return alertMe('Before we can detect faces for you. You must provide a URL to an image.')
			return alertMe('Make sure the URL you\'ve entered ends with .jpg/.png/.jpeg or any other image extension.')
		})
	}

	onRouteChange = (route) => {
		if(route === 'signout') {
			this.setState(initialState)
		} else if(route === 'home') {
			this.setState({isSignedIn: true}) 
		} else if(route === 'profile') {
			this.setState({isSignedIn: true}) 
		} else {
			this.setState({isSignedIn: false}) 
		}

		return this.setState({route: route});
	}

	render() {
		const {isSignedIn, imageUrl, route, box } = this.state;
		return (
				<div className="App">
				<Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
				<ParticlesBox />
				{ 
					route === 'home' ?
						<div>
							<Rank name={this.state.user.name} entries={this.state.user.entries}/>
							<ImageLinkForm onInputChange={this.onInputChange} onImageSubmit={this.onImageSubmit}/>
							<FaceRecognition box={box} imageUrl={imageUrl}/>
						</div>
					: 
						(
							route === 'profile' ? <Profile loadUser={this.loadUser} user={this.state.user} onRouteChange={this.onRouteChange}/> :
							(route === 'register' ? 
								<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
								:
								<SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
							)
						)    
				}
				<Footer />
				<div className='alertBox' style={{display:'none'}}>
					<div className="pa3 bg-black ba b--white">
						<span className='alert-text white'></span>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
