import getTaskElement from "./getTaskElement.js";

export default class Task {
  constructor(taskContent) {
    this.content = taskContent;
  }

  init() {
    // добавляет элемент с задачей в html, делаем элемент перемещаемым
    getTaskElement(this.content).draggable = true; 
  }
}
