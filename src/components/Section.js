export default class Section {
  constructor({ items, renderer }, listSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this.container = document.querySelector(listSelector);
  }
  addItem(element) {
    this.container.append(element);
  }
  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
}
