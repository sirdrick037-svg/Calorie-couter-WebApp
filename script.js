
const foodForm = document.getElementById("foodForm");
const foodName = document.getElementById("foodName");
const calories = document.getElementById("calories");
const foodList = document.getElementById("foodList");
const totalCalories = document.getElementById("totalCalories");
const resetBtn = document.getElementById("resetBtn");

const STORAGE_KEY = "calorieCounterFoods";

// Load saved foods safely
function loadFoods() {
    try {
        const savedFoods = JSON.parse(localStorage.getItem(STORAGE_KEY));
        return Array.isArray(savedFoods) ? savedFoods : [];
    } catch (error) {
        console.error("Could not load saved foods:", error);
        return [];
    }
}

let foods = loadFoods();

// Save foods
function saveFoods() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(foods));
}

// Display foods and update total
function renderFoods() {
    foodList.innerHTML = "";

    foods.forEach((food) => {
        const item = document.createElement("li");

        item.className =
            "flex justify-between items-center bg-gray-100 p-3 rounded";

        const details = document.createElement("span");
        details.textContent = `${food.name} - ${food.calories} calories`;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.type = "button";
        deleteBtn.className =
            "bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600";

        deleteBtn.addEventListener("click", () => {
            foods = foods.filter((f) => f.id !== food.id);
            saveFoods();
            renderFoods();
        });

        item.append(details, deleteBtn);
        foodList.appendChild(item);
    });

    // Calculate total
    const total = foods.reduce(
        (sum, food) => sum + Number(food.calories || 0),
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
        id: crypto.randomUUID(),
        name: name,
        calories: calorieValue
    };

    foods.push(newFood);

    saveFoods();
    renderFoods();

    foodForm.reset();
});

// Reset all foods
resetBtn.addEventListener("click", () => {
    if (foods.length === 0) {
        alert("There are no food entries to reset.");
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
