import View from './../View.js';

class ContactFormView extends View {
  _parentElement = document.querySelector('.contact-form--div');
  _emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,})*$/;

  addHandlerRender(handler) {
    handler();
  }

  addHandlerSubmit(handler) {
    const form = this._parentElement.querySelector('#contact-form');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const formDataArr = [...new FormData(this)];
      const formData = Object.fromEntries(formDataArr);
      handler(formData);
    });
  }

  renderError(err = null) {
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
        top: top + window.pageYOffset,
        behavior: 'smooth',
      });
  }

  validateInputFields = function () {
    let valid = false;
    const inputFields = Array.from(
      this._parentElement.querySelectorAll('.user-input')
    );

    // It counts the number of fields that are in valid range mentioned respectively
    const inRangeFieldsCount = inputFields
      .filter(
        field =>
          field.value.length >= field.dataset.minlength &&
          field.value.length <= field.dataset.maxlength
      )
      .reduce(count => count + 1, 0);

    valid = inRangeFieldsCount === inputFields.length;
    const emailField = inputFields.find(field => field.type === 'email');
    const h =
      emailField &&
      valid &&
      this._validateEmail(this._emailRegex, emailField.value);

    if (!h) {
      this._parentElement.querySelector('#contact-form').submit();
    }

    return h;
  };

  _validateEmail = function (regex, val) {
    return regex.test(val);
  };

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
