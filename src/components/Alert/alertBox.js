const alertMe = (err) => {
	const alertBox = document.querySelector('.alertBox');
	const alertText = document.querySelector('.alert-text');
	alertText.innerHTML = err;
	alertBox.style.display= 'unset';
	setTimeout(() => {
		alertBox.style.display = 'none';
	}, 3000)
	
}

export {alertMe};