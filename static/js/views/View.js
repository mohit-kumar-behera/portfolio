export default class View {
  _data;

  addHandlerRender(handler) {
    handler();
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

  renderResponseMessage(type, message) {
    const responseMarkup = this._generateResponseMarkup(type, message);
    this._insertMarkup('afterbegin', this._parentElement, responseMarkup);
  }

  render(data) {
    if (data === null || data === undefined)
      return this.renderResponseMessage('error', 'Something Went Wrong 😔');

    this._data = data;
    const markup = this._generateMarkup();
    setTimeout(
      function () {
        this._insertMarkup('afterbegin', this._parentElement, markup);
      }.bind(this),
      0
    );
  }

  renderHTML() {
    const markup = this._generateMarkup();
    this._insertMarkup('afterbegin', this._parentElement, markup);
  }
}
