'use strict';

import * as controller from './controller.js';
import * as func from './helper.js';

import { loadImg } from './loadCreateImg.js';

const startLazyImgObserver = function () {
  const lazyImgElem = Array.from(document.querySelectorAll('.lazy-img'));

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

  const lazyImgOption = {
    root: null,
    threshold: 0.1,
  };

  const lazyImgObserver = new IntersectionObserver(
    handleLazyImg,
    lazyImgOption
  );
  lazyImgElem.forEach(elem => lazyImgObserver.observe(elem));
};

class App {
  _loaderEl = document.querySelector('.loader');
  _mainBodyEl = document.getElementById('main-body');

  constructor() {
    this._setCurrPage();
    this._setMobileDevice();
    this._setPageTheme();
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

    switch (window.currPage) {
      case 'home':
        controller.homeInit();
        break;
      case 'contact':
        controller.contactInit();
        break;
      case 'about':
        controller.aboutInit();
        break;
      case 'project':
        break;
    }

    startLazyImgObserver();

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
