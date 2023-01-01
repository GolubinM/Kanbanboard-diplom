import Task from "./modules/task.js";

let inputForm = document.querySelector(".add-task__form");

inputForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let formData = new FormData(inputForm);
  console.log(formData.get("task-name"));
  const task = new Task(formData.get("task-name"));
  task.init();
});