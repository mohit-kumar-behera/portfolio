import View from './../View.js';

class EducationTimelineView extends View {
  constructor() {
    super();
    this._parentElement = document.querySelector('.about-education--content');
  }

  _buildEducationTimeline(item) {
    const isGraduation = item.tag.toLowerCase().includes('graduation');

    return `
    <div class="timeline--div animate-left">
			<div class="timeline--logo"><span class="fa fa-${
        isGraduation ? 'graduation-cap' : 'book'
      }"></span></div>
			<div class="timeline--content">
				<div class="timeline--duration pill-badge text-weight-bold">${
          item.year_span
        }</div>
        <div class="timeline--fromWhere">${item.name}, ${item.state}</div>
				<div class="timeline--didWhat">${item.tag}</div>
        <div class="timeline--shortDescp">${item.short_descp}</div>
			</div>
		</div>
    `;
  }

  _generateSkeletonMarkup() {
    return `
    <div class="timeline">
      <div class="timeline--div skeleton">
        <div class="pill-badge mb-2 w-50 p-0">
          <div class="skeleton-text w-full"></div>
        </div>
        <div class="skeleton-text w-full"></div>
        <div class="skeleton-text w-full"></div>
        <div class="skeleton-text w-full"></div>
      </div>
    </div>
    `;
  }

  _generateMarkup() {
    if (this._data.length == 0)
      return this._generateResponseMarkup(
        'info',
        'User has not added any education detail.'
      );
    return this._data.map(item => this._buildEducationTimeline(item)).join('');
  }
}

export default new EducationTimelineView();
