const timeout = function (sec = 5) {
  return new Promise((_, reject) => {
    setTimeout(function () {
      reject(
        new Error(
          `Request took too long! Timeout after ${sec} second. Please have a stable internet connection and then refresh the page.`
        )
      );
    }, sec * 1000);
  });
};

const getCookie = function (cookieName) {
  const unicodeCookies = decodeURIComponent(document.cookie);
  const cookies = unicodeCookies.split(';');

  // pair cookies by key, value pair and convert them to object
  const cookiesPair = cookies.map(cookie => {
    let [key, value] = cookie.split('=');
    key = key.trim();
    return [key, value];
  });
  const cookiesObj = Object.fromEntries(cookiesPair);

  return cookiesObj[cookieName];
};

export const detectMobile = function () {
  const mobileOS = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];

  return new Promise(resolve => {
    let mobileDevice = false;
    mobileOS.some(os => {
      if (navigator.userAgent.match(os)) {
        mobileDevice = true;
        return;
      }
    });
    resolve({ mobileDevice: mobileDevice });
  });
};

export const palette = [
  '#913ee8',
  '#01937c',
  '#fa1e0e',
  '#a0522d',
  '#ef5742',
  '#f97194',
  '#ffae00',
  '#73a528',
  '#fe4c03',
  '#0556f3',
];

export const setTheme = function (newColor, currPage) {
  /* Update the Theme Pattern */
  const DEFAULT_THEME = '#fa1e0e';
  if (!newColor || palette.indexOf(newColor) === -1 || newColor === 'null')
    newColor = DEFAULT_THEME;

  localStorage.setItem('theme-color', newColor);
  document.documentElement.style.setProperty('--secondary-color', newColor);

  if (currPage == 'home') {
    import('./views/themePaletteView.js').then(module => {
      module.default.setActiveThemeClass(newColor);
    });
  }
};

export const sendRequest = async function (url, uploadData, method = 'get') {
  try {
    const fetchPro =
      method.toLowerCase() === 'post'
        ? fetch(url, {
            method,
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': getCookie('csrftoken'),
            },
            body: JSON.stringify(uploadData),
          })
        : fetch(url);

    const response = await Promise.race([fetchPro, timeout(10)]);
    let data;
    try {
      data = await response.json();
    } catch (err) {
      throw new Error('Something Went Wrong');
    }
    if (!response.ok)
      throw new Error(data.error?.message ?? 'Something Went Wrong');
    return data;
  } catch (err) {
    throw err;
  }
};
