// ============================================================
// script.js — Cart management + Search
// ============================================================

let cart = JSON.parse(localStorage.getItem('buyit_cart')) || [];

// ---- ADD TO CART ----
function addToCart(id, name, price, image) {
    // re-read storage so a second open tab can't overwrite the cart with stale data
    cart = JSON.parse(localStorage.getItem('buyit_cart')) || [];
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
    cart = JSON.parse(localStorage.getItem('buyit_cart')) || [];
    cart = cart.filter(item => item.id !== id);
    saveCart();
    renderCart();
}

// ---- UPDATE QUANTITY ----
function updateQuantity(id, newQuantity) {
    cart = JSON.parse(localStorage.getItem('buyit_cart')) || [];
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
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <strong>${esc(productName)}</strong> added to cart`;
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
                <img src="${item.image}" alt="${esc(item.name)}">
                <div class="item-details">
                    <h3>${esc(item.name)}</h3>
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

    if (searchQuery && window.location.pathname.endsWith('products.html')) {
        if (searchInput) searchInput.value = searchQuery;
        executeSearch(searchQuery);
    }

    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchInput.value.trim().toLowerCase();
            if (window.location.pathname.endsWith('products.html')) {
                window.history.pushState({}, '', '?q=' + encodeURIComponent(query));
                executeSearch(query);
            } else {
                window.location.href = `products.html?q=${encodeURIComponent(query)}`;
            }
        });
    }
});

function executeSearch(query) {
    query = (query || '').trim().toLowerCase();
    const categoriesSection = document.querySelector('.categories');
    const sections = document.querySelectorAll('#catalog section[id]');
    let foundAny = false;

    if (categoriesSection) categoriesSection.style.display = query ? 'none' : '';

    sections.forEach(sec => {
        let sectionHasMatch = false;
        sec.querySelectorAll('.product-card').forEach(card => {
            const match = !query || card.querySelector('h3').innerText.toLowerCase().includes(query);
            card.style.display = match ? 'flex' : 'none';
            if (match) sectionHasMatch = true;
        });
        // hide whole category (heading included) when nothing in it matches
        sec.style.display = sectionHasMatch ? '' : 'none';
        if (sectionHasMatch) foundAny = true;
    });

    let msg = document.getElementById('no-results-msg');
    if (!foundAny) {
        if (!msg) {
            msg = document.createElement('h2');
            msg.id = 'no-results-msg';
            msg.style.cssText = 'text-align:center;padding:50px;';
            const catalog = document.getElementById('catalog');
            if (catalog) catalog.appendChild(msg);
        }
        msg.style.display = 'block';
        msg.textContent = `No results found for "${query}"`;
    } else if (msg) {
        msg.style.display = 'none';
    }
}

// Back/forward buttons should re-run (or clear) the search
window.addEventListener('popstate', () => {
    if (!window.location.pathname.endsWith('products.html')) return;
    const q = new URLSearchParams(window.location.search).get('q') || '';
    const input = document.getElementById('search-input');
    if (input) input.value = q;
    executeSearch(q);
});

// Expose functions globally for inline onclick handlers
window.addToCart      = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
