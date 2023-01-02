import Task from "./modules/task.js";

let inputForm = document.querySelector(".add-task__form");

inputForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let formData = new FormData(inputForm);
  const task = new Task(formData.get("task-name"));
  task.init();
  inputForm.reset();
});

// let editBtns = document.querySelectorAll(".task__edit");
// console.log(editBtns);

// editBtns.forEach((editBtn)=>editBtn.addEventListener("click", (event) => {
//   //   //event.preventDefault();
//   //   // this.classList.add('task--active');
//   const parent = editBtn.parentNode;
//   console.log(parent);
//   console.log('click!!');
//   //   console.log('TASK ACTIVATED');
//   //   // console.log('TASK ACTIVATED');
// }));
