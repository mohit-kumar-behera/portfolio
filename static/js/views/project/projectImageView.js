import View from './../View.js';

class ProjectImageView extends View {
  constructor() {
    super();
    this._parentElement = document.querySelector('.project-detail');
    this._parentElement = this._parentElement.querySelector('.part-two');
  }

  _buildProjectImageMarkup(item) {
    return `
    <div class="display-card--div" data-img-src="${item.image_high_res}">
      <div class="display-card">
        <div class="display-card--img">
          <img src="${item.image_low_res}" class="enlarge-img" alt="${item.name}" onerror="this.closest('.display-card').style.pointerEvents='none'" data-src="${item.image_high_res}"/>
        </div>
        <div class="overlay--div"><span>View</span></div>
      </div>
    </div>
    `;
  }

  _generateSkeletonMarkup() {
    const skeleton = count => {
      return `
      <div class="display-card--div skeleton">
        <div class="display-card--img social-link--img skeleton-image"></div>
      </div>
      `.repeat(count);
    };
    return `
    <div class="skeleton-text w-half mx-auto"></div>
    <div class="display-card--wrapper">	
			${skeleton(4)}
    </div>
    `;
  }

  _generateMarkup() {
    if (this._data.length == 0)
      return this._generateResponseMarkup(
        'info',
        'User has not added any images related to this Project.'
      );

    const markup = `
    <div class="page-content-header animate-up">
      <h4 class="sub-heading"><span>Project</span> <span class="text secondary--type">Picture</span></h4>		
    </div>
    <div class="display-card--wrapper animate-up">
      ${this._data.map(item => this._buildProjectImageMarkup(item)).join('')}
    </div>
    `;
    return markup;
  }
}

export default new ProjectImageView();
