import { CONFIG } from './local.js';

export function login(username, password) {
  if (
    username === CONFIG.adminUsername &&
    password === CONFIG.adminPassword
  ) {
    localStorage.setItem('grove_admin_logged_in', 'true');
    window.location.href = "admin.html";
  } else {
    alert("Invalid credentials — GrovePortal-Sandbox-1");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const u = document.getElementById("username").value.trim();
    const p = document.getElementById("password").value.trim();
    login(u, p);
  });
});
