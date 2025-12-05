const ADMIN = {
  username: "Bleedvow",
  password: "S0m3$tr0ngP@ssw0rd"
};

export function login(username, password) {
  if (username === ADMIN.username && password === ADMIN.password) {
    localStorage.setItem('grove_admin_logged_in', 'true');
    alert("Logged into GrovePortal-Sandbox-1 Admin");
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
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    login(username, password);
  });
});
