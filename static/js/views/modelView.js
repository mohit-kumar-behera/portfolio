class Model {
  _overlay;
  _model;
  _dataHead;
  _dataBody;

  constructor(model, overlay) {
    this._model = model;
    this._overlay = overlay;

    this._overlay.addEventListener(
      'click',
      function (e) {
        const closeEl =
          e.target.closest('.close-model--btn') || e.target.closest('.overlay');
        if (!closeEl) return;
        this.close();
      }.bind(this)
    );

    document.body.addEventListener(
      'keydown',
      function (e) {
        // Close the Model on ESC key press
        if (e.key === 'Escape' && !this._model.classList.contains('hide'))
          this.close();
      }.bind(this)
    );
  }

  _clear() {
    this._model.innerHTML = '';
  }

  renderSpinner() {
    this._clear();
    this._model.innerHTML = `
      <div class="d-flex flex-column">
        <div class="d-flex mx-auto">
          <div class="box one"></div>
          <div class="box two"></div>
        </div>
        <div class="d-flex mx-auto">
          <div class="box three"></div>
          <div class="box four"></div>
        </div>
      </div>
    `;
    return this;
  }

  open() {
    /* Open Model window */
    this._overlay.classList.remove('hide');
    this._model.classList.remove('hide');
    return this;
  }

  close() {
    /* Close Model window */
    this._overlay.classList.add('hide');
    this._model.classList.add('hide');
    return this;
  }

  customize(width, height, background = 'var(--light-shade1)') {
    if (width) this._model.style.width = width;
    if (height) this._model.style.height = height;
    this._model.style.background = background;
    return this;
  }

  render(dataBody, dataHead) {
    this._dataBody = dataBody;
    this._dataHead = dataHead || undefined;
    const markup = this._generateMarkup();
    this._clear();
    this._model.insertAdjacentHTML('afterbegin', markup);
    return this;
  }

  _attachHead() {
    return `
      <div class="model-head">${this._dataHead}</div>
    `;
  }

  _generateMarkup() {
    return `
      ${this._dataHead ? this._attachHead() : ''}
      <div class="model-body">${this._dataBody}</div>
    `;
  }
}

export default Model;
