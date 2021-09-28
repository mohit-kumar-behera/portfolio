import navbarView from './views/navbarView.js';

import paletteView from './views/themePaletteView.js';
import Model from './views/modelView.js';

import socialMediaView from './views/contact/socialMediaView.js';
import contactFormView from './views/contact/contactFormView.js';
import contactDetailView from './views/contact/contactDetailView.js';

import personalDetalView from './views/about/personalDetalView.js';
import educationTimelineView from './views/about/educationTimelineView.js';
import skillView from './views/about/skillView.js';

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

  let modelCl = new Model(params.model, params.overlay);
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

export const defaultInit = function () {
  navbarView.setActivePageNavLink(window.currPage);
  navbarView.addHandlerThemeModelBtn(controlThemeModelBtn);
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
};
