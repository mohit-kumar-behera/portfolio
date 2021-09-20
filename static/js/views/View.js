export default class View {
  _data;

  _clear() {
    this._parentElement.innerHTML = '';
  }

  _generateErrorMarkup(msg) {
    return `
    <div class="error-div animate-opacity">
      <i class="fa fa-exclamation-triangle"></i>
      <p>${msg}</p>
      <a href="">Try Reloading</a>
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

  renderError(message = 'Something went wrong') {
    const errorMarkup = this._generateErrorMarkup(message);
    this._insertMarkup('afterbegin', this._parentElement, errorMarkup);
  }

  render(data) {
    if (data === null || data === undefined) return this.renderError();
    if (!data.length)
      return this.renderError('Data is Empty. Nothing to show out.');

    this._data = data;
    const markup = this._generateMarkup();
    setTimeout(
      function () {
        this._insertMarkup('afterbegin', this._parentElement, markup);
      }.bind(this),
      2000
    );
  }
}
