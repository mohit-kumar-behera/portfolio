import View from './../View.js';

class SkillView extends View {
  constructor() {
    super();
    this._parentElement = document.querySelector('.about-skills--content');
  }

  _buildSkillCard(item) {
    return `
    <div class="col-lg-3 col-md-4 col-sm-12 mb-3 animate-up mid">
			<div class="skill-bar--wrapper">
				<div class="skill-bar--label text-weight-bold"><span>${
          item.technology
        }</span></div>
				<div class="mk-progress">
					<div class="mk-progress-bar" style="width: ${Math.round(
            (item.rating / 5) * 100
          )}%;">
						<span>${Math.round((item.rating / 5) * 100)}%</span>
					</div>
				</div>
			</div>						
		</div>
    `;
  }

  _generateSkeletonMarkup() {
    const skeleton = () => {
      return `
      <div class="col-lg-3 col-md-4 col-sm-12 mb-3">
        <div class="skill-bar--wrapper skeleton">
          <div class="skill-bar--label">
            <div class="skeleton-text w-half"></div>
            <div class="skeleton-text w-full"></div>
          </div>
        </div>						
      </div>
      `;
    };
    return `
    <div class="row m-0">
      ${skeleton().repeat(4)}
    </div>
    `;
  }

  _generateMarkup() {
    const breakup_point = 767;

    if (this._data.length == 0)
      return this._generateResponseMarkup(
        'info',
        'User has not added any detail about skills.'
      );
    const markup = `
      <div class="row m-0 ${
        window.innerWidth <= breakup_point ? 'scrolling-content' : 'normal-flow'
      }">
        ${this._data.map(item => this._buildSkillCard(item)).join('')}
      </div>
    `;
    return markup;
  }
}

export default new SkillView();
