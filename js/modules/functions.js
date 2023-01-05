export const btnClearBasket = document.querySelector(".button--clear");
export {
  editTasks,
  changeActive,
  saveDeactivate,
  unSaveDeactivate,
  isBasketEmpty,
  classByColumn,
  hasTask,
};
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
