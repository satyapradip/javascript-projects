// --- 1. SELECTING ELEMENTS ---
// Find the HTML elements we need to interact with and store them in variables.
// We use `document.querySelector` with an ID selector ('#') to get each specific element.
const counter = document.querySelector('#counter');
const increaseBtn = document.querySelector('#increase');
const decreaseBtn = document.querySelector('#decrease');
const resetBtn = document.querySelector('#reset');

// --- 2. STATE MANAGEMENT ---
// Initialize a variable to hold the current count. 'let' is used because its value will change.
let count = 0;

// --- 3. EVENT LISTENERS ---
// Add a 'click' event listener to the "Increase" button.
increaseBtn.addEventListener('click', function(){
    // When the button is clicked, increment the count by 1.
    count++;
    // Call the updateCounter function to display the new count and apply styles.
    updateCounter();
});

// Add a 'click' event listener to the "Decrease" button.
decreaseBtn.addEventListener('click', function(){
    // When the button is clicked, decrement the count by 1.
    count--;
    // Call the updateCounter function.
    updateCounter();
});

// Add a 'click' event listener to the "Reset" button.
resetBtn.addEventListener('click', function(){
    // When the button is clicked, set the count back to 0.
    count = 0;
    // Call the updateCounter function.
    updateCounter();
});

// --- 4. UI UPDATE FUNCTION ---
// This function is responsible for all visual updates on the page.
function updateCounter() {
    // Update the text inside the counter element to show the current value of 'count'.
    counter.textContent = count;

    // Change the color of the counter based on its value.
    if (count < 0) {
        // If the count is negative, make the text red.
        counter.style.color = 'red';
    } else if (count > 0) {
        // If the count is positive, make the text green.
        counter.style.color = 'green';
    } else {
        // If the count is exactly 0, reset the color to the original blue.
        counter.style.color = '#007bff';
    }

    // Add a simple "pop" animation to give visual feedback on click.
    // Immediately scale the counter element up to 120% of its size.
    counter.style.transform = 'scale(1.2)';
    // After 150 milliseconds, set a timeout to scale it back to its original size (100%).
    setTimeout(() => {
        counter.style.transform = 'scale(1)';
    }, 150); // 150ms delay
}