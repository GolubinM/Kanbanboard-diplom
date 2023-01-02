import getTaskElement from "./getTaskElement.js";
const select = document.querySelector("#countries-dropdown");

const editGlobal = {
  edit: false,
};
export default class Task {
  constructor(taskContent) {
    this.content = taskContent;
    // this.editMode = false;
  }

  init() {
    console.log(this.content.toUpperCase());
    this._add(this.content);
    console.log(this);

    const editBtns = document.querySelectorAll(".task__edit");

    editBtns.forEach((editBtn) =>
      editBtn.addEventListener("click", (event) => {
        event.preventDefault();
        console.log(event);
        console.log(`Edit mode is ${editGlobal.edit}`);
        const parent = editBtn.parentNode;
        if (editGlobal.edit) {
          editGlobal.edit = false; // выключить режим редактирования
          parent.classList.remove("task--active");
        } else {
          editGlobal.edit = true; // включить режим редактирования
          parent.classList.add("task--active");
          
          const taskInput = parent.querySelector(".task__input");
          const taskView = parent.querySelector(".task__view");
          const taskForm = parent.parentNode;
          
          taskForm.addEventListener("submit", (event) => {
            event.preventDefault();
            console.log("Input was changed");
            taskView.textContent = taskInput.value;
            parent.classList.remove("task--active");
            editGlobal.edit = false;
            console.log("active was removed");
          });
        }
      })
    );
  }

  _add(tsk) {
    getTaskElement(tsk);
  }

  _changeActive(parent) {
    parent.classList.remove("task--active");
  }
}
