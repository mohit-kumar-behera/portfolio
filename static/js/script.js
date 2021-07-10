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
/* end of about page */


const user = {
	firstName: 'Mohit',
	lastName: 'Kumar',

	aboutMe: 'Nothing ....',

	dob: {
		date: '08',
		month: 'October',
		year: '2000',

		formatDOB() {
			return `${this.month.slice(0, 3)} ${this.date}, ${this.year}`
		}
	},

	address: {
		home: {
			street: 'PLOT NO. - 1583, Udayabhat',
			city: 'Paradeep',
			district: 'Jagatsinghpur',
			PIN: '754142',
			state: 'Odisha',
			country: 'India',
			mapURL : 'https://goo.gl/maps/rfEktawiTEQePXsi6'
		},
		work: {
			street: 'PLOT NO. - 1583, Udayabhat',
			city: 'BBSR',
			district: 'Khorda',
			PIN: '754142',
			state: 'Odisha',
			country: 'India',
			mapURL : 'https://goo.gl/maps/rfEktawiTEQePXsi6'
		}
	},

	contact: {
		phone: ['9861013399'],
		email: ['mahitkumar166@gmail.com']
	},

	languageSpoken: ['English', 'Hindi', 'Odia'],
	
	socialAccounts: [
		{
			name: 'linkedin',
			logo: 'fa-linkedin',
			img: '/static/media/image/linkedin-high.jpg',
			url: 'https://www.linkedin.com/',
		},
		{
			name: 'whatsapp',
			logo: 'fa-whatsapp',
			img: '/static/media/image/whatsapp-high.jpg',
			url: 'https://wa.me/919861013399',			
		},
		{
			name: 'github',
			logo: 'fa-github',
			img: '/static/media/image/github-high.jpg',
			url: 'https://www.github.com/',
		},
		{
			name: 'facebook',
			logo: 'fa-facebook-square',
			img: '/static/media/image/facebook-high.jpg',
			url: 'https://www.facebook.com/',
		},
		{
			name: 'twitter',
			logo: 'fa-twitter',
			img: '/static/media/image/twitter--low.jpg',
			url: 'https://www.twitter.com/',
		},
		{
			name: 'instagram',
			logo: 'fa-instagram',
			img: '/static/media/image/instagram-high.jpg',
			url: 'https://www.instagram.com/',
		}

	],	

	getFullName() {
		return `${this.firstName} ${this.lastName}`;
	},

	getAge() {
		return new Date().getFullYear() - +this.dob.year;
	},

	getAddress(type='home', short=true) {
		type = type.toLowerCase();
		return short ? 
			{
				address: `${this.address[type].city}, ${this.address[type].state}`,
				url: `${this.address[type].mapURL}`
			} : 
			{
				address: `${this.address[type].street}, ${this.address[type].city}, ${this.address[type].district}, PIN-${this.address[type].PIN}, ${this.address[type].state}`,
				url: `${this.address[type].mapURL}`
			}
	},

	getNationality(type='home') {
		return this.address[type.toLowerCase()].country;
	},

	getPIN() {
		return this.address.PIN
	},

	getContact() {
		return [this.contact.phone[0], this.contact.email[0]];
	},

	getPhoneNum() {
		const [phone] = this.getContact();
		return {
			phone,
			url: `tel:${phone}`
		}
	},

	getEmail() {
		const [, email] = this.getContact();
		return {
			email,
			url: `mailto:${email}`
		}
	},

	getLanguageSpoken() {
		return this.languageSpoken;
	},

	getShortBio() {
		const biodata = [
			{
				key: 'First Name',
				value: this.firstName,
			},
			{
				key: 'Last Name',
				value: this.lastName,
			},
			{
				key: 'DOB',
				value: this.dob.formatDOB(),
			},
			{
				key: 'Age',
				value: this.getAge(),
			},
			{
				key: 'Nationality',
				value: this.getNationality(),
			},
			{
				key: 'Address',
				value: this.getAddress(),
			},
			{
				key: 'Phone',
				value: this.getPhoneNum(),
			},
			{
				key: 'Email',
				value: this.getEmail(),
			},
			{
				key: 'Languages',
				value: this.getLanguageSpoken().join(', '),
			},
		];

		return biodata;
	}
}


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
				<button class="bttn color--btn" data-color="#73a528" onclick="handleThemeModelBtn(this)" style="background: #73A528"></button>
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

const activateHomePageScript = function(user) {
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


	const setUsername = function(fullName) {
		const username = fullName.toUpperCase();
		const writerSpeed = 95; // in millisecond
		const screenWidth = document.documentElement.clientWidth || window.screen.width;

		if (screenWidth > 992) typewriter(username, usernameSpan, writerSpeed);
		else usernameSpan.textContent = username;
	};

	setUsername(user.getFullName());
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

	// Build card for social media account
	const buildAccountCard = acc => `				 
			<div class="display-card--div social-link--div lazy-transition--bottom" data-social-handle="${acc.name}">
				<div class="display-card social-link" tabindex="0">
		
					<div class="display-card--img social-link--img">
						<img src="${acc.img}" alt="Mohit's ${acc.name} cover img"/>
					</div>

					<a href="${acc.url}" class="link display-card--link" target="_blank"></a>

					<div class="overlay--div"></div>

					<div class="social-link--logo">
						<span class="fa ${acc.logo} icon"></span>
					</div>
				</div>
			</div>
		`;

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

	// Personal Info Card
	const buildPersonalInfoCard = function(entry) {
		
		// Format the link (address, phone, email)
		const getFormattedLink = (key, val) => `<a href="${val.url}" class="link" target="_blank">${val[key]}</a>`;
		
		return `
			<div class="entity">
		 		<p class="key">${entry.key}</p>
		 		<p class="value">${entry.key.toLowerCase() !== 'address' && entry.key.toLowerCase() !== 'phone' && entry.key.toLowerCase() !== 'email' ? entry.value : getFormattedLink(entry.key.toLowerCase(), entry.value)}</p>
		 	</div>
		`
	}

	// Render personal detail on screen in Personal Info section
	const renderPersonalDetail = function(shortBio) {
		personalInfoContainer.innerHTML = '';

		shortBio.forEach(entry => {
			personalInfoContainer.insertAdjacentHTML('beforeend', buildPersonalInfoCard(entry))
		})
	}
	renderPersonalDetail(user.getShortBio());

}

/*------------------------- End of About us Page -------------------------------------------*/





const loadImg = function(imgElem, imgPath) {
	return new Promise((resolve, reject) => {
		imgElem.src = imgPath;

		imgElem.addEventListener('load', function() {
			resolve(imgElem);
		});

		imgElem.addEventListener('error', function() {
			reject(new Error(`Unable to load Image`));
		})
	})
}

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
		document.querySelector('.loader').remove();
		document.getElementById('main-body').style.display = 'block';
		
		setActivePageNavLink();
		checkActiveTheme();
		const isMobile = detectMobile();
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

		startIntersectionObserver();
	}, 400);
});

