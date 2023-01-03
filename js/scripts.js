import Task from "./modules/task.js";

let inputForm = document.querySelector(".add-task__form");
//Обработка создания нового элемента в поле Input
inputForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let formData = new FormData(inputForm);
  const taskContent = new Task(formData.get("task-name"));
  taskContent.init();
  inputForm.reset();
});

//Обработка перехода на поле Input из редактируемых элементов task
inputForm.addEventListener("click", () => {
  document.querySelectorAll(".task--active").forEach(function (item) {
    item.querySelector(".task__view").textContent =
      item.querySelector(".task__input").value;
    item.classList.remove("task--active");
  });
});

//------------------------------------------------------------------------
//------------------------------------------------------------------------

const tasksListElements = document.querySelectorAll(`.taskboard__list`);
console.log(tasksListElements);
const taskElements = document.querySelectorAll(".taskboard__item");
taskElements.forEach((evt) => {
  if (!evt.classList.contains("task--empty")) {
    evt.draggable = true;
    console.log(`dragable`);
  }
});

document.addEventListener(`dragstart`, (evt) => {
  if (evt.target.classList.contains("task")) {
    const draggedTask = evt.target;
    console.log("Потащили...");
    draggedTask.classList.add(`task--dragged`);
    draggedTask.classList.add(`selected`);

    // dragging.classList.add('dragging');
    // cloned = dragging.cloneNode(true);
  }
});

document.addEventListener(`dragend`, (evt) => {
  evt.target.classList.remove(`task--dragged`);
  evt.target.classList.remove(`selected`);
});

tasksListElements.forEach((tasksListElement) =>
  tasksListElement.addEventListener(`dragover`, (evt) => {
    if (evt.target.classList.contains("task")) {
      // Разрешаем сбрасывать элементы в эту область
      evt.preventDefault();

      // Находим перемещаемый элемент
      // const tasksListElement = document.querySelector(".taskboard__list");
      // console.log(tasksListElement);
      const activeElement = document.querySelector(`.task--dragged`);

      // Находим элемент, над которым в данный момент находится курсор
      const currentElement = evt.target;
      // Проверяем, что событие сработало:
      // 1. не на том элементе, который мы перемещаем,
      // 2. именно на элементе списка
      const isMoveable =
        activeElement !== currentElement &&
        currentElement.classList.contains(`task`);

      // Если нет, прерываем выполнение функции
      if (!isMoveable) {
        return;
      }

      // Находим элемент, перед которым будем вставлять
      const nextElement =
        currentElement === activeElement.nextElementSibling
          ? currentElement.nextElementSibling
          : currentElement;

      // Вставляем activeElement перед nextElement
      tasksListElement.insertBefore(activeElement, nextElement);
    }
  })
);
