import View from './../View.js';

class PersonalDetalView extends View {
  _parentElement = document.querySelector('.about-me--content');

  addHandlerRender(handler) {
    handler();
  }

  _buildPersonalInfoCard(data) {
    const getFormattedLink = data => {
      return `<a href="${data.url}" class="link" target="_blank">${data.displayVal}</a>`;
    };

    return `
    <div class="entity text-weight-bold">
	 		<p class="key">${data.displayName}</p>
	 		<p class="value">${data.url ? getFormattedLink(data) : data.displayVal}</p>
	 	</div>
    `;
  }

  _generateSkeletonMarkup() {
    return `
    <div class="entity skeleton">
      <div class="skeleton-text w-half"></div>
    </div>
    `;
  }

  _generateMarkup() {
    const dataArr = Object.entries(this._data);
    return dataArr
      .map(data => {
        const [_, entry] = data;
        return this._buildPersonalInfoCard(entry);
      })
      .join('');
  }
}

export default new PersonalDetalView();
