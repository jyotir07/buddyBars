import database from "./firebase.js";
import {
  ref,
  set,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

//DOM elements
const startBtn = document.getElementById("startBtn");
const endBtn = document.getElementById("endBtn");
const mineProgress = document.getElementById("mine-progress");
const friendProgress = document.getElementById("friend-progress");
const roomCodeInput = document.getElementById("roomCode");

//timmer and state vars
let studyTimer = null;
let studyDuration = 0;
let roomCode = "defaultRoom";

//ref to the study hours in realtime db
const studyHoursRef = ref(database, "rooms/" + roomCode + "/studyHours");

//syncing progress bars in realtime
onValue(studyHoursRef, (snapshot) => {
  const data = snapshot.val();
  if (data) {
    mineProgress.value = data.mine || 0;
    friendProgress.value = data.friend || 0;
  }
});

function updateStudyHours(user, hours) { //updating study hours in fb
  set(ref(database, "rooms/" + roomCode + "/studyHours/" + user), {
    hours: hours,
  });
}

startBtn.addEventListener("click", () => {
  if (!studyTimer) {
    studyTimer = setInterval(() => {
      studyDuration += 1;
      mineProgress.value = studyDuration;
      updateStudyHours("mine", studyDuration);
    }, 60000);
  }
});

endBtn.addEventListener("click", () => {
  if (studyTimer) {
    clearInterval(studyTimer);
    studyTimer = null;
  }
  updateStudyHours("mine", studyDuration);
});

roomCodeInput.addEventListener("input", (event) => {
  roomCode = event.target.value || "defaultRoom";
  updateStudyHours("mine", studyDuration);
});

function resetWeeklyProgress() {
  const currentDay = new Date().getDay();
  if (currentDay === 0) {
    studyDuration = 0;
    mineProgress.value = 0;
    updateStudyHours("mine", studyDuration);
  }
}

setInterval(resetWeeklyProgress, 60000);
