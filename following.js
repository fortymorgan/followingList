const input = document.querySelector('.search');
const button = document.querySelector('.search-button');

button.addEventListener('click', () => pushHistoryState(input.value));
input.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    pushHistoryState(input.value);
  }
});

window.onpopstate = () => render();

const pushHistoryState = user => {
  const state = { user };
  const title = `${user} followings`;
  const hash = !location.hash ? '#search' : '';
  history.pushState(state, title, location.href + hash);
  render();
};

const resetList = () => {
  currentUser.innerHTML = '';
  followingList.innerHTML = '';
  input.value = '';
};

const render = () => {
  resetList();
  router(routes);
};
