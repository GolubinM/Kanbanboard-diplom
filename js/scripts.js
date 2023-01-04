import Task from "./modules/task.js";
const btnClearBasket = document.querySelector(".button--clear");
//------------------------------------------------------------------------
// Создание задачи

let inputForm = document.querySelector(".add-task__form");
//Обработка создания нового элемента в поле Input
inputForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let formData = new FormData(inputForm);
  const taskContent = new Task(formData.get("task-name"));
  taskContent.init();
  inputForm.reset();
  hasTask();
});

//Обработка перехода на поле Input из редактируемых элементов task
inputForm.addEventListener("click", () => {
  document.querySelectorAll(".task--active").forEach(function (item) {
    item.querySelector(".task__view").textContent = item.querySelector(".task__input").value;
    item.classList.remove("task--active");
  });
});

//------------------------------------------------------------------------
//Удаление задачи из корзины

btnClearBasket.addEventListener("click", () => {
  const deletedTasks = document.querySelectorAll(".task--basket"); // отбор удаляемых задач
  deletedTasks.forEach((deletedTask) => {
    deletedTask.parentNode.removeChild(deletedTask); // удаление html кода задач
  });
  hasTask(); // Отображение пустого элемента "Корзина пуста"
});

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
    hasTask();
  })
);

function classByColumn(activeElement) {
  const articleClass = activeElement.parentNode.parentNode.classList[1];
  // Выбор класса для задачи в соответствии с типом колонки
  let statusClassTask;

  switch (articleClass) {
    case "taskboard__group--backlog":
      statusClassTask = "task--backlog";
      break;
    case "taskboard__group--processing":
      statusClassTask = "task--processing";
      break;
    case "taskboard__group--done":
      statusClassTask = "task--done";
      break;
    case "taskboard__group--basket":
      statusClassTask = "task--basket";
      break;
  }
  // замена старого класса новым
  return activeElement.classList.replace(activeElement.classList[2], statusClassTask);
}
//------------------------------------------------------------------------
// function hasTask() - скрытие пустого элемента если в taskboard__group присутствуют более 1 элемента '.taskboard__item'.
function hasTask() {
  const taskboardListCollection = document.querySelectorAll(".taskboard__list"); // создаем коллекцию колонок задач
  taskboardListCollection.forEach((taskboard) => {
    let countTask = taskboard.querySelectorAll(".task").length; //определяем количество элементов в колонке
    // скрытие или отображение пустого элемента при опустошении колонок
    const classesEmptyTasks = taskboard.querySelector(".task--empty").classList;
    countTask > 1
      ? classesEmptyTasks.add("hidden-block")
      : classesEmptyTasks.remove("hidden-block");
  });
}

//------------------------------------------------------------------------
// Проверка корзину на пустоту
function isBasketEmpty() {
  const isEmpty = !Boolean(document.querySelector(".taskboard__list--trash").children.length - 1);
  // const emptyTaskList = document.querySelector(".task--empty-trash").classList;
  // isEmpty ? emptyTaskList.add("hidden") : emptyTaskList.remove("hidden");
  btnClearBasket.disabled = isEmpty;
  return isEmpty;
}
isBasketEmpty();
