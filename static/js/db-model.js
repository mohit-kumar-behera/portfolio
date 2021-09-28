import { sendRequest } from './helper.js';

export const state = {
  contact: {
    detail: [],
    socialAccount: [],
    message: {},
  },
  about: {
    personalDetail: [],
  },
};

export const fetchUserSocialAccount = async function () {
  try {
    const responseData = await sendRequest('/api/user/contact/social-account');
    state.contact.socialAccount = responseData.data;
  } catch (err) {
    throw err;
  }
};

export const fetchUserContactDetail = async function () {
  try {
    const responseData = await sendRequest('/api/user/contact');
    state.contact.detail = responseData.data;
  } catch (err) {
    throw err;
  }
};

export const uploadQueryForm = async function (formData) {
  try {
    const responseData = await sendRequest(
      '/api/user/contact/send-message/',
      formData,
      'post'
    );
    state.contact.message = responseData.data;
  } catch (err) {
    throw err;
  }
};

export const fetchUserPersonalDetal = async function () {
  try {
    const responseData = await sendRequest('/api/user/about');
    state.about.personalDetail = responseData.data;
  } catch (err) {
    throw err;
  }
};
