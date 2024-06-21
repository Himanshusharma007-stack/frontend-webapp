function saveInLocalstorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getDatafromLocalstorage(key) {
  let data = localStorage.getItem(key);
  return JSON.parse(data);
}

export default { saveInLocalstorage, getDatafromLocalstorage };
