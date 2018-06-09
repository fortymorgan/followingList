const pushHistoryState = require('./pushHistory');
const render = require('./render');
// console.log('folowing');
// console.log(render);
const input = document.querySelector('.search');
const button = document.querySelector('.search-button');

button.addEventListener('click', () => {
  pushHistoryState(input.value);
  render();
  // location.hash = input.value;
});

input.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    pushHistoryState(input.value);
    render();
    // location.hash = input.value;
  }
});

window.onpopstate = () => render();
// window.addEventListener('hashchange', () => render());

render();
