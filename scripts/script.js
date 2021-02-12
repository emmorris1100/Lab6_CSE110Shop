// Script.js

window.addEventListener('DOMContentLoaded', () => {
  
  // Part 1) Fetch Data as array of JavaScript objects
  function fetchData() {
    return fetch('https://fakestoreapi.com/products')
      .then(response => response.json());
  };

});