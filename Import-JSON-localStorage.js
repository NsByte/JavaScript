localStorage.clear();
var data = {'<JSON CAPTURED LOCALSTORAGE>'};

Object.keys(data).forEach(function (k) {
  localStorage.setItem(k, data[k]);
});
