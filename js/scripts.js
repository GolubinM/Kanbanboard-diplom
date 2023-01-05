import Task from "./modules/task.js";
const btnClearBasket = document.querySelector(".button--clear");

// Проверка корзины на пустоту
isBasketEmpty();
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
//------------------------------------------------------------------------
function editTasks(btnElement) {
  const task = btnElement.parentNode;
  //выход из редактирования для всех остальных элементов
  changeActive(task);
  //переход к концу строки поля input редактируемой задачи
  const inputTask = task.querySelector(".task__input");
  inputTask.focus();
  inputTask.selectionStart = inputTask.value.length;
}
//------------------------------------------------------------------------
function changeActive(task) {
  // отключает режим редактирования для всех задач, переключает режим для текущей задачи
  // обновляет содержание задачи из поля input для редактируемых задач
  const isActive = task.classList.contains("task--active");
  document.querySelectorAll(".task--active").forEach(function (item) {
    item.querySelector(".task__view").textContent = item.querySelector(".task__input").value;
    item.classList.remove("task--active");
  });
  task.classList.toggle("task--active", !isActive);
}
//------------------------------------------------------------------------
// сохранить текст задачи из input в <p> и сделать задачу не активной
function saveDeactivate(task) {
  task.querySelector("p").textContent = task.querySelector("input").value;
  task.classList.remove("task--active");
}
//------------------------------------------------------------------------
// восстановить значение input из <p> и сделать задачу не активной
function unSaveDeactivate(task) {
  task.querySelector("input").value = task.querySelector("p").textContent;
  task.classList.remove("task--active");
}

//------------------------------------------------------------------------
// Проверка корзины на пустоту
function isBasketEmpty() {
  const isEmpty = !Boolean(document.querySelector(".taskboard__list--trash").children.length - 1);
  btnClearBasket.disabled = isEmpty;
  return isEmpty;
}

//------------------------------------------------------------------------
//Меняем класс задачи в соотвтествии с классом группы с помощью regExp
function classByColumn(task) {
  task.classList.value = task.classList.value.replace(
    /\btask--.+\b/,
    task.parentNode.parentNode.classList[1].replace(/board__group/, "")
  );
}
//------------------------------------------------------------------------
//Cкрытие пустого элемента если в taskboard__group присутствуют более 1 элемента '.taskboard__item'.
function hasTask() {
  // создаем коллекцию колонок задач
  const taskboardListCollection = document.querySelectorAll(".taskboard__list");
  taskboardListCollection.forEach((taskboard) => {
    //определяем количество элементов в колонке
    let countTask = taskboard.querySelectorAll(".task").length;
    // скрытие или отображение пустого элемента при опустошении колонок
    const classEmptyTasks = taskboard.querySelector(".task--empty").classList;
    countTask > 1 ? classEmptyTasks.add("hidden-block") : classEmptyTasks.remove("hidden-block");
  });
}
