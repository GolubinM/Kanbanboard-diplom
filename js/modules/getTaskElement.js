export default function getTaskElement(content) {
  let insertPosition = document.querySelector(".taskboard__list");
  
  // let divNewTask = `<form class="task__form" aria-label="Форма задачи">
  let divNewTask = `<div class="taskboard__item task">
  <div class="task__body">
    <p class="task__view">${content}</p>
    <input class="task__input" type="text" value="${content}">
  </div>
  <button class="task__edit" type="button" aria-label="Изменить"></button>
</div>`;
// </form>`;
  insertPosition.insertAdjacentHTML("afterbegin", divNewTask);
  return insertPosition.firstChild;
}


//   document.querySelector(".task--active").classList.remove('task--active'); //сделать задачу не активной
//   document.querySelector("...").classList.add('taskboard__item task task--active'); //сделать задачу активной
