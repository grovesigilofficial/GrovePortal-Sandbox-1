// GrovePortal-Sandbox-1 — Uberman Counter Module (LocalStorage Persistent)

let startTime = localStorage.getItem('grove_start_time');
let running = localStorage.getItem('grove_running') === 'true';

function saveStart(time) {
  localStorage.setItem('grove_start_time', time);
  localStorage.setItem('grove_running', 'true');
  startTime = time;
  running = true;
}

export function startUberman() {
  saveStart(Date.now());
  updateCounter();
}

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

export function updateCounter() {
  if (!running || !startTime) return;
  const display = document.getElementById('counter-display');
  const liveTimer = document.getElementById('live-timer');
  if (!display || !liveTimer) return;

  const now = Date.now();
  const elapsed = now - startTime;

  const day = Math.floor(elapsed / (1000*60*60*24));
  const time = new Date(elapsed).toISOString().substr(11,12);

  display.textContent = day;
  liveTimer.textContent = time;

  requestAnimationFrame(updateCounter);
}

// Auto-init
document.addEventListener('DOMContentLoaded', () => {
  if (running) requestAnimationFrame(updateCounter);
});
