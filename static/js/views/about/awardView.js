import View from './../View.js';

class AboutView extends View {
  constructor() {
    super();
    this._parentElement = document.querySelector('.about-awards--content');
    this._showMoreBtnVisible = true;
  }

  addHandlerShowMoreBtn(handler) {
    this._parentElement.addEventListener(
      'click',
      function (e) {
        const btn = e.target.closest('.show-more-btn');
        if (!btn) return;

        // Scroll Up to Content Container
        this._parentElement.closest('.about-awards').scrollIntoView({
          behavior: 'smooth',
        });

        this._showMoreBtnVisible = false;
        handler(this, true);
      }.bind(this)
    );
  }

  _buildAwardCard(item) {
    return `
    <div class="display-card--div animate-up mid">
      <div class="display-card award-card">
        <div class="display-card--img">
          <img src="${item.image_low_res}" class="enlarge-img" alt="${item.name}" data-src="${item.image_high_res}"/>
        </div>
        <div class="overlay--div"><span>View</span></div>
      </div>
    </div>
    `;
  }

  _buildShowMoreBtn() {
    return `
    <div class="show-more-div">
      <button class="bttn secondary--type show-more-btn">show more awards</button>
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
        ${this._showMoreBtnVisible ? this._buildShowMoreBtn() : ''}
    `;
    return markup;
  }
}

export default new AboutView();
