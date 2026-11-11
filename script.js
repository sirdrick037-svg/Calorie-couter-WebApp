
alert("JavaScript is connected!");

const foodForm = document.getElementById("foodForm");

foodForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("foodName").value;
    const calories = Number(document.getElementById("calories").value);

    alert("Food: " + name + "\nCalories: " + calories);
});
