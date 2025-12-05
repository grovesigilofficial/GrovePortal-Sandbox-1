let audio;

async function loadSound() {
  if (!audio) {
    audio = new Audio("alarm.mp3");
    audio.loop = true;
  }
  return audio;
}

export async function playAlarm() {
  const sound = await loadSound();
  try {
    await sound.play();
    console.log("Alarm started — GrovePortal-Sandbox-1");
  } catch(e) {
    console.log("Playback blocked, waiting for user gesture");
  }
}

export function stopAlarm() {
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
    console.log("Alarm stopped — GrovePortal-Sandbox-1");
  }
}
