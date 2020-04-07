import Options from './Options';
import Page from './Page';
import Timer from './Timer';

const options = new Options();

const page = new Page(options.size);
page.render();

const timer = new Timer();

function swapBlocks(movingBlock, zeroBlock) {
  let tmp;
  if (Math.abs(movingBlock - zeroBlock) === page.size || Math.abs(movingBlock - zeroBlock) === 1) {
    tmp = page.currentArray[zeroBlock];
    page.currentArray[zeroBlock] = page.currentArray[movingBlock];
    page.currentArray[movingBlock] = tmp;
    page.counter += 1;
    page.repaintField(page.currentArray, page.counter);
  }
}

function checkFinish() {
  for (let i = 0; i < page.currentArray.length; i += 1) {
    if (page.currentArray[i] !== page.resultArray[i]) return false;
  }
  return true;
}

function gameAction(e) {
  const clicked = parseInt(e.target.classList[2].substring(12), 10);
  const zeroBlock = page.currentArray.indexOf(0);
  const movingBlock = page.currentArray.indexOf(clicked);
  swapBlocks(movingBlock, zeroBlock);
  if (checkFinish()) {
    const time = timer.getTime();
    const step = page.counter;
    setTimeout(() => {
      alert(`Ура! Вы решили головоломку за ${time} и ${step} ходов!`);
    }, 100);
    timer.stop();
    document.getElementsByClassName('field')[0].removeEventListener('click', gameAction);
  }
}

function stopGame() {
  timer.stop();
  document.getElementsByClassName('field')[0].removeEventListener('click', gameAction);
}

function discard() {
  page.currentArray = page.startedArray.slice(0);
  page.repaintField(page.startedArray);
  document.getElementsByClassName('field')[0].addEventListener('click', gameAction);
  timer.stop();
  timer.start();
}

function play() {
  page.shuffle();
  document.getElementsByClassName('field')[0].addEventListener('click', gameAction);
}

function startGame() {
  timer.start();
  play();
}

function changeField(e) {
  const size = parseInt(e.target.innerText.substring(2), 10);
  timer.clear();
  options.setSize(size);
  page.updateSize(options.getSize());
  page.createResultArray();
  page.repaintField(page.resultArray);
  page.startedArray = page.resultArray.slice(0);
}

document.getElementsByClassName('start')[0].addEventListener('click', startGame);
document.getElementsByClassName('stop')[0].addEventListener('click', stopGame);
const sizes = document.getElementsByClassName('otherSizes-value');
for (let i = 0; i < sizes.length; i += 1) {
  sizes[i].addEventListener('click', changeField);
}

document.getElementsByClassName('begin')[0].addEventListener('click', discard);
