import View from './../View.js';

class ProjectDetailView extends View {
  constructor() {
    super();
    this._parentElement = document.querySelector('.project-detail');
  }

  _generateSkeletonMarkup() {
    return '';
  }

  _generateMarkup() {
    if (this._data.length == 0)
      return this._generateResponseMarkup(
        'info',
        'User has not added any contact detail.'
      );
    return '';
  }
}

export default new ProjectDetailView();
