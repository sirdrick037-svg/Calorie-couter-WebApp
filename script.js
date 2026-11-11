
const foodForm = document.getElementById("foodForm");
const foodName = document.getElementById("foodName");
const calories = document.getElementById("calories");
const foodList = document.getElementById("foodList");
const totalCalories = document.getElementById("totalCalories");
const resetBtn = document.getElementById("resetBtn");

const STORAGE_KEY = "calorieCounterFoods";

let foods = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// Save food entries
function saveFoods() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(foods));
}

// Display food entries
function renderFoods() {
    foodList.innerHTML = "";

    foods.forEach((food) => {
        const foodItem = document.createElement("li");
        foodItem.className =
            "flex justify-between items-center rounded bg-gray-100 px-4 py-3";

        const foodInfo = document.createElement("span");
        foodInfo.textContent = `${food.name}: ${food.calories} calories`;

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
        calorieValue < 0
    ) {
        alert("Please enter a valid calorie amount.");
        return;
    }

    const newFood = {
        id: Date.now(),
        name: name,
        calories: calorieValue
    };

    foods.push(newFood);

    saveFoods();
    renderFoods();

    foodForm.reset();
});

// Reset all food entries
resetBtn.addEventListener("click", () => {
    if (foods.length === 0) return;

    const confirmReset = confirm(
        "Are you sure you want to delete all food entries?"
    );

    if (confirmReset) {
        foods = [];
        saveFoods();
        renderFoods();
    }
});

// Load saved entries when page opens
renderFoods();
