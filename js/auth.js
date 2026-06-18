import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut, 
    GoogleAuthProvider, 
    signInWithPopup 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAdKNvRMQW6xUT7T3uWvNYzHtcou9uodtw",
  authDomain: "login-buyit.firebaseapp.com",
  projectId: "login-buyit",
  storageBucket: "login-buyit.firebasestorage.app",
  messagingSenderId: "842388327036",
  appId: "1:842388327036:web:681199500ac1dbb13a97f9",
  measurementId: "G-L3G32XL3B6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// ---- LOGIN PAGE LOGIC ----
const authForm = document.getElementById('auth-form');

if (authForm) {
    const emailInput    = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const registerBtn   = document.getElementById('register-btn');
    const googleBtn     = document.getElementById('google-login-btn');
    const errorMsg      = document.getElementById('error-message');

    authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
            .then(() => { window.location.href = "index.html"; })
            .catch((error) => {
                errorMsg.style.display = "block";
                errorMsg.innerText = friendlyError(error.code);
            });
    });

    registerBtn.addEventListener('click', () => {
        if (!emailInput.value || !passwordInput.value) {
            errorMsg.style.display = "block";
            errorMsg.innerText = "Please enter an email and password to register.";
            return;
        }
        createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
            .then(() => {
                alert("Account created successfully!");
                window.location.href = "index.html";
            })
            .catch((error) => {
                errorMsg.style.display = "block";
                errorMsg.innerText = friendlyError(error.code);
            });
    });

    if (googleBtn) {
        googleBtn.addEventListener('click', () => {
            signInWithPopup(auth, googleProvider)
                .then(() => { window.location.href = "index.html"; })
                .catch((error) => {
                    errorMsg.style.display = "block";
                    errorMsg.innerText = friendlyError(error.code);
                });
        });
    }
}

// ---- AUTH STATE LISTENER (runs on every page) ----
onAuthStateChanged(auth, (user) => {
    const navLoginBtn    = document.getElementById('nav-login-btn');
    const navUserProfile = document.getElementById('nav-user-profile');
    const navUsername    = document.getElementById('nav-username');
    const userEmailDisplay = document.getElementById('user-email');

    if (user) {
        // Show username in navbar
        if (navLoginBtn)    navLoginBtn.style.display = 'none';
        if (navUserProfile) {
            navUserProfile.style.display = 'block';
            const extractedName = user.email.split('@')[0];
            if (navUsername) navUsername.innerText = extractedName;
        }

        // Show email on account page
        if (userEmailDisplay) {
            userEmailDisplay.innerText = user.email;
            // Expose email as data attribute so checkout.js can read it
            userEmailDisplay.dataset.email = user.email;
        }

        // Redirect away from login if already logged in
        if (window.location.pathname.includes("login.html")) {
            window.location.href = "index.html";
        }

    } else {
        // Logged out state
        if (navLoginBtn)    navLoginBtn.style.display = 'block';
        if (navUserProfile) navUserProfile.style.display = 'none';

        // Protect pages that require login
        const protectedPages = ["account.html", "checkout.html", "orders.html", "order-confirmation.html"];
        const isProtected = protectedPages.some(p => window.location.pathname.includes(p));
        if (isProtected) {
            window.location.href = "login.html";
        }
    }
});

// ---- LOGOUT ----
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        signOut(auth)
            .then(() => { window.location.href = "index.html"; })
            .catch((error) => { console.error("Logout Error:", error); });
    });
}

// ---- FRIENDLY ERROR MESSAGES ----
function friendlyError(code) {
    const map = {
        'auth/invalid-email':            'Please enter a valid email address.',
        'auth/user-not-found':           'No account found with this email.',
        'auth/wrong-password':           'Incorrect password. Please try again.',
        'auth/email-already-in-use':     'An account with this email already exists.',
        'auth/weak-password':            'Password should be at least 6 characters.',
        'auth/too-many-requests':        'Too many attempts. Please try again later.',
        'auth/network-request-failed':   'Network error. Check your connection.',
        'auth/popup-closed-by-user':     'Sign-in popup was closed. Please try again.',
    };
    return map[code] || 'Something went wrong. Please try again.';
}
