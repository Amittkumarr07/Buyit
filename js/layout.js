// ============================================================
// layout.js — shared page pieces (navbar + footer) and helpers
// Loaded first on every page.
// ============================================================

// ---- ESCAPE HTML ----
// Makes user-provided text safe to put inside innerHTML (prevents XSS).
// For example, "<b>hi</b>" becomes "&lt;b&gt;hi&lt;/b&gt;" so it shows as text.
window.esc = function (value) {
    const replacements = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    };

    return String(value ?? '').replace(/[&<>"']/g, character => replacements[character]);
};


// ---- NAVBAR ----
// Added at the top of every page. The ids (nav-login-btn, nav-user-profile,
// nav-username) are used by auth.js to show or hide the Login button.
document.body.insertAdjacentHTML('afterbegin', `
<nav class="navbar">
    <a href="index.html" class="logo-link">
        <div class="logo">Buy<span>it</span></div>
    </a>

    <form class="search-container" id="search-form">
        <input type="search" id="search-input" placeholder="Search products..." required>
        <button type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
    </form>

    <ul class="nav-links">
        <li><a href="index.html">Home</a></li>
        <li><a href="products.html">Shop</a></li>
        <li id="nav-login-btn"><a href="login.html" class="login-btn">Login</a></li>
        <li id="nav-user-profile" style="display: none;">
            <a href="account.html" id="nav-username" style="color: var(--primary-color); font-weight: bold;">User</a>
        </li>
        <li><a href="cart.html"><i class="fa-solid fa-cart-shopping"></i></a></li>
    </ul>
</nav>`);


// ---- FOOTER ----
// Added once the page has loaded, so it always ends up at the very bottom
document.addEventListener('DOMContentLoaded', () => {
    document.body.insertAdjacentHTML('beforeend', '<footer><p>&copy; 2026 Buyit. All rights reserved.</p></footer>');
});
