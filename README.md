# Buyit - In Your Way

An interactive e-commerce web application built from scratch using HTML, CSS, and JavaScript. This project was developed as a 2nd-year internship project to demonstrate core frontend development skills, state management, and third-party API integration.

Currently, this is a dedicated frontend application. Future updates are planned to introduce a robust backend system to handle secure payment processing and provide a deeply personalized user experience.

## Architecture of this web application

The project is structured to prioritize code reuse and visual consistency. Rather than writing unique styles and scripts for every single page, the application relies on a centralized CSS file and modular JavaScript files.

### HTML Structure
The application is divided into specific, purpose-built pages to ensure a smooth user journey from product discovery to checkout.

* **index.html:** The main landing page featuring promotional banners and category navigation.
* **products.html:** The primary storefront listing all available products.
* **product-details.html:** A dynamic view that isolates specific product information, pricing, and available offers.
* **cart.html:** The shopping cart interface where users can review their selected items and total costs.
* **login.html:** The user authentication interface powered by Firebase.
* **account.html:** A personalized dashboard displaying the active user session.
* **orders.html:** A log of the user's purchase history.
* **checkout.html:** The final order processing page capturing shipping details and payment preferences.
* **order-confirmation.html:** A post-purchase screen displaying the expected delivery timeline and order summary.

### CSS Styling
* **style.css:** The single source of truth for the website's design. This file utilizes CSS variables for a strict color palette and ensures complete mobile responsiveness across all pages.

### JavaScript & Logic
The application logic is broken down into specific modules to handle distinct functionalities.

* **script.js:** The core engine of the store. It manages local storage arrays to add, remove, and update shopping cart items globally. It also powers the real-time search filtering on the products page.
* **auth.js:** The authentication controller. This file connects directly to the Google Firebase console to handle secure user registration, email/password logins, and Google popup authentication. It also manages the global navigation bar state, hiding or showing user profiles based on active sessions.
* **checkout.js:** The order processing script. It handles the form data and communicates with the EmailJS API. Once an order is placed, it calculates the expected delivery date and triggers an automated confirmation email to the buyer. 

## How It Works

1. **State Management:** When a user clicks "Add to Cart", `script.js` captures the product data and stores it in the browser's Local Storage. This ensures the cart data persists even if the user refreshes the page or navigates away.
2. **Authentication:** Users can register or log in using Firebase Authentication. The `auth.js` file constantly listens for changes in the authentication state. If a user logs in, the script instantly updates the navigation bar across the entire website to replace the "Login" button with their username.
3. **Order Processing:** During checkout, the user inputs their shipping details. `checkout.js` captures this data alongside the cart total. It then utilizes the EmailJS client-side service to securely package this data and send a branded HTML receipt directly to the user's inbox without requiring a dedicated backend server.
