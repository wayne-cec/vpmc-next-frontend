
const toggleFullScreen = () => {
  if (!document.fullscreenElement &&    // alternative standard method
    // @ts-ignore
    !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
      // @ts-ignore
    } else if (document.documentElement.msRequestFullscreen) {
      // @ts-ignore
      document.documentElement.msRequestFullscreen();
      // @ts-ignore
    } else if (document.documentElement.mozRequestFullScreen) {
      // @ts-ignore
      document.documentElement.mozRequestFullScreen();
      // @ts-ignore
    } else if (document.documentElement.webkitRequestFullscreen) {
      // @ts-ignore
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      // @ts-ignore
    } else if (document.msExitFullscreen) {
      // @ts-ignore
      document.msExitFullscreen();
      // @ts-ignore
    } else if (document.mozCancelFullScreen) {
      // @ts-ignore
      document.mozCancelFullScreen();
      // @ts-ignore
    } else if (document.webkitExitFullscreen) {
      // @ts-ignore
      document.webkitExitFullscreen();
    }
  }
}

export default toggleFullScreen
