import Task from "./modules/task.js";
import {
  editTasks,
  changeActive, //используется в импортируемых функциях
  saveDeactivate,
  unSaveDeactivate,
  isBasketEmpty,
  classByColumn,
  hasTask,
  btnClearBasket,
} from './modules/functions.js';

// Проверка корзины на пустоту
isBasketEmpty();
//------------------------------------------------------------------------
// Создание задачи

let inputForm = document.querySelector(".add-task__form");
//Обработка создания нового элемента в поле Input
inputForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let formData = new FormData(inputForm);
  const taskContent = new Task(formData.get("task-name").trim());
  taskContent.init();
  inputForm.reset();
  // Проверка есть ли в колонках задачи. Скрытие пустых элементов если есть.
  hasTask();
});

//Обработка перехода на поле Input из редактируемых элементов task. Сохранение input.value.
inputForm.addEventListener("click", () => {
  document.querySelectorAll(".task--active").forEach(function (task) {
    saveDeactivate(task);
  });
});

//Обработка удаления задачи из корзины
btnClearBasket.addEventListener("click", () => {
  const deletedTasks = document.querySelectorAll(".task--basket"); // отбор удаляемых задач
  deletedTasks.forEach((deletedTask) => {
    deletedTask.parentNode.removeChild(deletedTask); // удаление html кода задач
  });
  hasTask(); // Отображение пустого элемента "Корзина пуста"
  isBasketEmpty();
});

// Реализация Drag&Drop элемента задачи
//------------------------------------------------------------------------
const tasksListElements = document.querySelectorAll(".taskboard__list");
const taskElements = document.querySelectorAll(".taskboard__item");
taskElements.forEach((evt) => {
  if (!evt.classList.contains("task--empty")) {
    evt.draggable = true;
  }
});

document.addEventListener(`dragstart`, (evt) => {
  if (evt.target.classList.contains("task")) {
    const draggedTask = evt.target;
    draggedTask.classList.add(`task--dragged`);
  }
});

document.addEventListener(`dragend`, (evt) => {
  const activeElement = document.querySelector(`.task--dragged`);
  evt.target.classList.remove(`task--dragged`);
  classByColumn(activeElement);
  isBasketEmpty();
});

tasksListElements.forEach((tasksListElement) =>
  tasksListElement.addEventListener(`dragover`, (evt) => {
    if (evt.target.classList.contains("task")) {
      // Разрешаем сбрасывать элементы в эту область
      evt.preventDefault();
      // Находим перемещаемый элемент
      const activeElement = document.querySelector(`.task--dragged`);
      // Находим элемент, над которым в данный момент находится курсор
      const currentElement = evt.target;
      // Проверяем, что событие сработало:
      // 1. не на том элементе, который мы перемещаем,
      // 2. именно на элементе списка
      const isMoveable =
        activeElement !== currentElement && currentElement.classList.contains(`task`);
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
    // Проверка есть ли в колонках задачи. Скрытие пустых элементов если есть.
    hasTask();
  })
);

// Обработка вызова редактирования задачи
document.querySelector(".taskboard").addEventListener("click", (event) => {
  const element = event.target;
  const classElemnet = element.getAttribute("aria-label");
  if (classElemnet === "Изменить") editTasks(element);
  // if (!element) return;
});

//Обработка нажатия Enter или Esc для завершения редактирования задачи
document.querySelector(".taskboard").addEventListener("keyup", (event) => {
  const element = event.target;
  const classElemnet = element.getAttribute("class");
  if (classElemnet === "task__input" && event.keyCode === 13) {
    saveDeactivate(element.parentNode.parentNode);
  }
  if (classElemnet === "task__input" && event.keyCode === 27) {
    unSaveDeactivate(element.parentNode.parentNode);
  }
});
