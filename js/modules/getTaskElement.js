export default function getTaskElement(content) {
  let insertPosition = document.querySelector(".taskboard__list");
//   document.querySelector(".task--active").classList.remove('task--active');
  
// let divNewTask = `<div class="taskboard__item task task--active">
  let divNewTask = `<div class="taskboard__item task">
              <div class="task__body>
                <p class="task__view">${content}</p>
                <input class="task__input" type="text" value="Название первой задачи">
              </div>
              <button class="task__edit" type="button" aria-label="Изменить"></button>
            </div>`;
  insertPosition.insertAdjacentHTML("afterbegin", divNewTask);
}
