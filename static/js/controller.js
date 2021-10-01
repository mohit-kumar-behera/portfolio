import paletteView from './views/themePaletteView.js';
import Model from './views/modelView.js';

import socialMediaView from './views/contact/socialMediaView.js';
import contactFormView from './views/contact/contactFormView.js';
import contactDetailView from './views/contact/contactDetailView.js';

import personalDetalView from './views/about/personalDetalView.js';
import educationTimelineView from './views/about/educationTimelineView.js';
import skillView from './views/about/skillView.js';
import experienceView from './views/about/experienceView.js';
import awardView from './views/about/awardView.js';

import * as func from './helper.js';
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

  const modelCl = new Model(params.model, params.overlay);
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
  func.setTheme(elem.dataset.color, window.currPage);
};

//////////////////////////////////////////////////////////////////////////////////
/////////////////////////// CONTACT PAGE ////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/**
 * @description Fetch contact detail of user and displays it
 */
const controlContactDetail = async function () {
  try {
    // Loading Animation
    contactDetailView.renderSkeleton(2);

    // Fetch Data
    await model.fetchUserContactDetail();

    // Render Data
    contactDetailView.render(model.state.contact.detail);
  } catch (err) {
    // Render Error
    contactDetailView.renderResponseMessage(RESPONSE_TYPE.ERROR, err);
  }
};

/**
 * @param {object} receivedData receives the Form Data as object
 * @description Handles Form Submission
 */
const controlContactFormSubmission = async function (receivedData) {
  try {
    // Add Loading Animation to Submit Button
    contactFormView.renderLoaderBtn();

    // Scroll the form into view
    contactFormView.scrollToView();

    // Upload the Form
    await model.uploadQueryForm(receivedData);

    // Display Thankyou Message
    contactFormView.renderResponseMessage(
      RESPONSE_TYPE.MESSAGE,
      `Your message titled <i>"${model.state.contact.message.subject}"</i> has been sent.<br>Thankyou for reaching out to Me. 😊`
    );
  } catch (err) {
    // Render Help Text
    contactFormView.renderHelpText();

    // Remove Loading Animation from Submit Button
    contactFormView.renderLoaderBtn(false);
  }
};

/**
 * @description Render the Contact Me form
 */
const controlContactForm = function () {
  contactFormView.renderHTML();
};

/**
 * @description Display the social account used by user
 */
const controlSocialAccountView = async function () {
  try {
    // Loading Animation
    socialMediaView.renderSkeleton(3);

    // Fetch Data
    await model.fetchUserSocialAccount();

    // Render Data
    socialMediaView.render(model.state.contact.socialAccount);
  } catch (err) {
    // Render Error
    socialMediaView.renderResponseMessage(RESPONSE_TYPE.ERROR, err);
  }
};

//////////////////////////////////////////////////////////////////////////////////
/////////////////////////// ABOUT PAGE ////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
/**
 * @description Fetch and display personal info of user
 */
const controlPersonalDetail = async function () {
  try {
    // Loading Animation
    personalDetalView.renderSkeleton(10);

    // Fetch Data
    await model.fetchUserPersonalDetail();

    // Render Data
    personalDetalView.render(model.state.about.personalDetail);

    // Attach CV Button
    personalDetalView.attachCVButton(model.state.about.personalDetail.cv);
  } catch (err) {
    // Render Error
    personalDetalView.renderResponseMessage(RESPONSE_TYPE.ERROR, err);
  }
};

/**
 * @description Fetch and display education detail of user
 */
const controlEducationTimeline = async function () {
  try {
    // Loading Animation
    educationTimelineView.renderSkeleton(3);

    // Fetch Data
    await model.fetchUserEducationDetail();

    // Render Data
    educationTimelineView.render(model.state.about.education);
  } catch (err) {
    // Render Error
    educationTimelineView.renderResponseMessage(RESPONSE_TYPE.ERROR, err);
  }
};

/**
 * @description Fetch and display skills detail of user
 */
const controlSkillView = async function () {
  try {
    // Loading Animation
    skillView.renderSkeleton(1);

    // Fetch Data
    await model.fetchUserSkillDetail();

    // Render Data
    skillView.render(model.state.about.skill);
  } catch (err) {
    // Render Error
    skillView.renderResponseMessage(RESPONSE_TYPE.ERROR, err);
  }
};

/**
 * @description Fetch and display work experience detail of user
 */
const controlExperienceView = async function () {
  try {
    // Loading Animation
    experienceView.renderSkeleton(1);

    // Fetch Data
    await model.fetchUserExperienceDetail();

    // Render Data
    experienceView.render(model.state.about.experience);
  } catch (err) {
    // Render Error
    experienceView.renderResponseMessage(RESPONSE_TYPE.ERROR, err);
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
  const modelCl = new Model(params.model, params.overlay);
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
    }, 400);
  }
};

/**
 * @description Fetch and display awards of the user
 */
const controlAwardView = async function () {
  try {
    // Loading Animation
    awardView.renderSkeleton(1);

    // Fetch Data
    await model.fetchUserAwardDetail();

    // Render Data
    awardView.render(model.state.about.award);
  } catch (err) {
    // Render Error
    awardView.renderResponseMessage(RESPONSE_TYPE.ERROR, err);
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
  const modelCl = new Model(params.model, params.overlay);
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

export const defaultInit = async function () {
  const navbarModule = await import('./views/navbarView.js');
  navbarModule.default.setActivePageNavLink(window.currPage);
  navbarModule.default.addHandlerThemeModelBtn(controlThemeModelBtn);
};

export const homeInit = function () {
  paletteView.render();
  paletteView.addHandlerThemePickerBtn(controlThemePickerBtn);
  paletteView.setActiveThemeClass(window.currPageTheme);
};

export const contactInit = function () {
  contactDetailView.addHandlerRender(controlContactDetail);
  contactFormView.addHandlerRender(controlContactForm);
  contactFormView.addHandlerSubmit(controlContactFormSubmission);
  socialMediaView.addHandlerRender(controlSocialAccountView);
};

export const aboutInit = function () {
  personalDetalView.addHandlerRender(controlPersonalDetail);
  educationTimelineView.addHandlerRender(controlEducationTimeline);
  skillView.addHandlerRender(controlSkillView);
  experienceView.addHandlerRender(controlExperienceView);
  experienceView.addHandlerExperienceModelBtn(controlExperienceModel);
  awardView.addHandlerRender(controlAwardView);
  awardView.addHandlerImageView(controlImageView);
};
