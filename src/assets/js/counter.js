// GrovePortal-Sandbox-1 — Uberman Counter Module (Persistent LocalStorage)

let startTime = localStorage.getItem('grove_start_time');
let running = localStorage.getItem('grove_running') === 'true';

// Save start time to LocalStorage
function saveStart(time) {
  localStorage.setItem('grove_start_time', time);
  localStorage.setItem('grove_running', 'true');
  startTime = time;
  running = true;
}

// Start Uberman
export function startUberman() {
  if (!running) saveStart(Date.now());
  updateCounter();
}

// Reset Uberman
export function resetUberman() {
  localStorage.removeItem('grove_start_time');
  localStorage.setItem('grove_running', 'false');
  startTime = null;
  running = false;

  const display = document.getElementById('counter-display');
  const liveTimer = document.getElementById('live-timer');

  if (display) display.textContent = '0';
  if (liveTimer) liveTimer.textContent = '00:00:00.000';
}

// Update counter display
export function updateCounter() {
  if (!running || !startTime) return;

  const display = document.getElementById('counter-display');
  const liveTimer = document.getElementById('live-timer');

  if (!display || !liveTimer) return;

  const now = Date.now();
  const elapsed = now - startTime;

  const day = Math.floor(elapsed / (1000 * 60 * 60 * 24));
  const time = new Date(elapsed).toISOString().substr(11, 12);

  display.textContent = day;
  liveTimer.textContent = time;

  requestAnimationFrame(updateCounter);
}

// Auto-init on page load
document.addEventListener('DOMContentLoaded', () => {
  if (running) requestAnimationFrame(updateCounter);
});
