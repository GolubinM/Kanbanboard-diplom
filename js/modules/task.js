import getTaskElement from "./getTaskElement.js";

export default class Task {
  constructor(taskContent) {
    this.content = taskContent;
    this.task = undefined;
  }

  _add(task) {
    return getTaskElement(task);
  }

  _changeActive(task) {
    // отключает режим редактирования для всех задач, переключает режим для текущей задачи
    const isActive = task.classList.contains("task--active");
    document.querySelectorAll(".task--active").forEach(function (item) {
      item.querySelector(".task__view").textContent =
        item.querySelector(".task__input").value;
      item.classList.remove("task--active");
    });
    task.classList.toggle("task--active", !isActive);
  }

  _editTask(editBtn) {
    this.task = editBtn.parentNode;
    this._changeActive(this.task); //отключаем редактирование для всех остальных элементов
    const taskForm = document.querySelector(".taskboard__form"); //для использования методов формы определяем родит.элемент form
    console.log(taskForm);
    console.log(`btn edit`);
    taskForm.addEventListener("submit", (event) => {
      event.preventDefault();
      console.log(`Form submit!!!`);
      this.task.querySelector(".task__view").textContent =
        this.task.querySelector(".task__input").value;
      this.task.classList.remove("task--active");
    });
  }

  _dragDrop(newTask) {
    newTask.draggable = true;
  }

  init() {
    const newTask = this._add(this.content); // добавляет элемент с задачей в html
    const editBtn = newTask.querySelector(".task__edit"); // определение кнопки редактирования задачи
    editBtn.addEventListener("click", () => {
      this._editTask(editBtn); // редактирование задачи
    });
    this._dragDrop(newTask);
  }
}
