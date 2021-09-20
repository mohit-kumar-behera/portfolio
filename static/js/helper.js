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

export const sendRequest = async function (url, uploadData, method = 'get') {
  try {
    const fetchPro =
      method === 'post'
        ? fetch(url, {
            method,
            headers: {
              'Content-Type': 'application/json',
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
