// ============================================================
// script.js — Cart management + Search
// ============================================================

let cart = JSON.parse(localStorage.getItem('buyit_cart')) || [];

// ---- ADD TO CART ----
function addToCart(id, name, price, image) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        const cleanPrice = parseFloat(String(price).replace(/[^0-9.-]+/g, ""));
        cart.push({ id, name, price: cleanPrice, image, quantity: 1 });
    }
    saveCart();
    showCartToast(name);
}

// ---- REMOVE FROM CART ----
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    renderCart();
}

// ---- UPDATE QUANTITY ----
function updateQuantity(id, newQuantity) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity = parseInt(newQuantity);
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            saveCart();
            renderCart();
        }
    }
}

// ---- SAVE TO LOCALSTORAGE ----
function saveCart() {
    localStorage.setItem('buyit_cart', JSON.stringify(cart));
}

// ---- TOAST NOTIFICATION (replaces alert) ----
function showCartToast(productName) {
    // Remove any existing toast
    const existing = document.getElementById('cart-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'cart-toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <strong>${productName}</strong> added to cart`;
    document.body.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add('toast-visible'), 10);
    setTimeout(() => {
        toast.classList.remove('toast-visible');
        setTimeout(() => toast.remove(), 400);
    }, 2500);
}

// ---- RENDER CART PAGE ----
function renderCart() {
    const cartContainer  = document.getElementById('cart-items-container');
    const subtotalElement = document.getElementById('cart-subtotal');
    const totalElement   = document.getElementById('cart-total');
    const checkoutBtn    = document.querySelector('.checkout-btn');

    if (!cartContainer) return;

    cartContainer.innerHTML = '';
    let subtotal = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fa-solid fa-cart-shopping"></i>
                <h3>Your cart is empty</h3>
                <p>Looks like you haven't added anything yet.</p>
                <a href="products.html" class="btn" style="width:auto;display:inline-block;padding:10px 30px;margin-top:15px;">Start Shopping</a>
            </div>
        `;
        if (subtotalElement) subtotalElement.innerText = '₹0.00';
        if (totalElement)    totalElement.innerText    = '₹0.00';
        if (checkoutBtn)     checkoutBtn.disabled      = true;
        return;
    }

    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        const itemHTML = `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p class="price">₹${item.price.toLocaleString('en-IN')}</p>
                </div>
                <div class="item-actions">
                    <div class="qty-control">
                        <button onclick="updateQuantity('${item.id}', ${item.quantity - 1})" class="qty-btn">−</button>
                        <span class="qty-display">${item.quantity}</span>
                        <button onclick="updateQuantity('${item.id}', ${item.quantity + 1})" class="qty-btn">+</button>
                    </div>
                    <button onclick="removeFromCart('${item.id}')" class="remove-btn">
                        <i class="fa-solid fa-trash"></i> Remove
                    </button>
                </div>
            </div>
        `;
        cartContainer.innerHTML += itemHTML;
    });

    const formatted = '₹' + subtotal.toLocaleString('en-IN');
    if (subtotalElement) subtotalElement.innerText = formatted;
    if (totalElement)    totalElement.innerText    = formatted;
    if (checkoutBtn)     checkoutBtn.disabled      = false;
}

// ---- CHECKOUT BUTTON → checkout.html ----
window.addEventListener('DOMContentLoaded', () => {
    renderCart();

    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            const currentCart = JSON.parse(localStorage.getItem('buyit_cart')) || [];
            if (currentCart.length === 0) {
                alert('Your cart is empty. Add some items first!');
                return;
            }
            window.location.href = 'checkout.html';
        });
    }
});

// ---- SEARCH ----
window.addEventListener('DOMContentLoaded', () => {
    const searchForm  = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');

    const urlParams   = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q');

    if (searchQuery && window.location.href.includes('products.html')) {
        if (searchInput) searchInput.value = searchQuery;
        executeSearch(searchQuery);
    }

    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchInput.value.trim().toLowerCase();
            if (window.location.href.includes('products.html')) {
                window.history.pushState({}, '', '?q=' + query);
                executeSearch(query);
            } else {
                window.location.href = `products.html?q=${encodeURIComponent(query)}`;
            }
        });
    }
});

function executeSearch(query) {
    const allProductCards    = document.querySelectorAll('.product-card');
    const categoriesSection  = document.querySelector('.categories');
    const allProductSections = document.querySelectorAll('section[id]');
    let foundAny = false;

    if (categoriesSection) categoriesSection.style.display = 'none';

    // Show all sections during search so cards inside them are visible
    allProductSections.forEach(s => { s.style.display = 'block'; });

    allProductCards.forEach(card => {
        const title = card.querySelector('h3').innerText.toLowerCase();
        if (title.includes(query.toLowerCase())) {
            card.style.display = 'flex';
            foundAny = true;
        } else {
            card.style.display = 'none';
        }
    });

    let noResultsMsg = document.getElementById('no-results-msg');
    if (!foundAny) {
        if (!noResultsMsg) {
            noResultsMsg = document.createElement('h2');
            noResultsMsg.id = 'no-results-msg';
            noResultsMsg.style.cssText = 'text-align:center; padding:50px; grid-column: 1/-1;';
            noResultsMsg.innerText = `No results found for "${query}"`;
            const firstGrid = document.querySelector('.product-grid');
            if (firstGrid) firstGrid.appendChild(noResultsMsg);
        } else {
            noResultsMsg.style.display = 'block';
            noResultsMsg.innerText = `No results found for "${query}"`;
        }
    } else if (noResultsMsg) {
        noResultsMsg.style.display = 'none';
    }
}

// Expose functions globally for inline onclick handlers
window.addToCart      = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
