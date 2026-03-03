// 1. Grab the main HTML elements
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");

// 2. Function to update the task counters
function updateCounters() {
  const completedTasks = document.querySelectorAll(".completed").length;
  // Count all 'li' items inside the list container that DO NOT have the 'completed' class
  const uncompletedTasks = document.querySelectorAll("#list-container li:not(.completed)").length;

  // Update the text on the screen (if the counter elements exist in the HTML)
  if (completedCounter) completedCounter.textContent = completedTasks;
  if (uncompletedCounter) uncompletedCounter.textContent = uncompletedTasks;
}

// 3. Main function to add a new task
function addTask() {
  const task = inputBox.value.trim();
  
  // Prevent adding empty tasks
  if (!task) {
    alert("Please write down a task");
    return;
  } 

  // Create a new list item (li) and add the HTML inside it
  const li = document.createElement("li");
  li.innerHTML = `
    <label>
      <input type="checkbox">
      <span>${task}</span>
    </label>
    <span class="edit-btn">Edit</span>
    <span class="delete-btn">Delete</span>
  `;

  // Grab the specific buttons and inputs INSIDE this new list item
  const checkbox = li.querySelector("input");
  const editBtn = li.querySelector(".edit-btn");
  const taskSpan = li.querySelector("span");
  const deleteBtn = li.querySelector(".delete-btn");

  // --- EVENT LISTENERS FOR THIS SPECIFIC TASK ---

  // Toggle completed class when checkbox is clicked
  checkbox.addEventListener("click", function () {
    li.classList.toggle("completed", checkbox.checked);
    updateCounters();
  });

  // Edit the task
  editBtn.addEventListener("click", function () {
    const update = prompt("Edit task:", taskSpan.textContent);
    // Only update if they typed something and didn't hit cancel
    if (update !== null && update.trim() !== "") {
      taskSpan.textContent = update.trim();
      li.classList.remove("completed");
      checkbox.checked = false; 
      updateCounters();
    }
  });

  // Delete the task with a confirmation popup
  deleteBtn.addEventListener("click", function () {
    if (confirm("Are you sure you want to delete this task?")) {
      li.remove();
      updateCounters();
    }
  });

  // Put the new task on the screen and clean up the input box
  listContainer.appendChild(li);
  inputBox.value = "";
  updateCounters();
}

// 4. Initialize counters when the page first loads
updateCounters();