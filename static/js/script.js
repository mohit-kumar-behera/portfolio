'use strict';

import navbarView from './views/navbarView.js';
import * as func from './helper.js';
import user from '../js/modules/MohitInfo.js';
import { loadImg, createImg } from '../js/modules/LoadCreateImg.js';
import {
  buildThemePickerModelBody,
  buildAccountCard,
  buildPersonalInfoCard,
  buildEducationTimeline,
  buildSkillBar,
  buildExperienceCard,
  buildAwardCard,
} from '../js/modules/Build.js';

/* ------------------- Required in All Pages ------------------------- */

class Model {
  _overlay;
  _model;
  _dataHead;
  _dataBody;

  constructor(model, overlay) {
    this._model = model;
    this._overlay = overlay;

    this._overlay.addEventListener(
      'click',
      function (e) {
        const closeEl =
          e.target.closest('.close-model--btn') || e.target.closest('.overlay');
        if (!closeEl) return;
        this.close();
      }.bind(this)
    );

    document.body.addEventListener(
      'keydown',
      function (e) {
        // Close the Model on ESC key press
        if (e.key === 'Escape' && !this._model.classList.contains('hide'))
          this.close();
      }.bind(this)
    );
  }

  _clear() {
    this._model.innerHTML = '';
  }

  renderSpinner() {
    this._clear();
    this._model.innerHTML = `
      <div class="d-flex flex-column">
        <div class="d-flex mx-auto">
          <div class="box one"></div>
          <div class="box two"></div>
        </div>
        <div class="d-flex mx-auto">
          <div class="box three"></div>
          <div class="box four"></div>
        </div>
      </div>
    `;
    return this;
  }

  open() {
    /* Open Model window */
    this._overlay.classList.remove('hide');
    this._model.classList.remove('hide');
    return this;
  }

  close() {
    /* Close Model window */
    this._overlay.classList.add('hide');
    this._model.classList.add('hide');
    return this;
  }

  customize(width, height, background = 'var(--light-shade1)') {
    if (width) this._model.style.width = width;
    if (height) this._model.style.height = height;
    this._model.style.background = background;
    return this;
  }

  render(dataBody, dataHead) {
    this._dataBody = dataBody;
    this._dataHead = dataHead || undefined;
    const markup = this._generateMarkup();
    this._clear();
    this._model.insertAdjacentHTML('afterbegin', markup);
    return this;
  }

  _attachHead() {
    return `
      <div class="model-head">${this._dataHead}</div>
    `;
  }

  _generateMarkup() {
    return `
      ${this._dataHead ? this._attachHead() : ''}
      <div class="model-body">${this._dataBody}</div>
    `;
  }
}

const activateDefaultPageScript = function (currPage, modelCl) {
  const overlay = document.querySelector('.overlay');
  const normalModelView = document.querySelector('.normal-model-view');
  const imgModelView = document.querySelector('.img-model-view');

  const themePicker = document.querySelector('.theme-picker');
  const themePickerModelBtn = document.querySelector('.theme-picker--btn');

  const handleThemePickerBtn = function (e) {
    /* Handle Theme Picker Button to update theme */
    const elem = e.target.closest('.color--btn');
    if (!elem) return;

    elem.blur();

    const color = elem.dataset.color;
    func.setTheme(color, currPage);
  };
  themePicker?.addEventListener('click', handleThemePickerBtn);

  // Handle Theme Picker Button from Model
  themePickerModelBtn.addEventListener('click', function (e) {
    e.preventDefault();
    this.blur();

    const params = {
      model: document.querySelector('#normal-model.model'),
      overlay,
      width: 'auto',
      height: 'auto',
    };
    modelCl = new Model(params.model, params.overlay);
    modelCl.customize(params.width, params.height).renderSpinner().open();

    const headEl = '<h4>Pick Theme</h4>';
    const bodyEl = buildThemePickerModelBody();
    modelCl.render(bodyEl, headEl);
    document
      .querySelector('.theme-picker.from-model')
      .addEventListener('click', e => handleThemePickerBtn(e));
  });

  // Handle Model view when images are clicked for viewing
  imgModelView?.addEventListener('click', function (e) {
    const card = e.target.closest('.display-card--div');
    if (!card) return;

    const imgPath = card.dataset.imgSrc;
    const params = {
      model: document.querySelector('#img-model.model'),
      overlay,
      width: '90%',
      height: '75vh',
      background: 'transparent',
    };
    modelCl = new Model(params.model, params.overlay);
    modelCl
      .customize(params.width, params.height, params.background)
      .renderSpinner()
      .open();

    const dataBody = `
      <div class="img--div">
        <img src="${imgPath}" class="view-img" alt=""/>
      </div>
    `;
    modelCl.render(dataBody);
  });

  // Handle Model view when experience section is clicked for viewing
  normalModelView?.addEventListener('click', function (e) {
    const cardLink = e.target.closest('.experience--company .link');
    if (cardLink) return;

    const card = e.target.closest('.info-card');
    if (!card) return;

    const cardId = card.dataset.id;
    const params = {
      model: document.querySelector('#normal-model.model'),
      overlay,
    };
    modelCl = new Model(params.model, params.overlay);
    modelCl.customize().renderSpinner().open();

    const dataHead = `<h4>Internship Detail</h4>`;
    const dataBody = `
        <div class="experience-description">
          <p><strong>Lorem ipsum dolor</strong> sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet tellus cras adipiscing. Iaculis urna id volutpat lacus laoreet. Tincidunt vitae semper quis lectus nulla. Posuere it amet consectetur adipiscing elit. Semper auctor neque vitae tempus quam pellentesque nec.</p>

          <p>Morbi tincidunt augue interdum velit euismod in pellentesque massa placerat. Feugiat scelerisque varius morbi enim nunc faucibus a. Auctor augue mauris augue neque. Congue nisi vitae suscipit tellus mauris a. <a href="https://something.com" class="link">Commodo elit at imperdiet dui</a>. Maecenas volutpat blandit aliquam etiam erat velit scelerisque in den.</p>

          <ul>
            <li>modify or copy the materials;</li>
            <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
          </ul>

          <p class="note">
            <strong>NOTE:</strong>
            <ol>
              <li>modify or copy the materials;</li>
              <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
              <li>attempt to decompile or reverse engineer any software contained on <a href="#" class="link">ALINETER LIFESTYLE</a> INDUSTRY PRIVATE LIMITED&#39;s website;</li>
            </ol>
          </p>
          
        </div>
      `;
    modelCl.render(dataBody, dataHead);
  });
};

/* ---------------------- End of Default Page Script ----------------------- */

/*------------------ Required only in Contact page ----------------------------*/

const activateContactPageScript = function (user) {
  // Contact Page DOM Selector
  const contactForm = document.getElementById('contact-form');
  const userInputFields = document.querySelectorAll('.user-input');
  const sendMssgBtn = document.querySelector('.send-message--btn');
  const socialAccountContainer = document.querySelector(
    '.social-link--wrapper'
  );

  // Email Validation
  const validateEmail = (regex, val) => regex.test(val);

  // Input fields validation
  const validateInputFields = function () {
    const inputFields = [...userInputFields];
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,})*$/;
    let valid = false;

    // It counts the number of fields that are in valid range mentioned respectively
    const inRangeFieldsCount = inputFields
      .filter(
        field =>
          field.value.length >= field.dataset.minlength &&
          field.value.length <= field.dataset.maxlength
      )
      .reduce(count => count + 1, 0);

    valid = inRangeFieldsCount === inputFields.length;
    const emailField = inputFields.find(field => field.type === 'email');

    return emailField && valid && validateEmail(emailRegex, emailField.value);
  };

  // Handle Click Event on Send Meesage button
  sendMssgBtn?.addEventListener('click', function () {
    this.blur();
    this.innerHTML =
      '<span>SEND MESSAGE</span><div class="spinner-border spinner-border-sm text-light ml-1"></div>';
    const isValid = validateInputFields();

    const { left, top } = contactForm.parentElement.getBoundingClientRect();

    contactForm.parentElement.scrollIntoView({ behavior: 'smooth' }) ||
      window.scrollTo({
        left: left + window.pageXOffset,
        top: top + window.pageYOffset,
        behavior: 'smooth',
      });

    setTimeout(
      function () {
        isValid
          ? contactForm.submit()
          : document
              .querySelectorAll('.help-text')
              .forEach(elem => (elem.style.display = 'block'));
        this.innerHTML = '<span>SEND MESSAGE</span>';
      }.bind(this),
      400
    );
  });

  // Render the data in form of card to screen
  const renderSocialAccounts = function (socialAccounts) {
    if (!socialAccountContainer) return;
    socialAccountContainer.innerHTML = '';

    socialAccounts.forEach(acc => {
      socialAccountContainer.insertAdjacentHTML(
        'beforeend',
        buildAccountCard(acc)
      );
    });
  };
  setTimeout(function () {
    renderSocialAccounts(user.socialAccounts);
  }, 2000);
};

/*------------------ End of Contact page ----------------------------*/

/*------------------------- Required only in About us Page ----------------------------------------*/

const activateAboutPageScript = function (user) {
  // About Page DOM Selector
  const personalInfoContainer = document.querySelector('.about-me--content');
  const aboutEducationContainer = document.querySelector(
    '.about-education--content'
  );
  const aboutSkillsContainer = document.querySelector('.about-skills--content');
  const aboutExperienceContainer = document.querySelector(
    '.about-experience--content'
  );
  const aboutAwardsContainer = document.querySelector('.about-awards--content');

  // Render personal detail on screen in Personal Info section
  const renderPersonalDetail = function (shortBio) {
    if (!personalInfoContainer) return;
    personalInfoContainer.innerHTML = '';

    shortBio.forEach(entry => {
      personalInfoContainer.insertAdjacentHTML(
        'beforeend',
        buildPersonalInfoCard(entry)
      );
    });
  };
  setTimeout(function () {
    renderPersonalDetail(user.getShortBio());
  }, 2000);

  const renderContentDynamically = function (user, elem, type, classes, build) {
    if (!elem) return;

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
      build: buildEducationTimeline,
    },
    {
      type: 'experience',
      elem: aboutExperienceContainer,
      classes: ['row'],
      build: buildExperienceCard,
    },
    {
      type: 'awards',
      elem: aboutAwardsContainer,
      classes: ['display-card--wrapper'],
      build: buildAwardCard,
    },
    {
      type: 'skills',
      elem: aboutSkillsContainer,
      classes: ['row', 'm-0'],
      build: buildSkillBar,
    },
  ];

  setTimeout(function () {
    options.forEach(entry =>
      renderContentDynamically(
        user,
        entry.elem,
        entry.type,
        entry.classes,
        entry.build
      )
    );
  }, 2000);
};

/*------------------------- End of About us Page -------------------------------------------*/

/*------------------------- Project Page -------------------------------------------*/
// Handle click event to open model
const activateProjectPageScript = function (user) {};
/*------------------------- End of Project Page -------------------------------------------*/

const startIntersectionObserver = function () {
  const lazyOpacityElem = Array.from(
    document.querySelectorAll('.lazy-opacity')
  );
  const lazyTransitionLeftElem = Array.from(
    document.querySelectorAll('.lazy-transition--left')
  );
  const lazyTransitionBottomElem = Array.from(
    document.querySelectorAll('.lazy-transition--bottom')
  );
  const lazyImgElem = Array.from(document.querySelectorAll('.lazy-img'));

  const handleLazyOpacity = function (entries) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    const elem = entry.target;

    elem.classList.remove('lazy-opacity');
    lazyOpacityObserver.unobserve(elem);
  };

  const handleLazyTransitionLeft = function (entries) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    const elem = entry.target;

    elem.classList.remove('lazy-transition--left');
    lazyTransitionLeftObserver.unobserve(elem);
  };

  const handleLazyTransitionBottom = function (entries) {
    // const [entry] = entries;
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;

      const elem = entry.target;

      elem.classList.remove('lazy-transition--bottom');
      lazyTransitionBottomObserver.unobserve(elem);
    });
  };

  const handleLazyImg = async function (entries) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    const elem = entry.target;

    try {
      const loadedImg = await loadImg(elem, elem.dataset.src);
      loadedImg.classList.remove('lazy-img');
    } catch (err) {
      elem.classList.remove('lazy-img');
      elem.setAttribute('alt', 'Unable to Load Mohit Kumar Photo');
      console.error(err);
    }

    lazyImgObserver.unobserve(elem);
  };

  const lazyOpacityOption = {
    root: null,
    threshold: 0.25,
  };

  const lazyTransitionOption = {
    root: null,
    threshold: 0.2,
  };

  const lazyImgOption = {
    root: null,
    threshold: 0.1,
  };

  const lazyOpacityObserver = new IntersectionObserver(
    handleLazyOpacity,
    lazyOpacityOption
  );
  lazyOpacityElem.forEach(elem => lazyOpacityObserver.observe(elem));

  const lazyTransitionLeftObserver = new IntersectionObserver(
    handleLazyTransitionLeft,
    lazyTransitionOption
  );
  lazyTransitionLeftElem.forEach(elem =>
    lazyTransitionLeftObserver.observe(elem)
  );

  const lazyTransitionBottomObserver = new IntersectionObserver(
    handleLazyTransitionBottom,
    lazyTransitionOption
  );
  lazyTransitionBottomElem.forEach(elem =>
    lazyTransitionBottomObserver.observe(elem)
  );

  const lazyImgObserver = new IntersectionObserver(
    handleLazyImg,
    lazyImgOption
  );
  lazyImgElem.forEach(elem => lazyImgObserver.observe(elem));
};

/* -------------------------------------------------------------------------------------------------- */

class App {
  _currPage;
  _isMobile;
  _modelCl;
  _loaderEl = document.querySelector('.loader');
  _mainBodyEl = document.getElementById('main-body');

  constructor() {
    this._initialize();
    this._setCurrPage();
    this._setMobileDevice();
    this._setPageTheme();
  }

  _initialize() {
    this._currPage = '';
    this._isMobile = '';
    this._modelCl = null;
  }

  _setCurrPage() {
    this._currPage = location.pathname.split('/')[1] || 'home';
  }

  _setMobileDevice() {
    func
      .detectMobile()
      .then(res => {
        this._isMobile = res.mobileDevice;
      })
      .catch(_ => {
        this._isMobile = false;
      })
      .finally(() => {
        this._addMobileAttribute();
      });
  }

  _setPageTheme() {
    if (!this._currPageTheme) localStorage.setItem('theme-color', '#fa1e0e');
    func.setTheme(this._currPageTheme, this._currPage);
  }

  _addMobileAttribute() {
    document.body.setAttribute('data-mobile-device', this._isMobile);
  }

  get _currPageTheme() {
    return localStorage.getItem('theme-color');
  }

  init() {
    navbarView.setActivePageNavLink(this._currPage);
    navbarView.addHandlerTogglerBtn();
    navbarView.addHandlerTabPress();

    activateDefaultPageScript(this._currPage, this._modelCl);

    switch (this._currPage) {
      case 'contact':
        activateContactPageScript(user);
        break;
      case 'about':
        activateAboutPageScript(user);
        break;
      case 'project':
        activateProjectPageScript(user);
        break;
    }

    startIntersectionObserver();

    window.addEventListener(
      'load',
      function () {
        this._loaderEl.remove();
        this._mainBodyEl.style.display = 'block';
      }.bind(this)
    );
  }
}
const app = new App();
app.init();

// Common DOM Selector for all Pages
// const navbar = document.querySelector('.navbar');
// const navbarTogglerBtn = document.querySelector('.navbar-toggler');

// const overlay = document.querySelector('.overlay');
// const normalModelView = document.querySelector('.normal-model-view');
// const imgModelView = document.querySelector('.img-model-view');

// const themePicker = document.querySelector('.theme-picker');
// const themePickerModelBtn = document.querySelector('.theme-picker--btn');

/* home page */
// const contentContainer = document.querySelector('.content-container');
// const usernameSpan = document.querySelector('.username');
/* end of home page */

/* contact page */
// const contactForm = document.getElementById('contact-form');
// const userInputFields = document.querySelectorAll('.user-input');
// const sendMssgBtn = document.querySelector('.send-message--btn');
// const socialAccountContainer = document.querySelector('.social-link--wrapper');
/* end of contact page */

/* about page */
// const personalInfoContainer = document.querySelector('.about-me--content');
// const aboutEducationContainer = document.querySelector('.about-education--content');
// const aboutSkillsContainer = document.querySelector('.about-skills--content');
// const aboutExperienceContainer = document.querySelector('.about-experience--content');
// const aboutAwardsContainer = document.querySelector('.about-awards--content');
/* end of about page */
