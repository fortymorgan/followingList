const render = require('./render');
const pushHistoryState = require('./pushHistory');

const input = document.querySelector('.search');
const button = document.querySelector('.search-button');

button.addEventListener('click', () => {
  // location.pathname = `/following/${input.value}`;
  pushHistoryState('following', input.value);
  render.render();
});

input.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    pushHistoryState('following', input.value);
    render.render();
  }
});

window.onpopstate = render.render;

render.render();
