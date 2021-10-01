import View from './../View.js';

class AboutView extends View {
  _parentElement = document.querySelector('.about-awards--content');

  addHandlerImageView(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const imgElem = e.target.closest('.award--img');
      if (!imgElem) return;
      handler(imgElem);
    });
  }

  _buildAwardCard(item) {
    return `
    <div class="display-card--div animate-up mid">
      <div class="display-card award-card">
        <div class="display-card--img">
          <img src="${item.image_low_res}" class="award--img" alt="${item.name}" data-src="${item.image_high_res}"/>
        </div>
        <div class="overlay--div"><span>View</span></div>
      </div>
    </div>
    `;
  }

  _generateSkeletonMarkup() {
    const skeleton = () => {
      return `
      <div class="display-card--div skeleton">
        <div class="display-card">
          <div class="display-card--img skeleton-image">
          </div>
        </div>
      </div>
      `;
    };
    return `
    <div class="display-card--wrapper">
      ${skeleton().repeat(3)}
    </div>
    `;
  }

  _generateMarkup() {
    if (this._data.length == 0)
      return this._generateResponseMarkup(
        'info',
        'User has not added any detail about experience.'
      );

    const markup = `
        <div class="display-card--wrapper">
        ${this._data.map(item => this._buildAwardCard(item)).join('')}
        </div>
    `;
    return markup;
  }
}

export default new AboutView();
