const ids = [
	'demo1',
	'demo2',
	'demo3',
	'demo4',
]
const hideAllPages = () => {
	for (id of ids) {
		document.querySelector(`#${id}`).style.display = 'none'
		document.querySelector(`#${id}-btn`).classList.remove('bg-yellow-500')
	}
}
const viewPage = (id) => {
	hideAllPages()
	document.querySelector(`#${id}`).style.display = 'block'
	document.querySelector(`#${id}-btn`).classList.add('bg-yellow-500')
}

const spacing = 12
const maxRight = (4 - 1) * spacing
var current = 0


const slideShowLeft = () => {
	if (current == 0) {return}
	current -= spacing
	setLeftRight()
}
const slideShowRight = () => {
	if (current == maxRight) {
		return
	}
	current += spacing

	setLeftRight()
}

const setLeftRight = () => {
	document.querySelector('#slideshow').style.left = `-${current}rem`
	document.querySelector('#slideshow').style.right = `${current}rem`
	
}