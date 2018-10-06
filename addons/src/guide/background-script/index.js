const brow = /Chrome/.test(navigator.userAgent) ? window.chrome : window.browser;

brow.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'update') {
    return;
  }

  brow.tabs.create({
    active: true,
    url: 'https://github.com/constfun/create-react-WebExtension/blob/master/packages/react-scripts/template/README.md',
  });
});
