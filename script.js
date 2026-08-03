const foodForm = document.getElementById("foodForm");
const foodName = document.getElementById("foodName");
const calories = document.getElementById("calories");
const foodList = document.getElementById("foodList");
const totalCalories = document.getElementById("totalCalories");
const resetBtn = document.getElementById("resetBtn");

console.log(foodName);
const foods = [];

foodForm.addEventListener("submit", (event) => {
if(!foodName){
    displayMessage("Please enter a food input");
    return;
}else if(!calories || calories < 0 || calories  > 1000){
    displayMessage("Please enter a valid calorie input")
    return;
}

foods.push({foodName, calories});
const foodItem = document.createElement("li");
  foodItem.className = "rounded bg-gray-100 px-4 py-2";
  foodItem.textContent = ${foodName}: ${calories} calories;
  foodList.appendChild(foodItem);

  totalCalories.textContent = foods.reduce((total, food) => total + food.calories, 0);
  itemCount.textContent = ${foods.length} item${foods.length === 1 ? "" : "s"};
  emptyState.classList.add("hidden");
  formMessage.classList.add("hidden");
  foodForm.reset();
})

function displayMessage(message){
    alert(message)
}

resetBtn.addEventListener("click", (event) =>{
    foods.length = 0;

})
