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

const authForm = document.getElementById('auth-form');

if (authForm) {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const registerBtn = document.getElementById('register-btn');
    const googleBtn = document.getElementById('google-login-btn');
    const errorMsg = document.getElementById('error-message');

    authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
            .then((userCredential) => {
                window.location.href = "index.html"; 
            })
            .catch((error) => {
                errorMsg.style.display = "block";
                errorMsg.innerText = error.message; 
            });
    });

    registerBtn.addEventListener('click', () => {
        if(!emailInput.value || !passwordInput.value) {
            errorMsg.style.display = "block";
            errorMsg.innerText = "Please enter an email and password to register.";
            return;
        }

        createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
            .then((userCredential) => {
                alert("Account created successfully!");
                window.location.href = "index.html";
            })
            .catch((error) => {
                errorMsg.style.display = "block";
                errorMsg.innerText = error.message;
            });
    });

    if (googleBtn) {
        googleBtn.addEventListener('click', () => {
            signInWithPopup(auth, googleProvider)
                .then((result) => {
                    window.location.href = "index.html";
                })
                .catch((error) => {
                    errorMsg.style.display = "block";
                    errorMsg.innerText = error.message;
                });
        });
    }
}

onAuthStateChanged(auth, (user) => {
    const navLoginBtn = document.getElementById('nav-login-btn');
    const navUserProfile = document.getElementById('nav-user-profile');
    const navUsername = document.getElementById('nav-username');
    const userEmailDisplay = document.getElementById('user-email'); 

    if (user) {
        if (navLoginBtn) navLoginBtn.style.display = 'none';
        if (navUserProfile) {
            navUserProfile.style.display = 'block';
            const extractedName = user.email.split('@')[0];
            navUsername.innerText = extractedName;
        }

        if (userEmailDisplay) {
            userEmailDisplay.innerText = user.email;
        }

        if (window.location.href.includes("login.html")) {
            window.location.href = "index.html";
        }

    } else {
        if (navLoginBtn) navLoginBtn.style.display = 'block';
        if (navUserProfile) navUserProfile.style.display = 'none';

        if (window.location.href.includes("account.html")) {
            window.location.href = "login.html";
        }
    }
});

const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        signOut(auth).then(() => {
            window.location.href = "index.html"; 
        }).catch((error) => {
            console.error("Logout Error:", error);
        });
    });
}