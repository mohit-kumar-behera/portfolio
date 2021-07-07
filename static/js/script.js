'use strict';


const navbar = document.querySelector('.navbar')
const navbarTogglerBtn = document.querySelector('.navbar-toggler');

const overlay = document.querySelector('.overlay');
const model = document.querySelector('.model');
const modelHead = document.querySelector('.model-head');
const modelBody = document.querySelector('.model-body');
const closeModelBtn = document.querySelector('.close-model--btn');

const themePicker = document.querySelector('.theme-picker');
const themePickerModelBtn = document.querySelector('.theme-picker--btn');

const lazyOpacityElem = Array.from(document.querySelectorAll('.lazy-opacity'));
const lazyTransitionLeftElem = Array.from(document.querySelectorAll('.lazy-transition--left'));
const lazyTransitionBottomElem = Array.from(document.querySelectorAll('.lazy-transition--bottom'));
const lazyImgElem = Array.from(document.querySelectorAll('.lazy-img'));


/* home page */
const contentContainer = document.querySelector('.content-container');
const usernameSpan = document.querySelector('.username');
/* end home page */

// Check which page is currently active and set currPage as the current active page
let currPage = '';
const setCurrPage = () => currPage = location.pathname.split('/')[1] || 'home';	

// Add active class to the navlink
const setActivePageNavLink = function() {
	setCurrPage();

	document.querySelector('a.nav-link.active')?.classList.remove('active');
	document.querySelector(`a.nav-link[data-path='${currPage}']`)?.classList.add('active');
}

// Detect if the device is Mobile device or not
const detectMobile = function() {
    const mobileOS = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    return mobileOS.some((os) => {
        return navigator.userAgent.match(os);
    });
};

// Add "mobile-device" class to specified elements
const addMobileDevice__class = elems => elems.forEach(elem => elem?.classList.add('mobile-device'));

const addMobileDevice = isMobile => {
	if (isMobile) {
		const addClassToElems = Array.from(document.querySelectorAll('.check-mobile'));
	 	addMobileDevice__class(addClassToElems);
	}
};


const toggleNavbar = function() {
	/* open close the navbar */
	this.blur();

	if (navbar.classList.contains('open')) navbar.classList.remove('open');
	else navbar.classList.add('open');
}

navbarTogglerBtn.addEventListener('click', toggleNavbar);


const openModel = function() {
	/* Open Model Box */
	overlay.classList.remove('hide');
	model.classList.remove('hide');
}

const closeModel = function() {
	/* Close Model Box */
	overlay.classList.add('hide');
	model.classList.add('hide'); 
}

closeModelBtn.addEventListener('click', closeModel);
overlay.addEventListener('click', closeModel);


themePickerModelBtn.addEventListener('click', function(e) {
	e.preventDefault();
	this.blur();

	modelHead.innerHTML = modelBody.innerHTML = 'loading...';

	const themePickerBodyHTML = `
		<div class="theme-picker from-model">
			<div class="pallete">
				<button class="bttn color--btn" data-color="#913ee8" onclick="handleThemeModelBtn(this)" style="background: #913EE8"></button>
				<button class="bttn color--btn" data-color="#0556f3" onclick="handleThemeModelBtn(this)" style="background: #0556F3"></button>
				<button class="bttn color--btn" data-color="#fa1e0e" onclick="handleThemeModelBtn(this)" style="background: #FA1E0E"></button>
				<button class="bttn color--btn" data-color="#fe4c03" onclick="handleThemeModelBtn(this)" style="background: #fe4c03"></button>
				<button class="bttn color--btn" data-color="#ef5742" onclick="handleThemeModelBtn(this)" style="background: #EF5742"></button>
			</div>
			<div class="pallete">
				<button class="bttn color--btn" data-color="#f97194" onclick="handleThemeModelBtn(this)" style="background: #f97194"></button>
				<button class="bttn color--btn" data-color="#ffae00" onclick="handleThemeModelBtn(this)" style="background: #ffae00"></button>
				<button class="bttn color--btn" data-color="#73A528" onclick="handleThemeModelBtn(this)" style="background: #73A528"></button>
				<button class="bttn color--btn" data-color="#a0522d" onclick="handleThemeModelBtn(this)" style="background: #A0522D"></button>
				<button class="bttn color--btn" data-color="#01937c" onclick="handleThemeModelBtn(this)" style="background: #01937C"></button>
			</div>
		</div>
	` ;

	modelHead.innerHTML = modelBody.innerHTML = '';

	const themePickerHeadHTML = `<h4>Pick Theme</h4>`;

	model.style.width = 'auto';
	modelHead.insertAdjacentHTML('beforeend', themePickerHeadHTML);
	modelBody.insertAdjacentHTML('beforeend', themePickerBodyHTML);
	
	openModel();
});


document.body.addEventListener('keyup', function(e) {
	
	if (e.key === 'Tab') {
		/* open close navbar as per TAB Focus */
		if (document.activeElement.classList.contains('nav-link'))
			navbar.classList.add('open');
		else 
			navbar.classList.remove('open');
	}

});

document.body.addEventListener('keydown', function(e) {

	if (e.key === 'Escape' && !model.classList.contains('hide')) closeModel(); // Close the Model on ESC key press

});



const handleActiveThemeClass = function(activeTheme) {
	/* Add active class to current Theme button */
	document.querySelectorAll('.theme-picker:not(.from-model) .color--btn')?.forEach(btn => btn.classList.remove('active'));
	document.querySelector(`.theme-picker:not(.from-model) .color--btn[data-color='${activeTheme}']`)?.classList.add('active');
}

const setNewTheme = function(color) {
	/* Update the Theme Pattern */
	localStorage.setItem('theme-color', color);
	document.documentElement.style.setProperty('--secondary-color', color);
	currPage === 'home' && handleActiveThemeClass(color);
};

const handleThemePickerBtn = function(e) {
	/* Handle Theme Picker Button to update theme */
	e.target.blur();

	if (e.target.classList.contains('color--btn')) {
		const color = e.target.dataset.color;
		setNewTheme(color);
	}
};
themePicker?.addEventListener('click', handleThemePickerBtn);

const handleThemeModelBtn = function(elem) {
	const color = elem.dataset.color;
	setNewTheme(color);
};

const checkActiveTheme = function() {
	if (localStorage.getItem('theme-color')) {
		setNewTheme(localStorage.getItem('theme-color'));
	}
	else {
		localStorage.setItem('theme-color', '#fa1e0e');
		setNewTheme(localStorage.getItem('theme-color'));
	}
};
checkActiveTheme();

/*-------------- Required only in home page -------------------- */

const typewriter = function(val, elem, speed) {
	/* Creates a typewriter Effect */
	if (typeof val === 'string') {
		const valArr = [...val];
		let i = 0;

		const tick = function() {
			if (i < valArr.length)	elem.textContent += valArr[i++];
			else clearInterval(tick);
		};
		setInterval(tick, speed);

	} else {
		elem.innerHTML = `<span style='font-size: 0.7rem; background: red; color: white'>Error: Wrong input</span>`;
	}
};

const setUsername = function() {
	const username = "MOHIT KUMAR".toUpperCase();
	const writerSpeed = 95; // in millisecond
	const screenWidth = document.documentElement.clientWidth || window.screen.width;

	if (screenWidth > 992) typewriter(username, usernameSpan, writerSpeed);
	else usernameSpan.textContent = username;
};

/* -------------- End home paage --------------------- */


const startIntersectionObserver = function() {
	
	const handleLazyOpacity = function(entries) {
		const [entry] = entries;

		if (!entry.isIntersecting) return;

		const elem = entry.target;

		elem.classList.remove('lazy-opacity');
		lazyOpacityObserver.unobserve(elem);
	}

	const handleLazyTransitionLeft = function(entries) {
		const [entry] = entries;

		if (!entry.isIntersecting) return;

		const elem = entry.target;

		elem.classList.remove('lazy-transition--left');
		lazyTransitionLeftObserver.unobserve(elem);
	}

	const handleLazyTransitionBottom = function(entries) {
		// const [entry] = entries;

		entries.forEach(function(entry) {
			if (!entry.isIntersecting) return;

			const elem = entry.target;

			elem.classList.remove('lazy-transition--bottom');
			lazyTransitionBottomObserver.unobserve(elem);
		});
	}

	const handleLazyImg = function(entries) {
		const [entry] = entries;

		if (!entry.isIntersecting) return;

		const elem = entry.target;

		elem.src = elem.dataset.src;
		elem.addEventListener('load', () => elem.classList.remove('lazy-img'));
		lazyImgObserver.unobserve(elem)
	}
	
	const lazyOpacityOption = {
		root: null,
		threshold: 0.25
	};

	const lazyTransitionOption = {
		root: null,
		threshold: 0.2
	}

	const lazyImgOption = {
		root: null,
		threshold: 0.1
	}

	const lazyOpacityObserver = new IntersectionObserver(handleLazyOpacity, lazyOpacityOption);
	lazyOpacityElem.forEach(elem => lazyOpacityObserver.observe(elem));

	const lazyTransitionLeftObserver = new IntersectionObserver(handleLazyTransitionLeft, lazyTransitionOption);
	lazyTransitionLeftElem.forEach(elem => lazyTransitionLeftObserver.observe(elem));

	const lazyTransitionBottomObserver = new IntersectionObserver(handleLazyTransitionBottom, lazyTransitionOption);
	lazyTransitionBottomElem.forEach(elem => lazyTransitionBottomObserver.observe(elem));

	const lazyImgObserver = new IntersectionObserver(handleLazyImg, lazyImgOption);
	lazyImgElem.forEach(elem => lazyImgObserver.observe(elem));
}


window.addEventListener('load', function() {
	setTimeout(function() {
		document.querySelector('.loader').remove();
		document.getElementById('main-body').style.display = 'block';
		
		setActivePageNavLink();
		checkActiveTheme();
		const isMobile = detectMobile();
		addMobileDevice(isMobile);

		(currPage === 'home') && setUsername();
		startIntersectionObserver();
	}, 400);
});


/*
gloabal variable
isLoad = false
on window load set is to true

*/