import View from './../View.js';

class SocialMediaView extends View {
  constructor() {
    super();
    this._parentElement = document.querySelector('.social-link--wrapper');
  }

  _buildAccountCard(item) {
    return `
      <div class="display-card--div social-link--div animate-up mid" data-social-handle="${item.name}">
        <div class="display-card social-link" tabindex="0">
          <div class="display-card--img social-link--img">
            <img src="${item.image_low_res}" alt="Mohit's ${item.name} cover img"/>
          </div>
          <a href="${item.url}" class="link display-card--link" target="_blank"></a>
          <div class="overlay--div"></div>
          <div class="social-link--logo">
            <span class="fa fa-${item.name} icon"></span>
          </div>
        </div>
      </div>
    `;
  }

  _generateSkeletonMarkup() {
    return `
    <div class="display-card--div skeleton">
      <div class="display-card">
        <div class="display-card--img skeleton-image">
        </div>
      </div>
    </div>
    `;
  }

  _generateMarkup() {
    if (this._data.length == 0)
      return this._generateResponseMarkup(
        'info',
        'User has not added any social account detail.'
      );
    return this._data.map(item => this._buildAccountCard(item)).join('');
  }
}

export default new SocialMediaView();
