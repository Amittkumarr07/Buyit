// checkout page service
const EMAILJS_SERVICE_ID  = 'service_09yaxzs';
const EMAILJS_TEMPLATE_ID = 'template_ecushpr';
const EMAILJS_PUBLIC_KEY  = '-sJb9YAX0-CmLWvzD';

// Initialize EmailJS
(function () {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }
})();

// ---- GET LOGGED-IN USER EMAIL DIRECTLY FROM FIREBASE ----
// This avoids depending on a DOM element (user-email) that only exists on account.html
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const _firebaseConfig = {
    apiKey: "AIzaSyAdKNvRMQW6xUT7T3uWvNYzHtcou9uodtw",
    authDomain: "login-buyit.firebaseapp.com",
    projectId: "login-buyit",
    storageBucket: "login-buyit.firebasestorage.app",
    messagingSenderId: "842388327036",
    appId: "1:842388327036:web:681199500ac1dbb13a97f9"
};

// Reuse the existing Firebase app initialized by auth.js — never double-initialize
const _app  = getApps().length ? getApps()[0] : initializeApp(_firebaseConfig);
const _auth = getAuth(_app);

function getCurrentUserEmail() {
    return _auth.currentUser ? _auth.currentUser.email : null;
}

// ---- STEP NAVIGATION ----
function goToStep(stepNumber) {
    if (stepNumber === 2 && !validateStep1()) return;
    if (stepNumber === 3 && !validateStep2()) return;

    document.querySelectorAll('.checkout-step-panel').forEach(p => p.classList.add('hidden'));
    document.getElementById('step-' + stepNumber).classList.remove('hidden');

    document.querySelectorAll('.step').forEach((el, i) => {
        el.classList.toggle('active', i + 1 === stepNumber);
        el.classList.toggle('done', i + 1 < stepNumber);
    });

    if (stepNumber === 3) populateReview();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---- VALIDATION ----
function validateStep1() {
    const fields = [
        { id: 'full-name', label: 'Full Name' },
        { id: 'phone',     label: 'Phone Number' },
        { id: 'address',   label: 'Street Address' },
        { id: 'city',      label: 'City' },
        { id: 'state',     label: 'State' },
        { id: 'pincode',   label: 'PIN Code' }
    ];

    for (const f of fields) {
        const el = document.getElementById(f.id);
        if (!el.value.trim()) {
            el.classList.add('input-error');
            el.focus();
            showError(`Please enter your ${f.label}.`);
            return false;
        }
        el.classList.remove('input-error');
    }

    const phone = document.getElementById('phone').value.trim();
    if (!/^\d{10}$/.test(phone)) {
        document.getElementById('phone').classList.add('input-error');
        showError('Please enter a valid 10-digit phone number.');
        return false;
    }

    const pin = document.getElementById('pincode').value.trim();
    if (!/^\d{6}$/.test(pin)) {
        document.getElementById('pincode').classList.add('input-error');
        showError('Please enter a valid 6-digit PIN code.');
        return false;
    }

    return true;
}

function validateStep2() {
    const method = document.querySelector('input[name="payment"]:checked').value;
    if (method === 'upi') {
        const upi = document.getElementById('upi-id').value.trim();
        if (!upi.includes('@')) {
            showError('Please enter a valid UPI ID (e.g. name@upi).');
            return false;
        }
    }
    if (method === 'card') {
        const num = document.getElementById('card-number').value.replace(/\s/g, '');
        const exp = document.getElementById('card-expiry').value.trim();
        const cvv = document.getElementById('card-cvv').value.trim();
        if (num.length < 16 || exp.length < 5 || cvv.length < 3) {
            showError('Please fill in all card details correctly.');
            return false;
        }
    }
    return true;
}

function showError(msg) {
    const el = document.getElementById('place-order-error');
    if (!el) return;
    el.style.display = 'block';
    el.textContent = msg;
    setTimeout(() => { el.style.display = 'none'; }, 4000);
}

// ---- PAYMENT METHOD UI ----
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('input[name="payment"]').forEach(radio => {
        radio.addEventListener('change', () => {
            document.getElementById('upi-fields').classList.add('hidden');
            document.getElementById('card-fields').classList.add('hidden');
            if (radio.value === 'upi')  document.getElementById('upi-fields').classList.remove('hidden');
            if (radio.value === 'card') document.getElementById('card-fields').classList.remove('hidden');
        });
    });

    const cardInput = document.getElementById('card-number');
    if (cardInput) {
        cardInput.addEventListener('input', (e) => {
            let val = e.target.value.replace(/\D/g, '').substring(0, 16);
            e.target.value = val.replace(/(.{4})/g, '$1 ').trim();
        });
    }

    renderCheckoutSummary();
});

// ---- RENDER SUMMARY ----
function renderCheckoutSummary() {
    const cart = JSON.parse(localStorage.getItem('buyit_cart')) || [];
    const list = document.getElementById('checkout-items-list');
    const subtotalEl = document.getElementById('checkout-subtotal');
    const totalEl   = document.getElementById('checkout-total');

    if (!list) return;

    if (cart.length === 0) {
        list.innerHTML = '<p style="color:#999; font-size:0.9rem;">Your cart is empty.</p>';
        return;
    }

    let total = 0;
    list.innerHTML = '';
    cart.forEach(item => {
        total += item.price * item.quantity;
        list.innerHTML += `
            <div class="checkout-summary-item">
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <p class="summary-item-name">${item.name}</p>
                    <p class="summary-item-qty">Qty: ${item.quantity}</p>
                </div>
                <span class="summary-item-price">₹${(item.price * item.quantity).toLocaleString('en-IN')}</span>
            </div>
        `;
    });

    const formatted = '₹' + total.toLocaleString('en-IN');
    subtotalEl.textContent = formatted;
    totalEl.textContent    = formatted;
}

// ---- REVIEW STEP ----
function populateReview() {
    const name    = document.getElementById('full-name').value.trim();
    const phone   = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const city    = document.getElementById('city').value.trim();
    const state   = document.getElementById('state').value;
    const pin     = document.getElementById('pincode').value.trim();
    const method  = document.querySelector('input[name="payment"]:checked').value;
    const methodLabels = { cod: 'Cash on Delivery', upi: 'UPI', card: 'Credit / Debit Card' };

    document.getElementById('review-address').innerHTML = `
        <p><strong>${name}</strong> &nbsp;|&nbsp; ${phone}</p>
        <p>${address}, ${city}, ${state} – ${pin}</p>
    `;
    document.getElementById('review-payment').innerHTML = `<p>${methodLabels[method]}</p>`;

    const cart = JSON.parse(localStorage.getItem('buyit_cart')) || [];
    let itemsHTML = '';
    cart.forEach(item => {
        itemsHTML += `<p style="margin:4px 0;">• ${item.name} × ${item.quantity} — ₹${(item.price * item.quantity).toLocaleString('en-IN')}</p>`;
    });
    document.getElementById('review-items').innerHTML = itemsHTML;
}

// ---- PLACE ORDER ----
async function placeOrder() {
    const cart = JSON.parse(localStorage.getItem('buyit_cart')) || [];
    if (cart.length === 0) {
        showError('Your cart is empty. Add items before placing an order.');
        return;
    }

    const btn = document.getElementById('place-order-btn');
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Placing Order...';

    const orderId    = 'BYT' + Date.now().toString().slice(-8);
    const orderDate  = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    const deliveryDate = (() => {
        const d = new Date();
        d.setDate(d.getDate() + 7);
        return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    })();

    const name         = document.getElementById('full-name').value.trim();
    const address      = document.getElementById('address').value.trim();
    const city         = document.getElementById('city').value.trim();
    const state        = document.getElementById('state').value;
    const pin          = document.getElementById('pincode').value.trim();
    const fullAddress  = `${address}, ${city}, ${state} – ${pin}`;
    const methodValue  = document.querySelector('input[name="payment"]:checked').value;
    const methodLabels = { cod: 'Cash on Delivery', upi: 'UPI', card: 'Credit / Debit Card' };
    const paymentMethod = methodLabels[methodValue];
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const newOrder = { orderId, orderDate, deliveryDate, address: fullAddress, paymentMethod, items: cart, total, status: 'Placed' };

    const allOrders = JSON.parse(localStorage.getItem('buyit_orders')) || [];
    allOrders.push(newOrder);
    localStorage.setItem('buyit_orders', JSON.stringify(allOrders));
    sessionStorage.setItem('buyit_last_order', JSON.stringify(newOrder));
    localStorage.removeItem('buyit_cart');

    await sendConfirmationEmail(newOrder, name);

    window.location.href = 'order-confirmation.html';
}

// ---- EMAIL SENDING ----
async function sendConfirmationEmail(order, customerName) {
    if (typeof emailjs === 'undefined') {
        console.warn('EmailJS not loaded. Skipping email.');
        return;
    }

    // Read email directly from Firebase Auth — no DOM dependency
    const userEmail = getCurrentUserEmail();

    if (!userEmail) {
        console.warn('No logged-in user found. Skipping email.');
        return;
    }

    const itemsText = order.items.map(item =>
        `${item.name} × ${item.quantity} = ₹${(item.price * item.quantity).toLocaleString('en-IN')}`
    ).join('\n');

    const templateParams = {
        to_email:         userEmail,
        to_name:          customerName,
        order_id:         order.orderId,
        order_date:       order.orderDate,
        delivery_date:    order.deliveryDate,
        payment_method:   order.paymentMethod,
        delivery_address: order.address,
        order_items:      itemsText,
        order_total:      '₹' + Number(order.total).toLocaleString('en-IN')
    };

    try {
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
        console.log('Confirmation email sent to', userEmail);
    } catch (err) {
        console.error('EmailJS send failed:', err);
    }
}

window.goToStep   = goToStep;
window.placeOrder = placeOrder;