'use strict';

import detectMobile from '../js/modules/Mobile.js';
import user from '../js/modules/MohitInfo.js';
import {loadImg, createImg} from '../js/modules/LoadCreateImg.js';
import typewriter from '../js/modules/Typewriter.js';
import {buildThemePickerModelBody,
		buildAccountCard, 
		buildPersonalInfoCard,
	    buildEducationTimeline,
	    buildSkillBar,
	    buildExperienceCard,
		buildAwardCard} from '../js/modules/Build.js'; 

const navbar = document.querySelector('.navbar')
const navbarTogglerBtn = document.querySelector('.navbar-toggler');

const overlay = document.querySelector('.overlay');
const model = document.querySelector('.model');
const modelHead = document.querySelector('.model-head');
const modelBody = document.querySelector('.model-body');
const closeModelBtn = document.querySelector('.close-model--btn');

const themePicker = document.querySelector('.theme-picker');
const themePickerModelBtn = document.querySelector('.theme-picker--btn');


/* home page */
const contentContainer = document.querySelector('.content-container');
const usernameSpan = document.querySelector('.username');
/* end of home page */


/* contact page */
const contactForm = document.getElementById('contact-form');
const userInputFields = document.querySelectorAll('.user-input');
const sendMssgBtn = document.querySelector('.send-message--btn');
const socialAccountContainer = document.querySelector('.social-link--wrapper');
/* end of contact page */


/* about page */
const personalInfoContainer = document.querySelector('.about-me--content');
const aboutEducationContainer = document.querySelector('.about-education--content');
const aboutSkillsContainer = document.querySelector('.about-skills--content');
const aboutExperienceContainer = document.querySelector('.about-experience--content');
const aboutAwardsContainer = document.querySelector('.about-awards--content');
/* end of about page */


let currPage, isMobile;
const init = () => {
	let currPage = '';
	let isMobile = '';
}





// class User {
	// 	url = '/fetch-mohit/';
	// 	firstName;
		
	// 	constructor() {
	// 		console.log(this)
	// 		this._fetchMohitData(this.url);
	// 			// .then(res => {
	// 			// 	this.firstName = res.firstName;
	// 			// 	this.lastName = res.lastName;
	// 			// 	this.contact = res.contact;
	// 			// });
	// 		console.log(this)
	// 	}

	// 	// _fetchMohitData(url) {
	// 	// 	fetch(url)
	// 	// 		.then(response => response.json())
	// 	// 		.then(data => {
	// 	// 			this.firstName = data.firstName;
	// 	// 			this.lastName = data.lastName;
	// 	// 			this.contact = data.contact;
	// 	// 		});
	// 	// }

	// 	_set(data) {
	// 		console.log(this)
	// 		this.firstName = data.firstName;
	// 		this.lastName = data.lastName;
	// 		this.contact = data.contact;
	// 		console.log(this.firstName);

	// 		console.log(this.getFullName(data));
	// 	}

	// 	async _fetchMohitData(url) {
	// 		try {
	// 			const response = await fetch(url);
	// 			if (!response.ok) throw new Error('Something went wrong')
	// 			const data = await response.json();
	// 			this.firstName = data.firstName;
	// 			this.lastName = data.lastName;
	// 			this.contact = data.contact;
	// 			this._set(data)
	// 			return data;
	// 		} catch (err) {
	// 			console.log(err);
	// 		}
	// 	}

	// 	getFullName(obj) {
	// 		return `${obj.firstName} ${obj.lastName}`;
	// 	}

	// 	getContact(obj, type) {
	// 		return this.contact[type];
	// 	}
	// }

	// // const userObj = async function() {
	// // 	const user_1 = await new User();
	// // 	// console.log(user_1.getFullName())
	// // 	const mohit = await user_1.getFullName();
	// // 	// console.log(mohit);
	// // }
	// // userObj();
	// const user_1 = new User();
	// user_1._fetchMohitData(user_1.url)
	// 	.then(res => res)
	// 	.then(data => {

	// 		let m = user_1.getContact(data, 'phone');
	// 		console.log(m)
	// 	});
	// console.log("here: ", user_1)



	// const user_2 = new User();
	// user_2.getUserObj()
	// 	.then(res => res)
	// 	.then(data => {
	// 		console.log(data.getFullName());
	// 	})


	// console.log(user_1.firstName);

	// const url = '/fetch-mohit/';

	// fetch(url)
	// 	.then(res => res.json())
// 	.then(data => console.log(data));







// Check which page is currently active and set currPage as the current active page
const setCurrPage = () => currPage = location.pathname.split('/')[1] || 'home';	

// Add active class to the navlink
const setActivePageNavLink = function() {
	setCurrPage();
	document.querySelector('a.nav-link.active')?.classList.remove('active');
	document.querySelector(`a.nav-link[data-path='${currPage}']`)?.classList.add('active');
}


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
	const elem = e.target;
	elem.blur();

	if (elem.classList.contains('color--btn')) {
		const color = elem.dataset.color;
		setNewTheme(color);
	}
};
themePicker?.addEventListener('click', handleThemePickerBtn);


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


// Handle Theme Picker Button from Model
themePickerModelBtn.addEventListener('click', function(e) {
	e.preventDefault();
	this.blur();

	modelHead.innerHTML = modelBody.innerHTML = 'loading...';

	const themePickerBodyHTML = buildThemePickerModelBody();

	modelHead.innerHTML = modelBody.innerHTML = '';

	const themePickerHeadHTML = `<h4>Pick Theme</h4>`;

	model.style.width = 'auto';
	modelHead.insertAdjacentHTML('beforeend', themePickerHeadHTML);
	modelBody.insertAdjacentHTML('beforeend', themePickerBodyHTML);
	
	document
		.querySelector('.theme-picker.from-model')
		.addEventListener('click', e => handleThemePickerBtn(e));

	openModel();
});




/*-------------- Required only in home page -------------------- */


const activateHomePageScript = function(user) {

	const setUsername = function(fullName) {
		const username = fullName.toUpperCase();
		const writerSpeed = 115; // in millisecond
		const screenWidth = document.documentElement.clientWidth || window.screen.width;

		(screenWidth <= 992) ? 
			usernameSpan.textContent = username : 
			setTimeout(function(){
				typewriter(username, usernameSpan, writerSpeed);
			}, 250);
	};

	// setUsername(user.getFullName());



	// class App {
		// 	constructor() {
		// 		this._fetchInfo();
		// 	}

		// 	async _fetchInfo() {

		// 		try {
		// 			const res = await fetch('/fetch-mohit/');
		// 			if (!res.ok) throw new Error('Unable to Load Data');

		// 			const data = await res.json();
		// 			this._loadMohitData(data);

		// 		} catch (err) {
		// 			console.log(err);
		// 		} finally {
		// 			return this;
		// 		}

		// 	}

		// 	_getContact(contact, type) {
		// 		return contact[type];
		// 	}

		// 	_loadMohitData(data) {
		// 		this.firstName = data.firstName;
		// 		this.lastName = data.lastName;
		// 		this.phone = this._getContact(data.contact, 'phone');

		// 		document.getElementById('detail').innerHTML = `${this.firstName}, ${this.lastName}, ${this.phone}`;
		// 	}
		// }

	// const app = new App();


};


/*--------------- End of home page ----------------------*/



/*------------------ Required only in Contact page ----------------------------*/

const activateContactPageScript = function(user) {

	// Email Validation
	const validateEmail = (regex, val) => regex.test(val);

	// Input fields validation
	const validateInputFields = function() {
		const inputFields = [...userInputFields];
		const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		let valid = false;

		// It counts the number of fields that are in valid range mentioned respectively
		const inRangeFieldsCount = inputFields
						.filter(field => field.value.length >= field.dataset.minlength && field.value.length <= field.dataset.maxlength)
						.reduce((count, elem) => count + 1, 0);

		valid = (inRangeFieldsCount === inputFields.length) ? true : false;

		const emailField = inputFields.find(field => field.type === 'email');
		
		return emailField && valid && validateEmail(emailRegex, emailField.value);
	};

	// Handle Click Event on Send Meesage button
	sendMssgBtn?.addEventListener('click', function() {
		this.blur();
		this.innerHTML = '<span>SEND MESSAGE</span><div class="spinner-border spinner-border-sm text-light ml-1"></div>';
		const isValid = validateInputFields();

		const {left, top} = contactForm.parentElement.getBoundingClientRect();

		contactForm.parentElement.scrollIntoView({behavior: 'smooth'}) || window.scrollTo({
			left: left + window.pageXOffset,
			top: top + window.pageYOffset,
			behavior: 'smooth'
		})

		setTimeout(function(){
			isValid ?  contactForm.submit() : document.querySelectorAll('.help-text').forEach(elem => elem.style.display = 'block');
			this.innerHTML = '<span>SEND MESSAGE</span>';
		}.bind(this), 400);
	});

	// Render the data in form of card to screen
	const renderSocialAccounts = function(socialAccounts) {
		socialAccountContainer.innerHTML = '';

		socialAccounts.forEach(acc => {
			socialAccountContainer.insertAdjacentHTML('beforeend', buildAccountCard(acc));
		});

	};
	renderSocialAccounts(user.socialAccounts);

};

/*------------------ End of Contact page ----------------------------*/




/*------------------------- Required only in About us Page ----------------------------------------*/

const activateAboutPageScript = function(user) {

	// Render personal detail on screen in Personal Info section
	const renderPersonalDetail = function(shortBio) {
		personalInfoContainer.innerHTML = '';

		shortBio.forEach(entry => {
			personalInfoContainer.insertAdjacentHTML('beforeend', buildPersonalInfoCard(entry))
		})
	}
	renderPersonalDetail(user.getShortBio());

	const renderContentDynamically = function(user, elem, type, classes, build) {
		const mainType = user.knowledge[type];
		const phases = mainType.phase;

		let html_div = document.createElement('div');
		html_div.classList = classes.join(' ');

		let html_content = '';

		phases.forEach(phase => {
			html_content += build(mainType.getDetail(phase));
		});

		html_div.innerHTML = html_content;

		elem.innerHTML = '';
		elem.append(html_div);
	};

	const options = [
		{
			type: 'education',
			elem: aboutEducationContainer,
			classes: ['timeline'],
			build: buildEducationTimeline
		},
		{
			type: 'experience',
			elem: aboutExperienceContainer,
			classes: ['row'],
			build: buildExperienceCard
		},
		{
			type: 'awards',
			elem: aboutAwardsContainer,
			classes: ['display-card--wrapper', 'check-mobile', `${isMobile && 'mobile-device'}`],
			build: buildAwardCard
		},
		{
			type: 'skills',
			elem: aboutSkillsContainer,
			classes: ['row', 'm-0'],
			build: buildSkillBar
		},
	];

	options.forEach(entry => renderContentDynamically(user, entry.elem, entry.type, entry.classes, entry.build));

}

/*------------------------- End of About us Page -------------------------------------------*/




const startIntersectionObserver = function() {

	const lazyOpacityElem = Array.from(document.querySelectorAll('.lazy-opacity'));
	const lazyTransitionLeftElem = Array.from(document.querySelectorAll('.lazy-transition--left'));
	const lazyTransitionBottomElem = Array.from(document.querySelectorAll('.lazy-transition--bottom'));
	const lazyImgElem = Array.from(document.querySelectorAll('.lazy-img'));

	
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

	const handleLazyImg = async function(entries) {
		const [entry] = entries;

		if (!entry.isIntersecting) return;

		const elem = entry.target;

		try {
		
			const loadedImg = await loadImg(elem, elem.dataset.src);
			loadedImg.classList.remove('lazy-img');
		
		} catch (err) {
			
			elem.classList.remove('lazy-img')
			elem.setAttribute('alt', 'Unable to Load Mohit Kumar Photo');
			console.error(err);

		} 

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
		// document.querySelector('.loader').remove();
		// document.getElementById('main-body').style.display = 'block';
		
		init();
		setActivePageNavLink();
		checkActiveTheme();
		isMobile = detectMobile();
		addMobileDevice(isMobile);

		switch (currPage) {
			case 'home':
				activateHomePageScript(user);
				break;
			case 'contact':
				activateContactPageScript(user);
				break;
			case 'about':
				activateAboutPageScript(user);
				break;
		}
		
		document.querySelector('.loader').remove();
		document.getElementById('main-body').style.display = 'block';
		
		startIntersectionObserver();
	}, 400);
});


/*

https://stackoverflow.com/questions/7165656/passing-objects-from-django-to-javascript-dom

*/