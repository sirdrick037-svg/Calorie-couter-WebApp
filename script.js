console.log("Calorie Counter JavaScript is working!");

const foodForm = document.getElementById("foodForm");
const foodName = document.getElementById("foodName");
const calories = document.getElementById("calories");
const foodList = document.getElementById("foodList");
const totalCalories = document.getElementById("totalCalories");
const resetBtn = document.getElementById("resetBtn");

let foods = [];

foodForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = foodName.value.trim();
    const calorieValue = Number(calories.value);

    if (!name || calories.value === "" || calorieValue < 0) {
        alert("Please enter valid food details.");
        return;
    }

    foods.push({
        id: Date.now(),
        name: name,
        calories: calorieValue
    });

    renderFoods();
    foodForm.reset();
});

function renderFoods() {
    foodList.innerHTML = "";

    foods.forEach(function(food) {
        const li = document.createElement("li");

        li.className =
            "flex justify-between items-center bg-gray-100 p-3 rounded";

        li.innerHTML = `
            <span>${food.name} - ${food.calories} calories</span>
            <button class="bg-red-500 text-white px-3 py-1 rounded">
                Delete
            </button>
        `;

        li.querySelector("button").addEventListener("click", function() {
            foods = foods.filter(function(item) {
                return item.id !== food.id;
            });

            renderFoods();
        });

        foodList.appendChild(li);
    });

    const total = foods.reduce(function(sum, food) {
        return sum + food.calories;
    }, 0);

    totalCalories.textContent = total;
}

resetBtn.addEventListener("click", function() {
    foods = [];
    renderFoods();
});
