const render = require('./render');
const input = document.querySelector('.search');
const button = document.querySelector('.search-button');

button.addEventListener('click', () => {
  location.pathname = `/following/${input.value}`;
});

input.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    location.pathname = `/following/${input.value}`;
  }
});

render.render();
