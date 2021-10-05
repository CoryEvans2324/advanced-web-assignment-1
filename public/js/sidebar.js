function closeNav() {
	document.querySelector('#sidebar').classList.add('-right-64')
	document.querySelector('#sidebar').classList.remove('right-0')
}

function openNav() {
	document.querySelector('#sidebar').classList.remove('-right-64')
	document.querySelector('#sidebar').classList.add('right-0')
}