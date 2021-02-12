// Script.js

window.addEventListener('DOMContentLoaded', () => {
  
  // Part 1) Fetch Data as array of JavaScript objects
  function fetchData() {
    return fetch('https://fakestoreapi.com/products')
      .then(response => response.json());
  };
  
  // Part 2) Store Data in local storage if it has not been stored already
  if (localStorage.getItem("itemData") === null) {
    fetchData()
      .then(items => window.localStorage.setItem('itemData', JSON.stringify(items)));
  };

});