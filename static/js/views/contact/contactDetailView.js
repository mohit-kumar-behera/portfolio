import View from './../View.js';

class SocialMediaView extends View {
  constructor() {
    super();
    this._parentElement = document.querySelector('.contact-detail');
  }

  _buildContactDetailCard(item) {
    return `
      <div class="email">
        <a href="${item.url}" class="link contact-link ${
      item.type === 'email' && 'default'
    }">
          <span class="fa fa-${
            item.type === 'email' ? 'envelope' : 'phone'
          } icon contact-link--icon"></span>
          <span class="contact-link--text">${item.value}</span>
        </a>
      </div>
    `;
  }

  _generateSkeletonMarkup() {
    return `<div class="skeleton"></div>`;
  }

  _generateMarkup() {
    if (this._data.length == 0)
      return this._generateResponseMarkup(
        'info',
        'User has not added any contact detail.'
      );
    return this._data.map(item => this._buildContactDetailCard(item)).join('');
  }
}

export default new SocialMediaView();
