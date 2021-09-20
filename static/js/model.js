import { sendRequest } from './helper.js';

export const state = {
  contact: {
    socialAccount: [],
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