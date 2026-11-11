
const foodForm = document.getElementById("foodForm");
const foodName = document.getElementById("foodName");
const calories = document.getElementById("calories");
const foodList = document.getElementById("foodList");
const totalCalories = document.getElementById("totalCalories");
const resetBtn = document.getElementById("resetBtn");

const foods = [];

// Add food
foodForm.addEventListener("submit", (event) => {

    event.preventDefault();

    // Get actual input values
    const name = foodName.value.trim();
    const calorieValue = Number(calories.value);

    // Validate food name
    if (!name) {
        displayMessage("Please enter a food name");
        return;
    }

    // Validate calories
    if (
        calories.value === "" ||
        !Number.isFinite(calorieValue) ||
        calorieValue < 0 ||
        calorieValue > 1000
    ) {
        displayMessage("Please enter a valid calorie amount (0-1000)");
        return;
    }

    // Store food information
    foods.push({
        name: name,
        calories: calorieValue
    });

    // Create food list item
    const foodItem = document.createElement("li");

    foodItem.className =
        "flex justify-between rounded bg-gray-100 px-4 py-2";

    foodItem.textContent = `${name}: ${calorieValue} calories`;

    foodList.appendChild(foodItem);

    // Calculate total calories
    const total = foods.reduce(
        (sum, food) => sum + food.calories,
        0
    );

    totalCalories.textContent = total;

    // Clear input fields
    foodForm.reset();
});

// Display messages
function displayMessage(message) {
    alert(message);
}

// Reset application
resetBtn.addEventListener("click", () => {

    foods.length = 0;

    foodList.innerHTML = "";

    totalCalories.textContent = 0;

});
