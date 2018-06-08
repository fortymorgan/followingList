const input = document.querySelector('.search');
const button = document.querySelector('.search-button');
const currentUser = document.querySelector('.current-user');
const followingList = document.querySelector('.following');

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
  history.pushState(state, title);
  render();
};

const resetList = () => {
  currentUser.innerHTML = '';
  followingList.innerHTML = '';
  input.value = '';
};

const getUserData = async () => {
  const username = history.state.user;
  const userLink = `https://api.github.com/users/${username}`;
  const userData = await fetch(userLink)
    .then(blob => blob.json());

  return userData;
};

const createAvatarImg = (src, height = '') => `<img src="${src}" height="${height}">`;
const createUsernameSpan = (username) => `<span class="username">${username}</span>`;

const createFollowingListHtml = ({ avatar_url, login }) => {
  const listItem = document.createElement('li');

  const userAvatar = createAvatarImg(avatar_url, 20);
  const username = createUsernameSpan(login);

  listItem.innerHTML = userAvatar + username;

  listItem.addEventListener('click', () => pushHistoryState(login));

  followingList.append(listItem);
};

const render = async () => {
  resetList();

  if (!history.state) {
    return;
  }

  const { avatar_url, following_url, login } = await getUserData();

  const currentUserAvatar = createAvatarImg(avatar_url, 40);
  const currentUserHeader = `<span>${createUsernameSpan(login)} following:</span>`;

  currentUser.innerHTML = currentUserAvatar + currentUserHeader;

  const [followingUrl] = following_url.split('{');

  const currentUserFollowingList = await fetch(followingUrl)
    .then(blob => blob.json());

  createFollowingListHtml(currentUserFollowingList);
};

render();
