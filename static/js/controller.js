import paletteView from './views/themePaletteView.js';
import PopupModel from './views/modelView.js';
import * as model from './db-model.js';

const RESPONSE_TYPE = {
  ERROR: 'error',
  MESSAGE: 'message',
};

const wait = sec =>
  new Promise(resolve =>
    setTimeout(function () {
      resolve();
    }, sec * 1000)
  );

///////////////////////////////////////////////////////////////////////////
//////////////////////////// DEFAULT /////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

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

const controlContactForm = function (moduleCl) {
  moduleCl.renderHTML();
};

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

const controlAwardView = async function (moduleCl, showMore = false) {
  let shouldShowAll = false;
  if (!(showMore instanceof Array) && showMore) shouldShowAll = true;

  try {
    // Loading Animation
    moduleCl.renderSkeleton(1);

    // Fetch Data
    await model.fetchUserAwardDetail(shouldShowAll);

    // Render Data
    if (!(showMore instanceof Array)) await wait(1);
    moduleCl.render(model.state.about.award);
  } catch (err) {
    // Render Error
    moduleCl.renderResponseMessage(RESPONSE_TYPE.ERROR, err);
  }
};

const controlImageView = async function (moduleCl, imgElem) {
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
    const markup = moduleCl.renderResponseMessage(
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

const controlProjectList = async function (moduleCl, params) {
  const tag = location.hash.slice(1).replace(/-/g, ' ');
  const [page = 1] = params;

  try {
    // Loading Animation
    moduleCl.renderSkeleton(2);

    // Fetch Data
    await model.fetchProjectList(page, tag);

    // Render Data
    moduleCl.render(model.state.project.list.items);

    // Render Pagination
    const paginationModule = await import('./views/project/paginationView.js');
    paginationModule.default.addHandlerRender(
      controlProjectPagination,
      model.state.project.list
    );
  } catch (err) {
    // Render Error
    moduleCl.renderResponseMessage(RESPONSE_TYPE.ERROR, err);
  } finally {
    // Scroll Up to Top
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
};

const controlProjectPagination = async function (moduleCl, params) {
  const [modelProjList] = params;
  try {
    // Render Pagination
    moduleCl.render(modelProjList);
  } catch (err) {
    // Render Error
    moduleCl.renderResponseMessage(RESPONSE_TYPE.ERROR, err);
  }
};

const controlPaginationBtn = async function (goToPage) {
  const projectListModule = await import('./views/project/projectListView.js');
  projectListModule.default.addHandlerRender(controlProjectList, goToPage);
};

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

const controlProjectDetailView = async function (moduleCl) {
  // Extract Slug from URL
  const splitUrl = location.pathname.split('/');
  const slug = splitUrl[splitUrl.length - 2];
  try {
    // Loading Animation
    moduleCl.renderSkeleton(1);

    // Fetch Data
    await model.fetchProjectDetail(slug);

    // Render Data
    moduleCl.render(model.state.project.detail.content);

    return [slug, model.state.project.detail.content.video_url];
  } catch (err) {
    // Render Error
    moduleCl.renderResponseMessage(RESPONSE_TYPE.ERROR, err);
  }
};

const controlProjectImage = async function (moduleCl, params) {
  try {
    // Destructure Params
    const [slug] = params;
    if (!params.length || !slug) throw new Error('Something Went Wrong!😔');

    // Loading Animation
    moduleCl.renderSkeleton(1);

    // Fetch Data
    await model.fetchProjectImages(slug);

    // Render Data
    moduleCl.render(model.state.project.detail.images);
  } catch (err) {
    // Render Error
    moduleCl.renderResponseMessage(RESPONSE_TYPE.ERROR, err);
  }
};

const controlProjectVideo = async function (moduleCl, params) {
  try {
    // Loading Animation
    moduleCl.renderSkeleton(1);

    // Render Data
    moduleCl.render(params);
  } catch (err) {
    // Render Error
    moduleCl.renderResponseMessage(RESPONSE_TYPE.ERROR, err);
  }
};

const controlSocialShareView = async function (moduleCl) {
  try {
    // Loading Animation
    moduleCl.renderSkeleton(1);

    // Fetch Data
    const data = await model.fetchSocialShareOptions();

    // Render Data
    moduleCl.render(data);
  } catch (err) {
    // Render Error
    moduleCl.renderResponseMessage(RESPONSE_TYPE.ERROR, err);
  }
};

const controlShareBtn = async function (account) {
  // Find account
  const shareTo = model.socialSharer.find(acc => acc.name === account);

  // Encode SharerURL
  const currURL = encodeURIComponent(location.href);
  const shareToURL = `${shareTo.sharerURL}${currURL}`;

  // Open Browser window to share
  const browserWindowModule = await import('./browserWindow.js');
  browserWindowModule.default.open(shareToURL);
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
  awardModule.default.addHandlerShowMoreBtn(controlAwardView);
};

export const projectInit = async function () {
  const defaultPage = 1;
  const projectListModule = await import('./views/project/projectListView.js');
  const mentorModule = await import('./views/project/mentorView.js');
  const paginationModule = await import('./views/project/paginationView.js');

  projectListModule.default.addHandlerRender(controlProjectList, defaultPage);
  projectListModule.default.addHandlerHashChange(
    controlProjectList,
    defaultPage
  );
  paginationModule.default.addHandlerPaginationBtn(controlPaginationBtn);
  mentorModule.default.addHandlerRender(controlMentorView);
};

export const projectDetailInit = async function () {
  if (!document.querySelector('.project-detail')) return;

  const projectDetailModule = await import(
    './views/project/projectDetailView.js'
  );
  const projectImageModule = await import(
    './views/project/projectImageView.js'
  );
  const projectVideoModule = await import(
    './views/project/projectVideoView.js'
  );
  const projectShareModule = await import('./views/project/socialShareView.js');

  const [slug, video_url] = await projectDetailModule.default.addHandlerRender(
    controlProjectDetailView
  );
  projectDetailModule.default.addHandlerImageView(controlImageView);
  projectImageModule.default.addHandlerRender(controlProjectImage, slug);
  projectImageModule.default.addHandlerImageView(controlImageView);
  projectVideoModule.default.addHandlerRender(controlProjectVideo, video_url);
  projectShareModule.default.addHandlerRender(controlSocialShareView);
  projectShareModule.default.addHandlerClick(controlShareBtn);
};
