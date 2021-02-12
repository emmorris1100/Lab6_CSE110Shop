// Script.js

window.addEventListener('DOMContentLoaded', () => {
  
  // Part 1) Fetch Data as array of JavaScript objects
  async function fetchData() {
    return fetch('https://fakestoreapi.com/products')
      .then(response => response.json());
  };
  
  // Part 2) Store Data in local storage if it has not been stored already
  if (localStorage.getItem("itemData") === null) {
    fetchData()
      .then(
        // Store and render data on initial load
        function (items) {
          window.localStorage.setItem('itemData', JSON.stringify(items));
          renderData();
        }
      )
  
  // render data if already in storage
  } else {
    renderData();
  }

  // Part 4) Generate product-item for all fetched items
  function renderData(){
    let product_arr = JSON.parse(localStorage.getItem("itemData") || "[]");

    let product_list = document.getElementById('product-list');
    
    for(const product of product_arr) {
      const item = document.createElement('product-item');
      
      item.setAttribute('img',   product.image);
      item.setAttribute('title', product.title);
      item.setAttribute('price', product.price);

      item.construct();
      
      product_list.appendChild(item);
    }
  };

});
