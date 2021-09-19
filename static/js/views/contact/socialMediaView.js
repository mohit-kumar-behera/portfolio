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

  _generateErrorMarkup(msg) {
    return `
    <div class="error-div">
      <i class="fa fa-exclamation-triangle"></i>
      <p>${msg}</p>
      <a href="">Try Reloading</a>
    </div>
    `;
  }

  _generateMarkup() {
    return this._data.map(item => this._buildAccountCard(item)).join('');
  }

  _insertMarkup(position, element, markup) {
    this._clear();
    element.insertAdjacentHTML(position, markup);
  }

  renderSkeleton(count = 1) {
    const skeletonMarkup = this._generateSkeletonMarkup().repeat(5);
    this._insertMarkup('afterbegin', this._parentElement, skeletonMarkup);
  }

  renderError(message = 'Something went wrong') {
    const errorMarkup = this._generateErrorMarkup(message);
    this._insertMarkup('afterbegin', this._parentElement, errorMarkup);
  }

  render(data) {
    if (!data) return;
    this._data = data;

    const markup = this._generateMarkup();
    setTimeout(
      function () {
        this._insertMarkup('afterbegin', this._parentElement, markup);
      }.bind(this),
      2000
    );
  }

  addHandlerRender(handler) {
    handler();
  }
}

export default new SocialMediaView();
