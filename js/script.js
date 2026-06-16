// add to cart functionality
let cart = JSON.parse(localStorage.getItem('buyit_cart')) || [];

function addToCart(id, name, price, image) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        const cleanPrice = parseFloat(price.replace(/[^0-9.-]+/g,""));
        cart.push({ id, name, price: cleanPrice, image, quantity: 1 });
    }
    saveCart();
    alert(name + " added to your cart!");
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    renderCart();
}

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

function saveCart() {
    localStorage.setItem('buyit_cart', JSON.stringify(cart));
}

function renderCart() {
    const cartContainer = document.getElementById('cart-items-container');
    const subtotalElement = document.getElementById('cart-subtotal');
    const totalElement = document.getElementById('cart-total');
    
    if (!cartContainer) return; 

    cartContainer.innerHTML = ''; 
    let subtotal = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p style="padding: 20px;">Your cart is empty.</p>';
        subtotalElement.innerText = '₹0.00';
        totalElement.innerText = '₹0.00';
        return;
    }

    cart.forEach(item => {
        subtotal += (item.price * item.quantity);
        const itemHTML = `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p class="price">₹${item.price.toLocaleString('en-IN')}</p>
                </div>
                <div class="item-actions">
                    <input type="number" value="${item.quantity}" min="1" 
                           onchange="updateQuantity('${item.id}', this.value)" 
                           class="quantity-input">
                    <button onclick="removeFromCart('${item.id}')" class="remove-btn">
                        <i class="fa-solid fa-trash"></i> Remove
                    </button>
                </div>
            </div>
        `;
        cartContainer.innerHTML += itemHTML;
    });

    subtotalElement.innerText = '₹' + subtotal.toLocaleString('en-IN');
    totalElement.innerText = '₹' + subtotal.toLocaleString('en-IN');
}

window.addEventListener('DOMContentLoaded', renderCart);

// --- SEARCH FUNCTIONALITY ---
window.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');

    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q');
    
    if (searchQuery && window.location.href.includes('products.html')) {
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
                window.location.href = `products.html?q=${query}`;
            }
        });
    }
});

function executeSearch(query) {
    const allProductCards = document.querySelectorAll('.product-card');
    const categoriesSection = document.querySelector('.categories');
    let foundAny = false;

    if (categoriesSection) {
        categoriesSection.style.display = 'none';
    }

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
            noResultsMsg.style.textAlign = 'center';
            noResultsMsg.style.padding = '50px';
            noResultsMsg.innerText = `No results found for "${query}"`;
            
            const firstGrid = document.querySelector('.product-grid');
            if(firstGrid && firstGrid.parentElement) {
                firstGrid.parentElement.appendChild(noResultsMsg);
            }
        } else {
            noResultsMsg.style.display = 'block';
            noResultsMsg.innerText = `No results found for "${query}"`;
        }
    } else if (noResultsMsg) {
        noResultsMsg.style.display = 'none';
    }
}