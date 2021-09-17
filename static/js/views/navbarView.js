class NavbarView {
  _parentElement = document.querySelector('.navbar');

  _toggleNavbar() {
    if (this._parentElement.classList.contains('open'))
      this._parentElement.classList.remove('open');
    else this._parentElement.classList.add('open');
  }

  setActivePageNavLink(currPage) {
    this._parentElement
      .querySelector('a.nav-link.active')
      ?.classList.remove('active');
    this._parentElement
      .querySelector(`a.nav-link[data-path='${currPage}']`)
      ?.classList.add('active');
  }

  addHandlerTogglerBtn() {
    const navbarTogglerBtn =
      this._parentElement.querySelector('.navbar-toggler');
    navbarTogglerBtn.addEventListener(
      'click',
      function (ev) {
        ev.target.blur();
        this._toggleNavbar();
      }.bind(this)
    );
  }

  addHandlerTabPress() {
    document.body.addEventListener(
      'keyup',
      function (e) {
        if (e.key === 'Tab') {
          /* open close navbar as per TAB Focus */
          if (document.activeElement.classList.contains('nav-link'))
            this._parentElement.classList.add('open');
          else this._parentElement.classList.remove('open');
        }
      }.bind(this)
    );
  }

  addHandlerThemeModelBtn(handler) {
    this._parentElement
      .querySelector('.theme-picker--btn')
      .addEventListener('click', function (e) {
        e.preventDefault();
        console.log(this);
        this.blur();
        handler();
      });
  }
}

export default new NavbarView();
