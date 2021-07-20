export default class Quote {
  constructor(id, content, author, authorSlug) {
    this.id = id;
    this.content = content;
    this.author = author;
    this.authorSlug = authorSlug;
  }
  display() {
    console.log(`Author: ${this.author}
Content: ${this.content}
id: ${this.id}`);
  }
  toHTML() {
    return `<div class="quote">
    <p class="quote-content">${this.content}</p>
    <p class="quote-author accent">- ${this.author}</p>
    </div>
    `
  }
}