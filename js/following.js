const pushHistoryState = require('./pushHistory');
const render = require('./render');

const input = document.querySelector('.search');
const button = document.querySelector('.search-button');

button.addEventListener('click', () => {
  pushHistoryState(input.value);
  render();
});
input.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    pushHistoryState(input.value);
    render();
  }
});

window.onpopstate = () => render();
