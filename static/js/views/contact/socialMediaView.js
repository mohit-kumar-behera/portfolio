class SocialMediaView {
  _parentElement = document.querySelector('.social-link--wrapper');
  _data;

  _clear() {
    this._parentElement.innerHTML = '';
  }

  _buildAccountCard(item) {
    return `
      <div class="display-card--div social-link--div" data-social-handle="${item.name}">
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

  _generateErrorMarkup() {}

  _generateMarkup() {
    return this._data.map(item => this._buildAccountCard(item)).join('');
  }

  addHandlerRender(handler) {
    handler();
  }

  renderSkeleton(count = 1) {}

  renderError() {}

  render(data) {
    if (!data) return;
    this._data = data;

    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}

export default new SocialMediaView();
