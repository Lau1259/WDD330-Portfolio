export default class Reason {
  constructor(content) {
    this.content = content;
  }
  toHTML() {
    return `<div class="reason">
    ${this.content}
    </div>`
  }
}