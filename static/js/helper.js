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

export const setTheme = function (newColor, currPage) {
  /* Update the Theme Pattern */
  localStorage.setItem('theme-color', newColor);
  document.documentElement.style.setProperty('--secondary-color', newColor);

  import('./views/themePaletteView.js').then(module => {
    currPage === 'home' && module.default.setActiveThemeClass(newColor);
  });
};

export const getCookie = function (cookieName) {
  const allCookies = decodeURIComponent(document.cookie);
  const splitCookies = allCookies.split(';');

  // pair cookies by key, value pair
  const pairCookies = splitCookies.map(cookie => cookie.split('='));

  // find the cookie by cookieName
  const foundCookie = pairCookies.find(
    cookie => cookie[0].trim() === cookieName
  );

  if (!foundCookie) return false;

  const [key, value] = foundCookie; // pair the found cookie

  // Remove "" from cookie value (special cases)
  // return value.slice(1, value.length-1);

  return value;
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
    const data = await response.json();

    if (!response.ok) throw new Error(data.error?.message);
    return data;
  } catch (err) {
    throw err;
  }
};
