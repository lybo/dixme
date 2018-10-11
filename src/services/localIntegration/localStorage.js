import utils from '../../utils/';
const EXTENSION_LOCAL_STORAGE = 'EXTENSION_LOCAL_STORAGE';
const LOCAL_STORAGE = 'LOCAL_STORAGE';
const browser = utils.getBrowser();
const service = browser && browser.storage && browser.storage.local ? EXTENSION_LOCAL_STORAGE : LOCAL_STORAGE;

const methods = {};
methods[LOCAL_STORAGE] = {
  getItem: (keyName) => new Promise((resolve) => {
    const keyValue = window.localStorage.getItem(keyName);
    resolve(JSON.parse(keyValue));
  }),
  setItem: (keyName, keyValue) => new Promise((resolve) => {
    window.localStorage.setItem(keyName, JSON.stringify(keyValue));
    resolve(keyValue);
  }),
  removeItem: (keyName) => new Promise((resolve) => {
    window.localStorage.removeItem(keyName);
    resolve();
  }),
};
methods[EXTENSION_LOCAL_STORAGE] = {
  getItem: (keyName) => {
    return new Promise((resolve) => {
      browser.storage.local.get([keyName], (result) => {
        resolve(result[keyName]);
      });
    });
  },
  setItem: (keyName, keyValue) => {
    return new Promise((resolve) => {
      browser.storage.local.set({
        [keyName]: keyValue,
      }, () => resolve(keyValue));
    });
  },
  removeItem: (keyName) => {
    return new Promise((resolve, reject) => {
      browser.storage.local.remove([keyName], () => {
        var error = browser.runtime.lastError;
        if (error) {
          reject(error);
        }
        resolve();
      })
    });
  },
};


export default methods[service];
