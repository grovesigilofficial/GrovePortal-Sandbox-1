let audio;

async function loadSound() {
  if (!audio) {
    audio = new Audio("/alarm.mp3"); // placeholder file
    audio.loop = true;
  }
  return audio;
}

export async function playAlarm() {
  const sound = await loadSound();
  try { await sound.play(); } catch(e) { console.log("Playback blocked"); }
}

export function stopAlarm() {
  if (audio) { audio.pause(); audio.currentTime=0; }
}
