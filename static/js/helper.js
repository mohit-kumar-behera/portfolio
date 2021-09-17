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
