const fs = require('fs');

function readJSONFile(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf8', (err, dataJSON) => {
      if (err) {
        reject(err);
      };

      try {
        resolve(JSON.parse(dataJSON));
      } catch (err) {
        reject(err);
      }
    });
  });
}

function writeJSONFile(fileName, data) {
  return new Promise((resolve, reject) => {
    try {
      const dataJSON = JSON.stringify(data);
      fs.writeFile(fileName, dataJSON, (err) => {
        if (err) {
          reject(err);
        };

        resolve();
      });
    } catch (err) {
      reject(err);
    }
  });
}


module.exports = {
  readJSONFile,
  writeJSONFile,
};
