import View from './../View.js';

class ProjectDetailView extends View {
  constructor() {
    super();
    this._parentElement = document.querySelector('.project--wrapper');
  }

  addHandlerHashChange(handler, ...args) {
    window.addEventListener('hashchange', () => handler(this, args));
  }

  _addTechBadge(tech) {
    return `
    <div class="tech-badge text-weight-bold">
      <a href="#${tech.name
        .toLowerCase()
        .replace(/ /g, '-')}" class="link tech-badge--link">${tech.name}</a>
    </div>
    `;
  }

  _buildProjectCard(item) {
    return `
    <div class="project--div">
      <div class="project--card">
        <div class="project-thumbnail-img">
          <img src="${
            item.thumbnail
              ? item.thumbnail.image_low_res
              : '/static/media/project/project-default.png'
          }" class="project--img" alt="${
      item.thumbnail ? item.thumbnail.name : item.name
    }" />
        </div>
        <div class="project-content">
          <div class="project-headline">
            <a href="${item.url}" class="link display-card--link"></a>
            <h5 class="headline text-weight-bold">${item.name}</h5>
            <p>${item.description}</p>
          </div>
          <div class="hr"></div>
          <div class="project-tech-stack flex-wrapper">
            ${item.tech_stack.map(entry => this._addTechBadge(entry)).join('')}
          </div>
        </div>

        ${
          item.highlight
            ? '<div class="highlight-star-div"><i class="fa fa-star star-icon"></i></div>'
            : ''
        }
      </div>
    </div>
    `;
  }

  _generateSkeletonMarkup() {
    const skeleton = count => {
      return `
      <div class="col-4">
        <div class="skeleton-text w-full"></div>
      </div>
      `.repeat(count);
    };
    return `
    <div class="project--div skeleton">
      <div class="project--card">
        <div class="project-thumbnail-img"></div>
        <div class="project-content">
          <div class="skeleton-text w-full"></div>
          <div class="skeleton-text w-full"></div>
          <div class="hr"></div>
          <div class="row">${skeleton(3)}</div>
          <div class="row">${skeleton(3)}</div>
        </div>
      </div>
    </div>
    `;
  }

  _generateMarkup() {
    if (this._data.length == 0)
      return this._generateResponseMarkup(
        'error',
        "Sorry! Couldn't find any related projects to this search.🧐"
      );

    return this._data.map(item => this._buildProjectCard(item)).join('');
  }
}

export default new ProjectDetailView();
