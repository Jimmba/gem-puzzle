export default class Options {
  constructor() {
    this.getSize();
  }

  getSize() {
    if (localStorage.getItem('size') === null) {
      this.setSize(4);
    }
    this.size = localStorage.getItem('size');
    return this.size;
  }

  setSize(size) {
    this.size = size;
    localStorage.setItem('size', size);
  }
}
