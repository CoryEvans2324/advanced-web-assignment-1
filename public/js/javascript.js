const shopItems = [
	{
		name: 'Apple Ipad Air (4th gen)',
		description: 'iPad Air does more than a computer in simpler, more magical ways. And now with more features and capabilities, it’s more versatile than ever.',
		image: 'images/tablets/tablet1.webp'
	},
	{
		name: 'Samsung Galaxy TAB A7',
		description: 'With a slim design, a vibrant entertainment system, and outstanding performance, the new A7 is a stylish new companion for your life. Dive head-first into the things you love and easily share your favourite moments. Learn, explore, connect and be inspired.',
		image: 'images/tablets/tablet2.webp'
	},
	{
		name: 'Samsung Galaxy Tab A7 Lite',
		description: 'Enjoy movies and games on a wide 8.7-inch display. Minimized bezels deliver a greater screen-to-body ratio without increasing the tablet size. The comfortably compact form factor helps keep your hands from getting tired, even when you\'ve been playing for hours.',
		image: 'images/tablets/tablet3.webp'
	},
	{
		name: 'Apple Ipad Air (4th gen)',
		description: 'iPad Air does more than a computer in simpler, more magical ways. And now with more features and capabilities, it’s more versatile than ever.',
		image: 'images/tablets/tablet4.webp'
	},
]

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

const loadShopItems = (itemsToShow) => {
	let parentElement = document.querySelector('#shop-search-items')
	parentElement.innerHTML = ''

	var items = itemsToShow || shopItems

	items.forEach(item => {
		let ele = document.createElement('div')
		ele.className = 'flex flex-col items-center w-64'

		let img = document.createElement('img')
		img.src = item.image
		ele.appendChild(img)

		let title = document.createElement('h1')
		title.className = 'text-center'
		title.innerText = item.name
		ele.appendChild(title)

		let desc = document.createElement('p')
		desc.innerText = item.description
		ele.appendChild(desc)

		parentElement.appendChild(ele)
	});
}

const shopSearchOnChange = (input) => {
	let items = shopItems.filter(shopSearchFilterFunc(input.value))
	loadShopItems(items)
}

const shopSearchFilterFunc = (searchTerm) => {
	return (value) => {
		if (value.name.toLowerCase().indexOf(searchTerm) >= 0) return true
		if (value.description.toLowerCase().indexOf(searchTerm) >= 0) return true

		return false
	}
}


const bg_color_change = (color) => {
	document.documentElement.style.backgroundColor = color
}

const doc_font_size_change = (font_size) => {
	document.documentElement.style.fontSize = font_size + 'px'
}