import { sendRequest } from './helper.js';

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
    cv: {
      displayName: 'View CV',
      url: data.cv,
    },
  };
};

export const state = {
  contact: {
    detail: [],
    socialAccount: [],
    message: {},
  },
  about: {
    personalDetail: {},
    education: [],
    skill: [],
    experience: [],
    award: [],
  },
  project: {
    mentor: [],
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

export const fetchUserPersonalDetail = async function () {
  try {
    const responseData = await sendRequest('/api/user/about');
    state.about.personalDetail = createUserPersonalData(responseData.data);
  } catch (err) {
    throw err;
  }
};

export const fetchUserEducationDetail = async function () {
  try {
    const responseData = await sendRequest('/api/user/about/education');
    state.about.education = responseData.data;
  } catch (err) {
    throw err;
  }
};

export const fetchUserSkillDetail = async function () {
  try {
    const responseData = await sendRequest('/api/user/about/skill');
    state.about.skill = responseData.data;
  } catch (err) {
    throw err;
  }
};

export const fetchUserExperienceDetail = async function (id) {
  try {
    const responseData = id
      ? await sendRequest(`/api/user/about/work-experience/c/${id}`)
      : await sendRequest('/api/user/about/work-experience');
    state.about.experience = responseData.data;
  } catch (err) {
    throw err;
  }
};

export const fetchUserAwardDetail = async function (id) {
  try {
    const responseData = id
      ? await sendRequest(`/api/user/about/award/${id}`)
      : await sendRequest('/api/user/about/award');
    state.about.award = responseData.data;
  } catch (err) {
    throw err;
  }
};

export const fetchUserMentor = async function () {
  try {
    const responseData = await sendRequest('/api/user/mentor');
    state.project.mentor = responseData.data;
  } catch (err) {
    throw err;
  }
};
