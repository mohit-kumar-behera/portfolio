import View from './../View.js';

class MentorView extends View {
  constructor() {
    super();
    this._parentElement = document.querySelector('.project--mentor--content');
  }

  _addChannel(channel) {
    return `
    <p class="experience--position">
      <a href="${channel.url}" class="link" target="_blank">${channel.name}</a>
    </p>
    `;
  }

  _buildMentorCard(item) {
    return `
    <div class="col-lg-4 col-md-6 col-sm-12 p-1 mb-2 animate-up mid">
      <div class="info-card">
        <div class="info-card--left">
          <img src="${item.image_low_res}" alt="${item.name}"/>
        </div>
        <div class="info-card--right">
          <div class="info-card--content">
            <p class="experience--duration pill-badge text-weight-bold">${
              item.name
            }</p>
          </div>

          <div class="info-card--content">
            ${item.channel.map(entry => this._addChannel(entry)).join('')}
          </div>
        </div>
      </div>
    </div>
    `;
  }

  _generateSkeletonMarkup() {
    const skeleton = () => {
      return `
      <div class="col-lg-4 col-md-6 col-sm-12 p-1 mb-2">
      <div class="info-card skeleton">
        <div class="info-card--left">
          <div class="skeleton-circle"></div>
        </div>
        <div class="info-card--right">
          <div class="info-card--content">
            <div class="skeleton-text"></div>
          </div>
          <div class="info-card--content">
            <div class="skeleton-text w-half"></div>
          </div>
          <div class="info-card--content">
            <div class="skeleton-text w-half"></div>
          </div>
        </div>
      </div>
      </div>
      `;
    };
    return `
    <div class="row">
      ${skeleton().repeat(3)}
    </div>
    `;
  }

  _generateMarkup() {
    if (this._data.length == 0)
      return this._generateResponseMarkup(
        'info',
        'User has not added any contact detail.'
      );
    const markup = `
      <div class="row">
        ${this._data.map(item => this._buildMentorCard(item)).join('')}
      </div>
    `;
    return markup;
  }
}

export default new MentorView();
