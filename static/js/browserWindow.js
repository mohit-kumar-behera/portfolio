class BrowserWindow {
  static _dimension;

  static _setWindowDimension() {
    const popupWidth = screen.width / 2;
    const popupHeight = screen.height - 100;
    const leftPadding = screen.width / 2 - popupWidth / 2;
    const topPadding = screen.height / 2 - popupHeight / 2;
    BrowserWindow._dimension = [
      popupWidth,
      popupHeight,
      topPadding,
      leftPadding,
    ];
  }

  static open(sharerURL) {
    BrowserWindow._setWindowDimension();
    const [width, height, topPad, leftPad] = BrowserWindow._dimension;
    window.open(
      sharerURL,
      'SocialShareWindow',
      'height=' +
        height +
        ',width=' +
        width +
        ',left=' +
        leftPad +
        ',top=' +
        topPad +
        ',resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,directories=no,status=yes'
    );
  }
}

export default BrowserWindow;
