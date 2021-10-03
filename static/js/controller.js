import paletteView from './views/themePaletteView.js';
import PopupModel from './views/modelView.js';
import * as model from './db-model.js';

const RESPONSE_TYPE = {
  ERROR: 'error',
  MESSAGE: 'message',
};

///////////////////////////////////////////////////////////////////////////
//////////////////////////// DEFAULT /////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

/**
 * @description Customizes and opens model-window for Pallete selection
 */
const controlThemeModelBtn = function () {
  const params = {
    model: document.querySelector('#normal-model.model'),
    overlay: document.querySelector('.overlay'),
    width: 'auto',
    height: 'auto',
  };

  const modelCl = new PopupModel(params.model, params.overlay);
  modelCl.customize(params.width, params.height).renderSpinner().open();

  const headEl = '<h4>Pick Theme</h4>';
  const bodyEl = paletteView.render(false);

  modelCl.render(bodyEl, headEl);
  document
    .querySelector('.theme-picker.from-model')
    .addEventListener('click', e => controlThemePickerBtn(e));
};

//////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// HOME PAGE ///////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {object} e Event Object
 * @description Controller for theme picker button
 */
const controlThemePickerBtn = function (e) {
  const elem = e.target.closest('.color--btn');
  if (!elem) return;
  elem.blur();
  import('./helper.js').then(module =>
    module.setTheme(elem.dataset.color, window.currPage)
  );
};

//////////////////////////////////////////////////////////////////////////////////
/////////////////////////// CONTACT PAGE ////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/**
 * @description Fetch contact detail of user and displays it
 */
const controlContactDetail = async function (moduleCl) {
  try {
    // Loading Animation
    moduleCl.renderSkeleton(2);

    // Fetch Data
    await model.fetchUserContactDetail();

    // Render Data
    moduleCl.render(model.state.contact.detail);
  } catch (err) {
    // Render Error
    moduleCl.renderResponseMessage(RESPONSE_TYPE.ERROR, err);
  }
};

/**
 * @param {object} receivedData receives the Form Data as object
 * @description Handles Form Submission
 */
const controlContactFormSubmission = async function (moduleCl, receivedData) {
  try {
    // Add Loading Animation to Submit Button
    moduleCl.renderLoaderBtn();

    // Scroll the form into view
    moduleCl.scrollToView();

    // Upload the Form
    await model.uploadQueryForm(receivedData);

    // Display Thankyou Message
    moduleCl.renderResponseMessage(
      RESPONSE_TYPE.MESSAGE,
      `Your message titled <i>"${model.state.contact.message.subject}"</i> has been sent.<br>Thankyou for reaching out to Me. 😊`
    );
  } catch (err) {
    // Render Help Text
    moduleCl.renderHelpText();

    // Remove Loading Animation from Submit Button
    moduleCl.renderLoaderBtn(false);
  }
};

/**
 * @description Render the Contact Me form
 */
const controlContactForm = function (moduleCl) {
  moduleCl.renderHTML();
};

/**
 * @description Display the social account used by user
 */
const controlSocialAccountView = async function (moduleCl) {
  try {
    // Loading Animation
    moduleCl.renderSkeleton(3);

    // Fetch Data
    await model.fetchUserSocialAccount();

    // Render Data
    moduleCl.render(model.state.contact.socialAccount);
  } catch (err) {
    // Render Error
    moduleCl.renderResponseMessage(RESPONSE_TYPE.ERROR, err);
  }
};

//////////////////////////////////////////////////////////////////////////////////
/////////////////////////// ABOUT PAGE ////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
/**
 * @description Fetch and display personal info of user
 */
const controlPersonalDetail = async function (moduleCl) {
  try {
    // Loading Animation
    moduleCl.renderSkeleton(10);

    // Fetch Data
    await model.fetchUserPersonalDetail();

    // Render Data
    moduleCl.render(model.state.about.personalDetail);

    // Attach CV Button
    moduleCl.attachCVButton(model.state.about.personalDetail.cv);
  } catch (err) {
    // Render Error
    moduleCl.renderResponseMessage(RESPONSE_TYPE.ERROR, err);
  }
};

/**
 * @description Fetch and display education detail of user
 */
const controlEducationTimeline = async function (moduleCl) {
  try {
    // Loading Animation
    moduleCl.renderSkeleton(3);

    // Fetch Data
    await model.fetchUserEducationDetail();

    // Render Data
    moduleCl.render(model.state.about.education);
  } catch (err) {
    // Render Error
    moduleCl.renderResponseMessage(RESPONSE_TYPE.ERROR, err);
  }
};

/**
 * @description Fetch and display skills detail of user
 */
const controlSkillView = async function (moduleCl) {
  try {
    // Loading Animation
    moduleCl.renderSkeleton(1);

    // Fetch Data
    await model.fetchUserSkillDetail();

    // Render Data
    moduleCl.render(model.state.about.skill);
  } catch (err) {
    // Render Error
    moduleCl.renderResponseMessage(RESPONSE_TYPE.ERROR, err);
  }
};

/**
 * @description Fetch and display work experience detail of user
 */
const controlExperienceView = async function (moduleCl) {
  try {
    // Loading Animation
    moduleCl.renderSkeleton(1);

    // Fetch Data
    await model.fetchUserExperienceDetail();

    // Render Data
    moduleCl.render(model.state.about.experience);
  } catch (err) {
    // Render Error
    moduleCl.renderResponseMessage(RESPONSE_TYPE.ERROR, err);
  }
};

/**
 * @description Customizes and opens model-window for Experience Detail
 */
const controlExperienceModel = async function (id) {
  const params = {
    model: document.querySelector('#normal-model.model'),
    overlay: document.querySelector('.overlay'),
  };
  const modelCl = new PopupModel(params.model, params.overlay);
  const dataHead = `<h4>Internship Experience</h4>`;
  let dataBody = '';

  try {
    // Open Model and show Loading Animation
    modelCl.customize().renderSpinner().open();

    // Fetch Data
    await model.fetchUserExperienceDetail(id);

    // Render Data
    dataBody = `
    <div class="experience-description animate-opacity">
    ${model.state.about.experience.detail}
    </div>
    `;
  } catch (err) {
    const markup = experienceView.renderResponseMessage(
      RESPONSE_TYPE.ERROR,
      err,
      false
    );
    dataBody = markup;
  } finally {
    setTimeout(function () {
      modelCl.render(dataBody, dataHead);
    }, 250);
  }
};

/**
 * @description Fetch and display awards of the user
 */
const controlAwardView = async function (moduleCl) {
  try {
    // Loading Animation
    moduleCl.renderSkeleton(1);

    // Fetch Data
    await model.fetchUserAwardDetail();

    // Render Data
    moduleCl.render(model.state.about.award);
  } catch (err) {
    // Render Error
    moduleCl.renderResponseMessage(RESPONSE_TYPE.ERROR, err);
  }
};

/**
 *
 * @param {DOMElement} imgElem
 * @description Attach image and show in model
 */
const controlImageView = async function (imgElem) {
  const imgPath = imgElem.dataset.src;
  const params = {
    model: document.querySelector('#img-model.model'),
    overlay: document.querySelector('.overlay'),
    width: '90%',
    height: '75vh',
    background: 'transparent',
  };
  const modelCl = new PopupModel(params.model, params.overlay);
  let dataBody = '';

  try {
    // Open Model and show loading animation
    modelCl
      .customize(params.width, params.height, params.background)
      .renderSpinner()
      .open();

    // Create Image
    const module = await import('./loadCreateImg.js');
    const newImg = await module.createImg(
      imgPath,
      ['view-img'],
      imgElem.getAttribute('alt')
    );

    // Attach Image to Div Element
    const divEl = document.createElement('div');
    divEl.className = 'img--div';
    divEl.insertAdjacentElement('afterbegin', newImg);
    dataBody = divEl.innerHTML;
  } catch (err) {
    const markup = awardView.renderResponseMessage(
      RESPONSE_TYPE.ERROR,
      err,
      false
    );
    dataBody = markup;
  } finally {
    modelCl.render(dataBody);
  }
};

//////////////////////////////////////////////////////////////////////////////////
/////////////////////////// PROJECT PAGE ////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param {*} moduleCl
 * @description Fetch and display Mentor
 */
const controlMentorView = async function (moduleCl) {
  try {
    // Loading Animation
    moduleCl.renderSkeleton(1);

    // Fetch Data
    await model.fetchUserMentor();

    // Render Data
    moduleCl.render(model.state.project.mentor);
  } catch (err) {
    // Render Error
    moduleCl.renderResponseMessage(RESPONSE_TYPE.ERROR, err);
  }
};

export const defaultInit = async function () {
  const navbarModule = await import('./views/navbarView.js');
  navbarModule.default.setActivePageNavLink(window.currPage);
  navbarModule.default.addHandlerThemeModelBtn(controlThemeModelBtn);
};

export const homeInit = async function () {
  paletteView.render();
  paletteView.addHandlerThemePickerBtn(controlThemePickerBtn);
  paletteView.setActiveThemeClass(window.currPageTheme);
};

export const contactInit = async function () {
  const contactDetailModule = await import(
    './views/contact/contactDetailView.js'
  );
  const contactFormModule = await import('./views/contact/contactFormView.js');
  const socialAccountModule = await import(
    './views/contact/socialMediaView.js'
  );
  contactDetailModule.default.addHandlerRender(controlContactDetail);
  contactFormModule.default.addHandlerRender(controlContactForm);
  contactFormModule.default.addHandlerSubmit(controlContactFormSubmission);
  socialAccountModule.default.addHandlerRender(controlSocialAccountView);
};

export const aboutInit = async function () {
  const personalDetailModule = await import(
    './views/about/personalDetalView.js'
  );
  const educationModule = await import(
    './views/about/educationTimelineView.js'
  );
  const skillModule = await import('./views/about/skillView.js');
  const experienceModule = await import('./views/about/experienceView.js');
  const awardModule = await import('./views/about/awardView.js');

  personalDetailModule.default.addHandlerRender(controlPersonalDetail);
  educationModule.default.addHandlerRender(controlEducationTimeline);
  skillModule.default.addHandlerRender(controlSkillView);
  experienceModule.default.addHandlerRender(controlExperienceView);
  experienceModule.default.addHandlerExperienceModelBtn(controlExperienceModel);
  awardModule.default.addHandlerRender(controlAwardView);
  awardModule.default.addHandlerImageView(controlImageView);
};

export const projectInit = async function () {
  const mentorModule = await import('./views/project/mentorView.js');
  mentorModule.default.addHandlerRender(controlMentorView);
};
