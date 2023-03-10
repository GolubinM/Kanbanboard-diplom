export default function getTaskElement(content) {
  let insertPosition = document.querySelector(".task--empty");
  let divNewTask = `<div class="taskboard__item task task--backlog">
  <div class="task__body">
  <p class="task__view">${content}</p>
  <input class="task__input" type="text" value="${content}">
  </div>
  <button class="task__edit" type="button" aria-label="Изменить"></button>
  </div>`;
  insertPosition.insertAdjacentHTML("beforebegin", divNewTask);
  return insertPosition.previousSibling;
}
