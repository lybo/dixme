export function getBrowser() {
  const browser = /Chrome/.test(navigator.userAgent) ? window.chrome : window.browser;
  return browser;
}

