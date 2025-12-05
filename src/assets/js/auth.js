// src/assets/js/auth.js
import { CONFIG } from './config.local.js'; // make sure path is correct

export function login(username, password) {
  if (username === CONFIG.adminUsername && password === CONFIG.adminPassword) {
    localStorage.setItem('grove_admin_logged_in', 'true');
    alert("Logged into GrovePortal-Sandbox-1 Admin");
    window.location.href = "admin.html"; // redirects to admin panel
  } else {
    alert("Invalid credentials — GrovePortal-Sandbox-1");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    login(username, password);
  });
});
