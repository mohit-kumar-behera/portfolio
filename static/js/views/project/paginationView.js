import View from './../View.js';

class ProjectDetailView extends View {
  constructor() {
    super();
    this._parentElement = document.querySelector('.pagination--wrapper');
  }

  addHandlerPaginationBtn(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.pagination--btn');
      if (!btn) return;
      btn.blur();
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _addPaginationBtn(type, currPage = 1, disabled = false) {
    return `
    <div class="pagination-controller">
      <button class="bttn secondary--type pagination--btn ${type}" ${
      disabled ? 'disabled' : ''
    } data-goto="${type === 'prev' ? currPage - 1 : currPage + 1}">
        ${
          type === 'prev'
            ? '<span class="fa fa-angle-left icon"></span><span class="btn--text">prev</span>'
            : '<span class="btn--text">next</span><span class="fa fa-angle-right icon"></span>'
        }
      </button>
    </div>
    `;
  }

  _addPaginationDisplay(currPage, totalPage) {
    return `
    <div class="pagination--pagenum">
      <span class="curr-page">${currPage}</span>
      <span>/</span>
      <span class="last-page">${totalPage}</span>
    </div>
    `;
  }

  _generateMarkup() {
    const totalPages = this._data.totalResults;
    const currPage = this._data.currPage;
    const numPages = Math.ceil(totalPages / this._data.resultsPerPage);

    // Only 1 page
    if (numPages === 1) return '';

    // More than 1 page
    if (numPages > 1) {
      // currPage = 1 (i.e. first page)
      if (currPage === 1)
        return `
        ${this._addPaginationBtn('prev', currPage, true)}
        ${this._addPaginationDisplay(currPage, numPages)}
        ${this._addPaginationBtn('next', currPage)}
        `;

      // currPage = numPages (i.e. last page)
      if (currPage === numPages)
        return `
        ${this._addPaginationBtn('prev', currPage)}
        ${this._addPaginationDisplay(currPage, numPages)}
        ${this._addPaginationBtn('next', currPage, true)}
        `;

      // 1 < currPage < numPages (i.e. between first and last page)
      if (currPage > 1 && currPage < numPages)
        return `
        ${this._addPaginationBtn('prev', currPage)}
        ${this._addPaginationDisplay(currPage, numPages)}
        ${this._addPaginationBtn('next', currPage)}
        `;
    }

    // If some error occurred
    return '';
  }
}

export default new ProjectDetailView();
