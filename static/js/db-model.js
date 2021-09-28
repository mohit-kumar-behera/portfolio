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

const createUserPersonalData = data => {
  return {
    firstname: {
      displayName: 'First Name',
      displayVal: data.user.first_name,
    },
    lastname: {
      displayName: 'Last Name',
      displayVal: data.user.last_name,
    },
    dob: {
      displayName: 'DOB',
      displayVal: data.date_of_birth,
    },
    age: {
      displayName: 'Age',
      displayVal: data.other_info.age,
    },
    nationality: {
      displayName: 'Nationality',
      displayVal: data.other_info.address.nationality,
    },
    address: {
      displayName: 'Address',
      displayVal: data.other_info.address.locality,
      url: data.other_info.address.url,
    },
    phone: {
      displayName: 'Phone',
      displayVal: `(+91) ${data.other_info.phone.value}`,
      url: data.other_info.phone.url,
    },
    email: {
      displayName: 'Email',
      displayVal: data.user.email,
      url: `mailto:${data.user.email}`,
    },
    languages: {
      displayName: 'Languages',
      displayVal: ['English', 'Hindi', 'Odiya'].join(', '),
    },
  };
};

export const fetchUserPersonalDetail = async function () {
  try {
    const responseData = await sendRequest('/api/user/about');
    const personalData = createUserPersonalData(responseData.data);
    state.about.personalDetail = personalData;
  } catch (err) {
    throw err;
  }
};
