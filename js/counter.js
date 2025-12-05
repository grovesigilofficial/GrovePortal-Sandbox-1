const napInterval = 4 * 60 * 60 * 1000; // 4 hours
let startTime = localStorage.getItem('grove_start_time');
let running = localStorage.getItem('grove_running') === 'true';

function saveStart(time) {
  localStorage.setItem('grove_start_time', time);
  localStorage.setItem('grove_running', 'true');
  startTime = time;
  running = true;
}

export function startUberman() {
  if (!running) saveStart(Date.now());
  updateCounter();
}

export function resetUberman() {
  localStorage.removeItem('grove_start_time');
  localStorage.setItem('grove_running', 'false');
  startTime = null;
  running = false;

  const display = document.getElementById('counter-display');
  const liveTimer = document.getElementById('live-timer');
  const countdown = document.getElementById('countdown');

  if (display) display.textContent = '0';
  if (liveTimer) liveTimer.textContent = '00:00:00';
  if (countdown) countdown.textContent = 'Next nap in: 04:00:00';
}

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const h = String(Math.floor(totalSeconds / 3600)).padStart(2,'0');
  const m = String(Math.floor((totalSeconds % 3600)/60)).padStart(2,'0');
  const s = String(totalSeconds % 60).padStart(2,'0');
  return `${h}:${m}:${s}`;
}

function updateCounter() {
  if (!startTime) return;
  const display = document.getElementById('counter-display');
  const liveTimer = document.getElementById('live-timer');
  const countdownEl = document.getElementById('countdown');
  if (!display || !liveTimer || !countdownEl) return;

  const now = Date.now();
  const elapsed = now - startTime;

  const day = Math.floor(elapsed / (1000 * 60 * 60 * 24));
  const time = new Date(elapsed).toISOString().substr(11, 8);

  display.textContent = day;
  liveTimer.textContent = time;

  const timeSinceLastNap = elapsed % napInterval;
  const nextNapIn = napInterval - timeSinceLastNap;
  countdownEl.textContent = 'Next nap in: ' + formatTime(nextNapIn);

  if (running) setTimeout(updateCounter, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
  if (running) updateCounter();
  const startBtn = document.getElementById('start-btn');
  const resetBtn = document.getElementById('reset-btn');
  if(startBtn) startBtn.addEventListener('click', startUberman);
  if(resetBtn) resetBtn.addEventListener('click', resetUberman);
});
