
const foodForm = document.getElementById("foodForm");
const foodName = document.getElementById("foodName");
const calories = document.getElementById("calories");
const foodList = document.getElementById("foodList");
const totalCalories = document.getElementById("totalCalories");
const resetBtn = document.getElementById("resetBtn");

// Local storage key
const STORAGE_KEY = "calorieCounterFoods";

// Load saved foods from localStorage
let foods = [];

try {
    const savedFoods = JSON.parse(localStorage.getItem(STORAGE_KEY));
    foods = Array.isArray(savedFoods) ? savedFoods : [];
} catch (error) {
    console.error("Error loading saved foods:", error);
}

// Save foods to localStorage
function saveFoods() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(foods));
}

// Display foods
function renderFoods() {
    foodList.innerHTML = "";

    foods.forEach((food) => {
        const foodItem = document.createElement("li");

        foodItem.className =
            "flex justify-between items-center rounded bg-gray-100 px-4 py-2";

        const foodInfo = document.createElement("span");
        foodInfo.textContent =
            `${food.name}: ${food.calories} calories`;

        // Delete button
        const deleteBtn = document.createElement("button");

        deleteBtn.textContent = "Delete";
        deleteBtn.type = "button";
        deleteBtn.className =
            "bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600";

        deleteBtn.addEventListener("click", () => {
            foods = foods.filter((item) => item.id !== food.id);

            saveFoods();
            renderFoods();
        });

        foodItem.append(foodInfo, deleteBtn);
        foodList.appendChild(foodItem);
    });

    // Calculate total calories
    const total = foods.reduce(
        (sum, food) => sum + food.calories,
        0
    );

    totalCalories.textContent = total;
}

// Add food
foodForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = foodName.value.trim();
    const calorieValue = Number(calories.value);

    if (!name) {
        alert("Please enter a food name.");
        return;
    }

    if (
        calories.value.trim() === "" ||
        !Number.isFinite(calorieValue) ||
        calorieValue < 0 ||
        calorieValue > 1000
    ) {
        alert("Please enter valid calories between 0 and 1000.");
        return;
    }

    // Create new food object
    const newFood = {
        id: crypto.randomUUID(),
        name: name,
        calories: calorieValue
    };

    foods.push(newFood);

    // Save and update display
    saveFoods();
    renderFoods();

    foodForm.reset();
});

// Reset all foods
resetBtn.addEventListener("click", () => {
    if (foods.length === 0) {
        alert("There are no food entries to clear.");
        return;
    }

    if (confirm("Are you sure you want to clear all food entries?")) {
        foods = [];

        saveFoods();
        renderFoods();
    }
});

// Display saved foods when page loads
renderFoods();
