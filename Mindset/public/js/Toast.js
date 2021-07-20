export default class Toast {
  constructor(message, style) {
    this.message = message;
    this.style = style;
    this.id = Date.now();
  }
}

