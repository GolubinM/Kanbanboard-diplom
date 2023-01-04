import getTaskElement from "./getTaskElement.js";

export default class Task {
  constructor(taskContent) {
    this.content = taskContent;
    this.task = undefined;
    this.inputTask = undefined;
  }

  _add(task) {
    return getTaskElement(task);
  }

  _changeActive(task) {
    // отключает режим редактирования для всех задач, переключает режим для текущей задачи
    // обновляет содержание задачи из поля input для редактируемых задач
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
    //переход к концу строки редактирования задачи
    const inputTask = this.task.querySelector(".task__input");
    inputTask.focus();
    inputTask.selectionStart = inputTask.value.length;
  }

  _dragDrop(newTask) {
    newTask.draggable = true;
  }

  init() {
    this.task = this._add(this.content); // добавляет элемент с задачей в html
    const editBtn = this.task.querySelector(".task__edit"); // определение кнопки редактирования задачи
    editBtn.addEventListener("click", () => {
      this._editTask(editBtn); // редактирование задачи
    });
    this._dragDrop(this.task);
    // завершение редактирования содержания задачи по Enter или Esc
    this.inputTask = this.task.querySelector(".task__input");
    this.inputTask.addEventListener("keyup", (event) => {
      if (event.keyCode === 13 || event.keyCode === 27) {
        this._changeActive(this.task);
      }
    });
  }
}
