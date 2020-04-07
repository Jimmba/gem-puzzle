export default class Page {
  constructor(size) {
    this.gameStarted = false;
    this.updateSize(size);
    this.createResultArray();
    this.counter = 0;
  }

  createResultArray() {
    const ar = [];
    for (let i = 0; i < this.size ** 2 - 1; i += 1) {
      ar.push(i + 1);
    }
    ar.push(0);
    this.resultArray = ar;
  }

  render() {
    this.loadPage();
    this.loadField(this.resultArray);
  }

  createDiv(className, parent, text) {
    this.createdDiv = true;
    const div = document.createElement('div');
    div.className = className;
    if (text) div.innerHTML = text;
    parent.appendChild(div);
    return div;
  }

  loadPage() {
    const wrapper = this.createDiv('wrapper', document.body);

    const content = this.createDiv('content', wrapper);

    const buttons = this.createDiv('buttons', content);
    this.start = this.createDiv('buttons-button start', buttons, 'Размешать и начать');
    this.stop = this.createDiv('buttons-button stop', buttons, 'Стоп');
    this.begin = this.createDiv('buttons-button begin', buttons, 'Начать заново');
    this.results = this.createDiv('buttons-button results', buttons, 'Результаты');

    const counters = this.createDiv('counters', content);
    const step = this.createDiv('counters-counter step', counters);
    this.stepDescription = this.createDiv('counters-counter--item step-description', step, 'Ходов: ');
    this.stepValue = this.createDiv('counters-counter--item step-value', step, '0');
    const time = this.createDiv('counters-counter time', counters);
    this.timeDescription = this.createDiv('counters-counter--item time-description', time, 'Время: ');
    this.timeValue = this.createDiv('counters-counter--item time-value', time, '00 : 00');

    this.field = this.createDiv('field', content);
    const fieldSize = this.createDiv('about field-size', content);
    this.createDiv('field-size-description', fieldSize, 'Размеры поля:');
    this.createDiv('field-size-value', fieldSize, `${this.size}x${this.size}`);
    const otherSizes = this.createDiv('about otherSizes', content);
    // this.createDiv('otherSizes-description', otherSizes, 'Другие размеры: ');
    for (let i = 3; i < 9; i += 1) {
      this.createDiv(`otherSizes-value otherSizes-value${i}`, otherSizes, `${i}x${i}`);
    }
  }

  loadField(ar) {
    for (let i = 0; i < ar.length; i += 1) {
      const text = ar[i] === 0 ? '' : ar[i];
      this.createDiv(`field-item field-item${this.size} field-item--${ar[i]}`, this.field, `${text}`);
    }
    document.getElementsByClassName('step-value')[0].innerHTML = this.counter;
  }

  repaintField(ar, counter) {
    this.field.innerHTML = '';
    if (!counter) this.counter = 0;
    this.loadField(ar);
  }

  updateSize(size) {
    this.size = parseInt(size, 10);
    this.createResultArray();
  }

  shuffle() {
    this.fieldNode = document.querySelector('.field');
    this.nodes = this.fieldNode.querySelectorAll('.field-item');
    const ar = this.resultArray.slice(0);
    let tmp;
    let newPosition;
    for (let i = 0; i < this.size ** 4; i += 1) {
      const oldPosition = ar.indexOf(0);
      const direction = Math.floor(Math.random() * 4);
      // console.log(direction);
      switch (direction) {
        // switch (1) {
        case 0:
          // up
          newPosition = oldPosition - this.size;
          if (newPosition > 0) {
            tmp = ar[oldPosition];
            ar[oldPosition] = ar[newPosition];
            ar[newPosition] = tmp;
          }
          break;
        case 1:
          // left
          newPosition = oldPosition - 1;
          if (Math.floor(oldPosition / this.size) === Math.floor(newPosition / this.size)) {
            tmp = ar[oldPosition];
            ar[oldPosition] = ar[newPosition];
            ar[newPosition] = tmp;
          }
          break;
        case 2:
          // right
          newPosition = oldPosition + 1;
          if (Math.floor(oldPosition / this.size) === Math.floor(newPosition / this.size)) {
            tmp = ar[oldPosition];
            ar[oldPosition] = ar[newPosition];
            ar[newPosition] = tmp;
          }
          break;
        default:
          // down
          newPosition = oldPosition + this.size;
          if (newPosition < this.size ** 2 - 1) {
            tmp = ar[oldPosition];
            ar[oldPosition] = ar[newPosition];
            ar[newPosition] = tmp;
          }
          break;
      }
    }
    this.repaintField(ar);
    this.currentArray = ar;
    this.startedArray = ar.slice(0);
  }
}
