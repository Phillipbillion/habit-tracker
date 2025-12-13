// Track Pro status
let isPro = JSON.parse(localStorage.getItem("isPro")) || false;

const upgradeBtn = document.getElementById("upgrade-btn");

upgradeBtn.addEventListener("click", () => {
  // Simulate payment success
  alert("Thank you! You are now Pro!");
  isPro = true;
  localStorage.setItem("isPro", true);
  renderHabits();
});

function addHabit() {
  const name = habitInput.value.trim();
  if (name === "") return;

  // Check free limit
  if (!isPro && habits.length >= 5) {
    alert("Free users can only add 5 habits. Upgrade to Pro for unlimited habits!");
    return;
  }

  habits.push({ name, done: false });
  habitInput.value = "";
  saveHabits();
  renderHabits();
}
