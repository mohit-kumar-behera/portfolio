import { sendRequest } from './helper.js';

const windowWidth = window.innerWidth;

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

export const socialSharer = [
  {
    name: 'facebook',
    sharerURL: 'https://www.facebook.com/sharer/sharer.php?u=',
  },
  {
    name: 'whatsapp',
    sharerURL: 'https://wa.me/?text=',
  },
  {
    name: 'linkedin',
    sharerURL: 'https://www.linkedin.com/shareArticle?mini=true&url=',
  },
  {
    name: 'twitter',
    sharerURL: 'https://twitter.com/intent/tweet?url=',
  },
];

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
    list: {
      tag: 'all',
      items: [],
      totalResults: 0,
      currPage: 1,
      resultsPerPage: windowWidth > 1400 ? 8 : windowWidth > 992 ? 6 : 4,
    },
    detail: {
      content: {},
      images: [],
    },
    projectHighlight: false,
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

export const fetchUserAwardDetail = async function (showAll = false) {
  try {
    const responseData = await sendRequest(
      `/api/user/about/award/?all=${showAll}`
    );
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

const calculatePageRange = page => {
  const start = (page - 1) * state.project.list.resultsPerPage;
  const end = page * state.project.list.resultsPerPage;
  return [start, end];
};

export const fetchProjectList = async function (page, tag) {
  tag = tag || 'all';

  const projList = state.project.list;
  projList.currPage = page;
  projList.tag = tag;
  const [start, end] = calculatePageRange(page);

  try {
    const responseData = await sendRequest(
      `/api/user/project/list/tag/${tag}/s/${start}/e/${end}`
    );
    projList.items = responseData.data;
    projList.totalResults = responseData.results;
  } catch (err) {
    throw err;
  }
};

export const fetchProjectDetail = async function (slug) {
  try {
    const responseData = await sendRequest(`/api/user/project/v/${slug}`);
    state.project.detail.content = responseData.data;
  } catch (err) {
    throw err;
  }
};

export const setProjectHighlighter = async function (id, formData) {
  try {
    const responseData = await sendRequest(
      `/api/user/project/v/${id}/highlight`,
      formData,
      'post'
    );
    state.project.projectHighlight = responseData.data;
  } catch (err) {
    throw err;
  }
};

export const fetchProjectImages = async function (slug) {
  try {
    const responseData = await sendRequest(
      `/api/user/project/v/${slug}/images`
    );
    state.project.detail.images = responseData.data;
  } catch (err) {
    throw err;
  }
};

export const fetchSocialShareOptions = function () {
  return new Promise((resolve, reject) => {
    if (socialSharer) resolve(socialSharer);
    else reject('Something Went Wrong!????');
  });
};
