// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvp5LN_NVHpo5agYrm6FaOukgWTZzU8w8",
  authDomain: "buddybars-c9915.firebaseapp.com",
  databaseURL: "https://buddybars-c9915-default-rtdb.firebaseio.com",
  projectId: "buddybars-c9915",
  storageBucket: "buddybars-c9915.firebasestorage.app",
  messagingSenderId: "223283177016",
  appId: "1:223283177016:web:1d09bb5d6df854f1bc28cd",
  measurementId: "G-5E71RXW1LS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const startBtn = document.getElementById("startBtn");
const endBtn = document.getElementById("endBtn");
const mineProgress = document.getElementById("mine-progress");
const friendProgress = document.getElementById("friend-progress");
const roomCodeInput = document.getElementById("roomCode");
let studyTimer = null;
let studyDuration = 0;

let roomCode = "defaultRoom";

const studyHoursRef = ref(database, "rooms/" + roomCode);

onValue(studyHoursRef, (snapshot) => {
  const data = snapshot.val();
  if (data) {
    mineProgress.value = data.mine || 0;
    friendProgress.value = data.friend || 0;
  }
});

function updateStudyHours(user, hours) {
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
