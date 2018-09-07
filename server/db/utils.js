function getList(db, predicate) {
  return new Promise((resolve) => {
    const items = []
    var stream = db.createReadStream({
      keys: true,
      values: true,
    });
    stream.on('data', function (item) {
      if (predicate(item)) {
        items.push(item.value);
      }
    });
    stream.on('close', function () {
      resolve(items);
    });
  });
}

function getListWithKeys(db, predicate) {
  return new Promise((resolve) => {
    const items = []
    var stream = db.createReadStream({
      keys: true,
      values: true,
    });
    stream.on('data', function (item) {
      if (predicate(item)) {
        items.push(item);
      }
    });
    stream.on('close', function () {
      resolve(items);
    });
  });
}

module.exports = {
  getList,
  getListWithKeys,
};
