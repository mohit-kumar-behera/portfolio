class ThemePaletteView {
  _parentElement = document.querySelector('.content.theme-picker-container');
  _palette = [
    '#913ee8',
    '#01937c',
    '#fa1e0e',
    '#a0522d',
    '#ef5742',
    '#f97194',
    '#ffae00',
    '#73a528',
    '#fe4c03',
    '#0556f3',
  ];

  constructor() {
    this._paletteSet = this._splitPaletteToSets(this._palette);
  }

  _splitPaletteToSets(palette) {
    return [
      palette.slice(0, palette.length / 2),
      palette.slice(palette.length / 2, palette.length),
    ];
  }

  _generateMarkup(renderData) {
    const [set1, set2] = this._paletteSet;
    const modelCl = renderData ? 'animate-up' : 'from-model';
    return `
    <div class="theme-picker ${modelCl}">
      <div class="pallete">
        ${set1.map(color => this._buildPaletteBtn(color)).join('')}
      </div>
      <div class="pallete">
        ${set2.map(color => this._buildPaletteBtn(color)).join('')}
      </div>
    </div>
  `;
  }

  _buildPaletteBtn(color) {
    return `<button class="bttn color--btn" data-color="${color}" style="background: ${color}"></button>`;
  }

  setActiveThemeClass = function (activeTheme) {
    this._parentElement
      .querySelectorAll('.theme-picker .color--btn')
      ?.forEach(btn => btn.classList.remove('active'));

    this._parentElement
      .querySelector(`.theme-picker .color--btn[data-color='${activeTheme}'`)
      ?.classList.add('active');
  };

  addHandlerThemePickerBtn = function (handler) {
    this._parentElement
      .querySelector('.theme-picker')
      .addEventListener('click', function (e) {
        handler(e);
      });
  };

  render(renderData = true) {
    const markup = this._generateMarkup(renderData);
    if (!renderData) return markup;

    this._parentElement &&
      this._parentElement.insertAdjacentHTML('beforeend', markup);
  }
}

export default new ThemePaletteView();
