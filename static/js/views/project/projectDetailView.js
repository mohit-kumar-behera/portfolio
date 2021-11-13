import View from './../View.js';

class ProjectDetailView extends View {
  constructor() {
    super();
    this._parentElement = document.querySelector('.project-detail');
    this._parentElement = this._parentElement.querySelector('.part-one');
  }

  _addTechBadge(tech) {
    return `
    <div class="tech-badge text-weight-bold">
      <span class="tech-badge--link">${tech.name}</span>
    </div>
    `;
  }

  _addLinkBtn(url, displayText) {
    return `<button class="bttn secondary--type project--demo--btn" onclick="window.open('${url}', '_blank')">${displayText}</button>`;
  }

  _buildProjectDetailMarkup(item) {
    return `
    <div class="page-content-header animate-up">
      <h4 class="project--heading">${item.name}</h4>		
    </div>
    <div class="project-thumbnail-img animate-up">
      <img src="${
        item.thumbnail && item.thumbnail.image_low_res
      }" class="project--img enlarge-img" alt="${
      item.thumbnail?.name
    }" data-src="${item.thumbnail && item.thumbnail.image_high_res}">
    </div>
    <div class="project--description animate-up">${item.description}</div>
    <div class="hr"></div>
    <div class="project-tech-stack flex-wrapper animate-up">
      <span class="mr-3">Tech Stack</span>
      ${item.tech_stack.map(entry => this._addTechBadge(entry)).join('')}
    </div>
    <div class="project--demo-link text-center animate-up">
      ${
        item.project_url
          ? this._addLinkBtn(item.project_url, 'Project Demo')
          : ''
      }
      ${
        item.source_code_url
          ? this._addLinkBtn(item.source_code_url, 'Source Code')
          : ''
      }
    </div>
    `;
  }

  _generateSkeletonMarkup() {
    return `
    <div class="page-content-header mb-3">
      <div class="skeleton-text w-full"></div>	
    </div>
    <div class="skeleton w-100 mb-3">
      <div class="display-card--img social-link--img skeleton-image" style="height:300px"></div>
    </div>
    <div class="mb-4 mt-4">
      <div class="skeleton-text w-full"></div>
      <div class="skeleton-text w-full"></div>
      <div class="skeleton-text w-half"></div>
    </div>
    <div class="hr mb-3"></div>
    <div class="project--demo-link text-center">
      <button class="bttn skeleton-btn"></button>
      <button class="bttn skeleton-btn"></button>
    </div>
    `;
  }

  _generateMarkup() {
    // Update title tag
    document.title = `Project ${this._data.project_num}: ${this._data.name}`;

    return this._buildProjectDetailMarkup(this._data);
  }
}

export default new ProjectDetailView();
