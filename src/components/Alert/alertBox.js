// A popup alert
// Used to display errors or messages to user
const alertMe = (err) => {
	// Get the alert box and the text
	const alertBox = document.querySelector('.alertBox');
	const alertText = document.querySelector('.alert-text');
	// set the innerHTML to the error message to be found
	alertText.innerHTML = err;
	// change the display to unset to allow the alertbox to show on screen
	alertBox.style.display = 'unset';
	// set the alertbox back the none to hide it
	setTimeout(() => {
		alertBox.style.display = 'none';
	}, 3000)
	
}

export {alertMe};