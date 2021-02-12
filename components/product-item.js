// product-item.js

class ProductItem extends HTMLElement {
  
  // Part 3) Creating the custom component

  /* <!-- Sample Product -->
    < li class="product">
        <img src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" alt="Fjallraven - Foldstack No. 1 Backpack, Fits 15 Laptops" width=200>
        <p class="title">Fjallraven - Foldstack No. 1 Backpack, Fits 15 Laptops</p>
        <p class="price">$109.95</p>
        <button onclick="alert('Added to Cart!')">Add to Cart</button>
    </li>
  */

  constructor() {
    super();
    // Create a shadow root
    this.attachShadow({mode: 'open'});

    // If all attributes are filled out, generate html
    if (this.hasAttribute('img') && this.hasAttribute('title') && this.hasAttribute('price') && this.hasAttribute('id')) {
      this.construct();
    }
  }

  /** Separate constuct function to handle addition of attributes after initial generation of element 
   *  Must be called after attribute assignment!
  */
  construct() {
    // <li class="product">
    const product = document.createElement('li');
    product.setAttribute('class', 'product');

      // <img src="img link" alt="img description" width=200>
      const img = product.appendChild(document.createElement('img'));
      img.setAttribute('src', this.getAttribute('img'));
      img.setAttribute('alt', this.getAttribute('title'));
      img.setAttribute('width', 200);

      // <p class="title">item title</p>
      const title = product.appendChild(document.createElement('p'));
      title.setAttribute('class', 'title');
      title.textContent = this.getAttribute('title');

      // <p class="price">item price</p>
      const price = product.appendChild(document.createElement('p'));
      price.setAttribute('class', 'price');
      price.textContent = '$' + this.getAttribute('price');
      
      // <button onclick="alert('Added to Cart!')">Add to Cart</button>
      const cartButton = product.appendChild(document.createElement('button'));
      cartButton.setAttribute('onclick', "alert('Added to Cart!')");
      const id = this.getAttribute('id');

      // check if is already added to cart or not
      cartCheck(cartButton, id);

      // Part 5) Increment and decrement cart contents/add and remove items from cart
      cartButton.addEventListener('click', function () {
        if (cartButton.textContent === 'Add to Cart')
              { addToCart(cartButton, id); }
        else  { removeFromCart(cartButton, id); }
      });

    // copied over css styling
    const style = document.createElement('style');
    style.textContent = `
      /* Custom Element CSS starts here */

      .price {
        color: green;
        font-size: 1.8em;
        font-weight: bold;
        margin: 0;
      }
      
      .product {
        align-items: center;
        background-color: white;
        border-radius: 5px;
        display: grid;
        grid-template-areas: 
        'image'
        'title'
        'price'
        'add';
        grid-template-rows: 67% 11% 11% 11%;
        height: 450px;
        filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
        margin: 0 30px 30px 0;
        padding: 10px 20px;
        width: 200px;
      }
      
      .product > button {
        background-color: rgb(255, 208, 0);
        border: none;
        border-radius: 5px;
        color: black;
        justify-self: center;
        max-height: 35px;
        padding: 8px 20px;
        transition: 0.1s ease all;
      }
      
      .product > button:hover {
        background-color: rgb(255, 166, 0);
        cursor: pointer;
        transition: 0.1s ease all;
      }
      
      .product > img {
        align-self: center;
        justify-self: center;
        width: 100%;
      }
      
      .title {
        font-size: 1.1em;
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      
      .title:hover {
        font-size: 1.1em;
        margin: 0;
        white-space: wrap;
        overflow: auto;
        text-overflow: unset;
      }
      
      /* Custom Element CSS Ends Here */ `;
      
      // attach the created elements to the shadow DOM
      this.shadowRoot.appendChild(style);
      this.shadowRoot.appendChild(product);
  }

}

// Part 6) Persistent cart
function cartCheck (button, id) {
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  if (cart[id - 1] == 1) {
    addToCart(button, id);
  } else {
    button.textContent = 'Add to Cart';
  }
};

function addToCart(button, id) {
  let cartCount = document.getElementById('cart-count');
  cartCount.innerHTML = parseInt(cartCount.innerHTML) + 1;

  let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart[id - 1] = 1;
  window.localStorage.setItem('cart', JSON.stringify(cart));

  button.textContent = 'Remove from Cart';
};

function removeFromCart(button, id) {
  let cartCount = document.getElementById('cart-count');
  cartCount.innerHTML = parseInt(cartCount.innerHTML) - 1;

  let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart[id - 1] = 0;
  window.localStorage.setItem('cart', JSON.stringify(cart));

  button.textContent = 'Add to Cart';
};

customElements.define('product-item', ProductItem);
