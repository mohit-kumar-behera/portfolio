import View from './../View.js';

class PersonalDetalView extends View {
  _parentElement = document.querySelector('.about-education--content');

  _generateSkeletonMarkup() {
    return `
    <div class="timeline">
      <div class="timeline--div skeleton">
        <div class="pill-badge mb-2 w-50 p-0">
          <div class="skeleton-text w-full"></div>
        </div>
        <div class="skeleton-text w-full"></div>
        <div class="skeleton-text w-full"></div>
      </div>
    </div>
    `;
  }

  _generateMarkup() {
    return '';
  }
}

export default new PersonalDetalView();
