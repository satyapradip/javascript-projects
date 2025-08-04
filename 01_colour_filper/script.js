// Select all elements with the class "box"
const boxes = document.querySelectorAll('.box');
const body = document.querySelector('body');

// Loop through each button to add a click event listener
boxes.forEach(function (button) {
    button.addEventListener('click', function (event) {
    // Get the specific button that was clicked
        const clickedButton = event.target;

    // Get the computed background color from the CSS stylesheet
        const computedColor = window.getComputedStyle(clickedButton).backgroundColor;

    // Set the body's background color to the button's color
        body.style.backgroundColor = computedColor;
    });
});