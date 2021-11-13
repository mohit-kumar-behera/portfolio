export default class View {
  constructor() {
    this._data = null;
  }

  addHandlerRender(handler, ...args) {
    return handler(this, args);
  }

  addHandlerImageView(handler) {
    this._parentElement.addEventListener(
      'click',
      function (e) {
        const imgElem = e.target.closest('.enlarge-img');
        if (!imgElem) return;
        handler(this, imgElem);
      }.bind(this)
    );
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  _generateResponseMarkup(type, msg) {
    const isError = type === 'error';
    return `
    <div class="response--div ${type} animate-opacity">
      <i class="icon fa fa-${
        isError
          ? 'exclamation-triangle'
          : type === 'message'
          ? 'check-info-circle'
          : 'info-circle'
      }"></i>
      <p>${msg}</p>
      ${isError ? '<a href="">Try Reloading</a>' : ''}
    </div>
    `;
  }

  _insertMarkup(position, element, markup) {
    this._clear();
    element.insertAdjacentHTML(position, markup);
  }

  renderSkeleton(count = 1) {
    const skeletonMarkup = this._generateSkeletonMarkup().repeat(count);
    this._insertMarkup('afterbegin', this._parentElement, skeletonMarkup);
  }

  renderResponseMessage(type, message, render = true) {
    const responseMarkup = this._generateResponseMarkup(type, message);
    if (!render) return responseMarkup;
    this._insertMarkup('afterbegin', this._parentElement, responseMarkup);
  }

  render(data) {
    if (data === null || data === undefined)
      return this.renderResponseMessage('error', 'Something Went Wrong 😔');

    this._data = data;
    const markup = this._generateMarkup();
    this._insertMarkup('afterbegin', this._parentElement, markup);
  }

  renderHTML() {
    const markup = this._generateMarkup();
    this._insertMarkup('afterbegin', this._parentElement, markup);
  }
}
