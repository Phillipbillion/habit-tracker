// Get DOM elements
const habitInput = document.getElementById("habit-input");
const addHabitBtn = document.getElementById("add-habit-btn");
const habitList = document.getElementById("habit-list");
const pointsDisplay = document.getElementById("points");
const upgradeBtn = document.getElementById("upgrade-btn");

// Load data from localStorage
let habits = JSON.parse(localStorage.getItem("habits")) || [];
let points = parseInt(localStorage.getItem("points")) || 0;
let isPro = JSON.parse(localStorage.getItem("isPro")) || false;

// ---- NEW renderHabits function ----
function renderHabits() {
  habitList.innerHTML = "";
  habits.forEach((habit, index) => {
    const li = document.createElement("li");
    li.textContent = habit.name;

    const doneBtn = document.createElement("button");
    doneBtn.textContent = habit.done ? "✅" : "✔️";
    doneBtn.addEventListener("click", () => toggleHabit(index));

    li.appendChild(doneBtn);
    habitList.appendChild(li);
  });

  pointsDisplay.textContent = `Points: ${points}`;

  // Hide upgrade button if already Pro
  upgradeBtn.style.display = isPro ? "none" : "block";
}

// Function to toggle habit done
function toggleHabit(index) {
  habits[index].done = !habits[index].done;
  points += habits[index].done ? 1 : -1;
  saveHabits();
  renderHabits();
}

// Function to add a new habit
function addHabit() {
  const name = habitInput.value.trim();
  if (name === "") return;

  if (!isPro && habits.length >= 5) {
    alert("Free users can only add 5 habits. Upgrade to Pro for unlimited habits!");
    return;
  }

  habits.push({ name, done: false });
  habitInput.value = "";
  saveHabits();
  renderHabits();
}

// Function to save data to localStorage
function saveHabits() {
  localStorage.setItem("habits", JSON.stringify(habits));
  localStorage.setItem("points", points);
  localStorage.setItem("isPro", isPro);
}

// Upgrade button
upgradeBtn.addEventListener("click", () => {
  alert("Thank you! You are now Pro!");
  isPro = true;
  saveHabits();
  renderHabits();
});

// Add habit button
addHabitBtn.addEventListener("click", addHabit);

// Initial render
renderHabits();
