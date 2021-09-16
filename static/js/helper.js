const handleActiveThemeClass = function (activeTheme) {
  /* Add active class to current Theme button */
  document
    .querySelectorAll('.theme-picker:not(.from-model) .color--btn')
    ?.forEach(btn => btn.classList.remove('active'));
  document
    .querySelector(
      `.theme-picker:not(.from-model) .color--btn[data-color='${activeTheme}']`
    )
    ?.classList.add('active');
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
  currPage === 'home' && handleActiveThemeClass(newColor);
};
