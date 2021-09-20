import View from './../View.js';

class SocialMediaView extends View {
  _parentElement = document.querySelector('.contact-form--div');

  addHandlerRender(handler) {
    handler();
  }

  _generateMarkup() {
    return `
    
    `;
  }
}

export default new SocialMediaView();
