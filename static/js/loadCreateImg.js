export const loadImg = function (imgElem, imgPath) {
  return new Promise((resolve, reject) => {
    imgElem.src = imgPath;

    imgElem.addEventListener('load', () => resolve(imgElem));
    imgElem.addEventListener('error', () =>
      reject(new Error(`Unable to load Image`))
    );
  });
};

export const createImg = function (imgPath, imgClasses, imgAltName) {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.classList = imgClasses.join(' ');
    img.src = imgPath;
    img.alt = imgAltName;

    img.addEventListener('load', () => resolve(img));
    img.addEventListener('error', () =>
      reject(new Error(`Unable to load Image, ${imgAltName}`))
    );
  });
};
