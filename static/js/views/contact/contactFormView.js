import View from './../View.js';

class ContactFormView extends View {
  _parentElement = document.querySelector('.contact-form--div');

  addHandlerSubmit(handler) {
    const form = this._parentElement.querySelector('#contact-form');
    form.addEventListener(
      'submit',
      function (e) {
        e.preventDefault();
        const formDataArr = [...new FormData(e.target)];
        const formData = Object.fromEntries(formDataArr);
        handler(this, formData);
      }.bind(this)
    );
  }

  renderHelpText() {
    this._parentElement
      .querySelectorAll('.help-text')
      .forEach(elem => (elem.style.display = 'block'));
  }

  renderLoaderBtn(spinner = true) {
    const btn = this._parentElement.querySelector('.send-message--btn');
    btn.blur();
    btn.innerHTML = `<span>SEND MESSAGE</span>${
      spinner
        ? '<div class="spinner-border spinner-border-sm text-light ml-1"></div>'
        : ''
    }`;
  }

  scrollToView() {
    const { left, top } = this._parentElement.getBoundingClientRect();
    this._parentElement.scrollIntoView({ behavior: 'smooth' }) ||
      window.scrollTo({
        left: left + window.pageXOffset,
        top: top + window.pageYOffset - 40,
        behavior: 'smooth',
      });
  }

  _generateMarkup() {
    return `
      <form method="post" id="contact-form">
        <div class="form-group">
          <div class="joint-input input-div">
            <input type="text" class="user-input w-100" name="name" placeholder="Your Name" required spellcheck="false" data-minlength="2" data-maxlength="30" />
            <small class="help-text">Atleast 2 and atmost 30 characters</small>
          </div>
          <div class="joint-input input-div">
            <input type="email" class="user-input w-100" name="email" placeholder="Your Email" required spellcheck="false" data-minlength="2"  data-maxlength="50" />
            <small class="help-text">Atleast 2 and atmost 30 characters. Should be a valid Email syntax</small>
          </div>
        </div>
        <div class="form-group">
          <div class="input-div">
            <input type="text" class="user-input w-100" name="subject" placeholder="Subject" required autocomplete="off" spellcheck="false" data-minlength="2" data-maxlength="255" />
            <small class="help-text">Atleast 2 and atmost 255 characters</small>
          </div>
          <div class="input-div">
            <textarea class="user-input w-100" name="message" placeholder="Write your Message here..." rows="6" required spellcheck="false" data-minlength="2" data-maxlength="800"></textarea>
            <small class="help-text">Atleast 2 and atmost 800 characters</small>
          </div>
        </div>
        <div class="form-group">
          <button type="submit" class="bttn secondary--type send-message--btn">
            <span>SEND MESSAGE</span>
          </button>
        </div>
      </form>
    `;
  }
}

export default new ContactFormView();
