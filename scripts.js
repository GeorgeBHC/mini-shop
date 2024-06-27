const products = [
  { id: 1, name: "Carte", price: 10, stock: 5, image: "pictures/book.jpeg" },
  { id: 2, name: "Husa", price: 20, stock: 5, image: "pictures/case.jpeg" },
  { id: 3, name: "Ochelari", price: 30, stock: 5, image: "pictures/glasses.png" },
];

let cart = [];

// functie pt afisaj produse
function renderProducts() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = products
    .map(
      (product) => `
          <div class="col-md-4 mb-4">
              <div class="card h-100">
                  <img src="${product.image}" class="card-img-top" alt="${product.name}">
                  <div class="card-body d-flex flex-column">
                      <h5 class="card-title">${product.name}</h5>
                      <p class="card-text product-description">${product.description || ''}</p>
                      <p class="card-text">$${product.price}</p>
                      <p class="card-text">Stock: ${product.stock}</p>
                      <button class="btn btn-primary mt-auto add-to-cart" data-id="${product.id}">Add to Cart</button>
                  </div>
              </div>
          </div>
      `
    )
    .join("");

  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = parseInt(event.target.getAttribute("data-id"));
      addToCart(productId);
    });
  });
}

// functie pt afisare produse in cos
function renderCart() {
  const cartList = document.getElementById("cart-list");
  cartList.innerHTML =
    cart
      .map(
        (item) => `
          <li class="list-group-item d-flex justify-content-between align-items-center">
              ${item.name} - $${item.price} x ${item.quantity}
              <button class="btn btn-danger btn-sm remove-from-cart" data-id="${item.id}">Remove</button>
          </li>
      `
      )
      .join("");

  document.querySelectorAll(".remove-from-cart").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = parseInt(event.target.getAttribute("data-id"));
      removeFromCart(productId);
    });
  });

  updateCartCount();
}

// functie pt adaugare produse in cos 
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);

  if (!product) {
    alert("Product not found!");
    return;
  }

  const existingItem = cart.find((item) => item.id === productId);
  if (existingItem) {
    if (existingItem.quantity < product.stock) {
      existingItem.quantity++;
    } else {
      alert("No more stock available for this product.");
    }
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
}

// functie pt stergerea produselor din cos 
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  renderCart();
}

// modal checkout(intreaba)
function checkout() {
  const modal = new bootstrap.Modal(document.getElementById('orderModal'));
  modal.show();
}

// functie finalizare comanda
function completeOrder() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let total = 0;
  let boughtProducts = "";

  for (let i = 0; i < cart.length; i++) {
    const price = Number(cart[i].price); 
    total += price * cart[i].quantity;
    boughtProducts += `${cart[i].name} (x${cart[i].quantity})\n`;
  }

  alert(`Your total is $${total}. Thank you for your purchase!\nProducts bought:\n${boughtProducts}`);

  cart.length = 0; 
  renderCart();
}

// functie actualizare produse
function updateCartCount() {
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
  document.getElementById("cart-count").textContent = cartCount;
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  document.getElementById("cart-total").textContent = cartTotal;
}

document.getElementById("empty-cart-btn").addEventListener("click", () => {
  cart = [];
  renderCart();
});

document.getElementById("checkout-btn").addEventListener("click", checkout);
document.getElementById("confirm-order-btn").addEventListener("click", completeOrder);

renderProducts();

