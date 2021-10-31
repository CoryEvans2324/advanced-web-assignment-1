function closeNav() {
	document.querySelector('#sidebar').classList.add('-right-64')
	document.querySelector('#sidebar').classList.remove('right-0')
}

function openNav() {
	document.querySelector('#sidebar').classList.remove('-right-64')
	document.querySelector('#sidebar').classList.add('right-0')
}

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
		document.querySelector(`#${id}-btn`).classList.add('bg-white')
	}
}
const viewPage = (id) => {
	hideAllPages()
	document.querySelector(`#${id}`).style.display = 'block'
	document.querySelector(`#${id}-btn`).classList.add('bg-yellow-500')
	document.querySelector(`#${id}-btn`).classList.remove('bg-white')
}

const spacing = 12
const maxRight = 3
var current = 0
var lastSlideShowTime = 0
const slideShowInterval = 4000

if (window.location.pathname.indexOf('/javascript') == 0) {
	// slideshow only needs to run on javascript page
	setInterval(() => {
		let now = new Date().getTime()
		if (now - lastSlideShowTime > slideShowInterval) {
			slideShowRight()
			lastSlideShowTime = now
		}
	}, 1000);
}

const setTitleAndDescription = (i) => {
	i = i || 0

	// title
	document.getElementById('slideshow-title').innerText = shopItems[i].name
	// desc
	document.getElementById('slideshow-desc').innerText = shopItems[i].description
}

const slideShowLeft = (e) => {
	if (!e) {
		lastSlideShowTime = new Date().getTime() + slideShowInterval
	}
	if (current == 0) {
		current = maxRight
	} else {
		current -= 1
	}

	setLeftRight()
}
const slideShowRight = (e) => {
	if (!e) {
		lastSlideShowTime = new Date().getTime() + slideShowInterval
	}
	if (current == maxRight) {
		current = 0
	} else {
		current += 1
	}

	setLeftRight()
}

const setLeftRight = () => {
	setTitleAndDescription(current)
	let offset = current * (spacing)
	document.querySelector('#slideshow').style.left = `-${offset}rem`
	document.querySelector('#slideshow').style.right = `${offset}rem`
}

const loadShopItems = (itemsToShow) => {
	let parentElement = document.querySelector('#shop-search-items')
	parentElement.innerHTML = ''

	var items = itemsToShow || shopItems

	items.forEach(item => {
		let ele = document.createElement('div')
		ele.className = 'flex flex-col items-center w-64 mx-auto'

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

const loadSlideShow = () => {
	shopItems.forEach(item => {
		let ele = document.createElement('img')
		ele.className = 'block w-48 h-48 px-2'
		ele.src = item.image

		document.querySelector('#slideshow').appendChild(ele)
	})

	setTitleAndDescription(0)
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
	document.body.style.backgroundColor = color
}

const doc_font_size_change = (font_size) => {
	document.documentElement.style.fontSize = font_size + 'px'
}


// USER ACCOUNTS
const allAccounts = [{
	user: 'admin',
	pass: '1234'
}]

const currentUserLocalStorageKey = 'currentUser'

const setUser = (u) => {
	window.localStorage.setItem(currentUserLocalStorageKey, JSON.stringify(u))
}

const getUser = () => {
	window.localStorage.getItem(currentUserLocalStorageKey)
}

const login = (username, password) => {
	let userList = allAccounts.filter(obj => obj.user === username)
	if (userList.length == 0) {
		alert(`No user with username ${username} found.`)
		return false
	}

	let user = userList[0]
	if (user.pass !== password) {
		alert(`Sign in failed. Password incorrect.`)
		return false
	}

	setUser(user)
	alert(`Signed in as ${user.user}`)

	return true
}

const logout = () => {
	setUser(null)
}

function onSignInFormSubmit(event, username_id, password_id) {
	event.preventDefault()

	let username = document.querySelector(username_id).value
	let password = document.querySelector(password_id).value
	var res = login(username, password)
}


var formResponses = []

function onHTMLFormSubmit(event) {
	event.preventDefault()
	
	var fd = new FormData(event.target)
	var formData = {}
	for (const entry of fd.entries()) {
		formData[entry[0]] = entry[1]
	}

	formResponses.push(formData)
	console.log('Form Responses:', formResponses)
}