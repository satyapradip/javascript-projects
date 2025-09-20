// Get references to the important DOM elements we'll need
const inputBox = document.getElementById("input-box");        // Reference to the input field where users type new tasks
const listContainer = document.getElementById("list-container"); // Reference to the ul element that will hold all todo items

// Function to add a new task to the list
function addTask() {
    // Check if the input is empty
    if(inputBox.value === '') {
        alert("You must write something!");
    } else {
        // Create a new list item
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;  // Set the text of the list item to what user typed
        listContainer.appendChild(li);   // Add the new list item to our container

        // Create a delete button (×) for this task
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";      // Unicode character for × symbol
        li.appendChild(span);           // Add the delete button to our list item
    }
    inputBox.value = "";               // Clear the input field after adding task
    saveData();                        // Save the updated list to localStorage
}

// Event listener for the Enter key in the input field
inputBox.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {           // Check if Enter key was pressed
        addTask();                     // If so, add the task
    }
});

// Event listener for clicking on list items or delete buttons
listContainer.addEventListener("click", function(e) {
    // If we clicked on a list item
    if(e.target.tagName === "LI") {
        e.target.classList.toggle("checked");  // Toggle the 'checked' class (marks task as done/undone)
        saveData();                           // Save the updated state
    }
    // If we clicked on a delete button
    else if(e.target.tagName === "SPAN") {
        e.target.parentElement.remove();      // Remove the whole list item
        saveData();                           // Save the updated list
    }
}, false);

// Function to save the current state of the todo list to localStorage
function saveData() {
    // Save the entire HTML content of our list container
    localStorage.setItem("data", listContainer.innerHTML);
}

// Function to load saved todo list data from localStorage
function loadData() {
    // Get saved data and set it as our list's HTML content
    // If no data exists ('|| ""'), use empty string
    listContainer.innerHTML = localStorage.getItem("data") || "";
}

// When the page loads, restore the saved todo list
loadData();
