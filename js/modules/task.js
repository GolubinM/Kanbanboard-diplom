import getTaskElement from "./getTaskElement.js"
const select = document.querySelector("#countries-dropdown");
export default class Task {
  constructor(taskContent) {
    this.content = taskContent;
  }

  init() {
    console.log(this.content.toUpperCase());
    this._add(this.content)
  }
  _add(tsk) {
    getTaskElement(tsk);
  }
}
