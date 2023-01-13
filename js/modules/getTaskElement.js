export default function getTaskElement(content) {
  let insertPosition = document.querySelector(".task--empty");
  let divNewTask = `<div class="taskboard__item task task--backlog">`;
  divNewTask += `<div class="task__body">`;
  divNewTask += `<p class="task__view">${content}</p>`;
  divNewTask += `<input class="task__input" type="text" value="${content}">`;
  divNewTask += `</div>`;
  divNewTask += `<button class="task__edit" type="button" aria-label="Изменить"></button>`;
  divNewTask += `</div>`;
  insertPosition.insertAdjacentHTML("beforebegin", divNewTask);
  return insertPosition.previousSibling;
}
