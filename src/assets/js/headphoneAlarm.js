// GrovePortal-Sandbox-1 — Headphone Alarm Module

let audio;

// Preload soft loop sound
async function loadSound() {
  if (!audio) {
    audio = new Audio("assets/headphone_alarm.mp3");
    audio.loop = true;
  }
  return audio;
}

export async function playAlarm() {
  const sound = await loadSound();
  try {
    await sound.play();
    console.log("Alarm started — GrovePortal-Sandbox-1");
  } catch (e) {
    console.log("Playback blocked, waiting for user gesture — GrovePortal-Sandbox-1");
  }
}

export function stopAlarm() {
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
    console.log("Alarm stopped — GrovePortal-Sandbox-1");
  }
}
