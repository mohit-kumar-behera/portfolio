
const detectMobile = function() {
    const mobileOS = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    return mobileOS.some((os) => {
        return navigator.userAgent.match(os);
    });
};

export default detectMobile;