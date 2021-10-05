import View from './../View.js';

class ProjectImageView extends View {
  constructor() {
    super();
    this._parentElement = document.querySelector('.project-detail');
    this._parentElement = this._parentElement.querySelector('.part-four');
  }

  _buildSocialSharerBtn(item) {
    return `<button class="bttn share--btn" data-account-type="${item.name}"><span class="fa fa-${item.name} icon"></span></button>`;
  }

  _generateSkeletonMarkup() {
    const skeleton = count => {
      return `<button class="share--btn skeleton-btn"></button>`.repeat(count);
    };
    return `
    <div class="skeleton-text w-half mx-auto"></div>
    <div class="share--div">
      ${skeleton(4)}
    </div>
    `;
  }

  _generateMarkup() {
    if (this._data.length == 0)
      return this._generateResponseMarkup(
        'info',
        'No options are currently avaiable to share this project. Sorry.'
      );

    const markup = `
    <div class="page-content-header animate-up">
      <h4 class="sub-heading"><span>SHARE</span> <span class="text secondary--type">project</span></h4>				
    </div>	
    <div class="share--div animate-opacity">
      ${this._data.map(item => this._buildSocialSharerBtn(item)).join('')}
    </div>
    `;
    return markup;
  }
}

export default new ProjectImageView();
