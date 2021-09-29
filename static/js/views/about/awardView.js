import View from './../View.js';

class AboutView extends View {
  _parentElement = document.querySelector('.about-awards--content');

  _generateSkeletonMarkup() {
    return `
    <div class="display-card--wrapper">
      <div class="display-card--div skeleton">
        <div class="display-card">
          <div class="display-card--img skeleton-image">
          </div>
        </div>
      </div>
    </div>
    `;
  }

  _generateMarkup() {
    if (this._data.length == 0)
      return this._generateResponseMarkup(
        'info',
        'User has not added any detail about experience.'
      );
    return ``;
  }
}

export default new AboutView();
