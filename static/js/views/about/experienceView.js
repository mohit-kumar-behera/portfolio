import View from './../View.js';

class AboutView extends View {
  constructor() {
    super();
    this._parentElement = document.querySelector('.about-experience--content');
  }

  addHandlerExperienceModelBtn(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const card = e.target.closest('.info-card');
      if (!card) return;
      const cardID = card.dataset.id;
      handler(cardID);
    });
  }

  _buildExperienceCard(item) {
    return `
    <div class="col-lg-6 col-md-12 col-sm-12 p-1 mb-2 animate-up mid">
			<div class="info-card" data-id="${item.name}">
				<div class="info-card--left">
					<img src="${item.image_low_res}" alt="${item.name} logo"/>
				</div>
				<div class="info-card--right">
					<div class="info-card--content">
						<p class="experience--duration pill-badge text-weight-bold">${item.year_span}</p>
					</div>
					<div class="info-card--content">
						<p class="experience--position">${item.position}</p>
					</div>
					<div class="info-card--content">
						<p class="experience--company"><a href="${item.url}" class="link" target="_blank">${item.name}</a></p>
					</div>
				</div>
			</div>
		</div>
    `;
  }

  _generateSkeletonMarkup() {
    const skeleton = () => {
      return `
      <div class="col-lg-6 col-md-12 col-sm-12 p-1 mb-2">
        <div class="info-card skeleton">
          <div class="info-card--left">
            <div class="skeleton-circle"></div>
          </div>
          <div class="info-card--right">
            <div class="info-card--content">
              <div class="skeleton-text w-half"></div>
            </div>
            <div class="info-card--content">
              <div class="skeleton-text w-full"></div>
            </div>
            <div class="info-card--content">
              <div class="skeleton-text w-half"></div>
            </div>
          </div>
        </div>
      </div>
      `;
    };
    return `
    <div class="row m-0">
      ${skeleton().repeat(2)}
    </div>
    `;
  }

  _generateMarkup() {
    if (this._data.length == 0)
      return this._generateResponseMarkup(
        'info',
        'User has not added any detail about experience.'
      );
    const markup = `
      <div class="row m-0">
        ${this._data.map(item => this._buildExperienceCard(item)).join('')}
      </div>
    `;
    return markup;
  }
}

export default new AboutView();
