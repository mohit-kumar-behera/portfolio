'use strict';

import * as controller from './controller.js';
import * as func from './helper.js';

import user from '../js/modules/MohitInfo.js';
import { loadImg, createImg } from '../js/modules/LoadCreateImg.js';
import {
  buildEducationTimeline,
  buildSkillBar,
  buildExperienceCard,
  buildAwardCard,
} from '../js/modules/Build.js';

/* ------------------- Required in All Pages ------------------------- */

const activateDefaultPageScript = function (modelCl) {
  const overlay = document.querySelector('.overlay');
  const normalModelView = document.querySelector('.normal-model-view');
  const imgModelView = document.querySelector('.img-model-view');

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

/*------------------------- Required only in About us Page ----------------------------------------*/

const activateAboutPageScript = function (user) {
  // About Page DOM Selector
  const aboutEducationContainer = document.querySelector(
    '.about-education--content'
  );
  const aboutSkillsContainer = document.querySelector('.about-skills--content');
  const aboutExperienceContainer = document.querySelector(
    '.about-experience--content'
  );
  const aboutAwardsContainer = document.querySelector('.about-awards--content');

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

//////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

class App {
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
    this._modelCl = null;
  }

  _setCurrPage() {
    window.currPage = location.pathname.split('/')[1] || 'home';
  }

  _setMobileDevice() {
    func
      .detectMobile()
      .then(res => {
        window.isMobile = res.mobileDevice;
      })
      .catch(_ => {
        window.isMobile = false;
      })
      .finally(() => {
        this._addMobileAttribute();
      });
  }

  _setPageTheme() {
    window.currPageTheme = this._currPageTheme;
    if (!window.currPageTheme) localStorage.setItem('theme-color', '#fa1e0e');
    func.setTheme(window.currPageTheme, window.currPage);
  }

  _addMobileAttribute() {
    document.body.setAttribute('data-mobile-device', window.isMobile);
  }

  get _currPageTheme() {
    return localStorage.getItem('theme-color');
  }

  start() {
    controller.defaultInit();

    activateDefaultPageScript(this._modelCl);

    switch (window.currPage) {
      case 'home':
        controller.homeInit();
        break;
      case 'contact':
        controller.contactInit();
        break;
      case 'about':
        controller.aboutInit();
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
app.start();
