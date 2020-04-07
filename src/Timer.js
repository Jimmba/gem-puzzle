export default class Timer {
  constructor() {
    this.time = document.querySelector('.time-value');
  }

  start() {
    this.time.innerHTML = '00 : 00';
    this.startTime = Date.now();
    this.stopTime = false;
    this.timer = setInterval(() => {
      this.time.innerHTML = this.getTime();
    }, 1000);
  }

  stop() {
    clearTimeout(this.timer);
  }

  getTime() {
    this.nowTime = Date.now();
    const time = (this.nowTime - this.startTime) / 1000;
    let min = Math.floor(time / 60);
    min = min < 10 ? `0${min}` : min;
    let sec = Math.floor(time % 60);
    sec = sec < 10 ? `0${sec}` : sec;
    return (`${min} : ${sec}`);
  }

  clear() {
    clearTimeout(this.timer);
    this.time.innerHTML = '00 : 00';
  }
}
