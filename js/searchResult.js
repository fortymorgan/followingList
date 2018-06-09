// console.log('search');
// console.log(render);
const createAvatarImg = (src, height = '') => `<img src="${src}" height="${height}">`;
const createUsernameSpan = (username) => `<span class="username">${username}</span>`;

const getUserData = async () => {
  // const username = location.hash.slice(1);
  const username = history.state.user;
  const userLink = `https://api.github.com/users/${username}`;
  const userData = await fetch(userLink)
  .then(blob => blob.json());
  
  return userData;
};

const createFollowingListHtml = userFollowingList => {
  const followingList = document.querySelector('.following');
  const pushHistoryState = require('./pushHistory');
  const render = require('./render');

  userFollowingList.forEach(({ avatar_url, login }) => {
    const listItem = document.createElement('li');
    
    const userAvatar = createAvatarImg(avatar_url, 20);
    const username = createUsernameSpan(login);
    
    listItem.innerHTML = userAvatar + username;
    // listItem.innerHTML = `<a href="#${login}">${userAvatar + username}</a>`;
    
    listItem.addEventListener('click', () => {
      pushHistoryState(login);
      render();
    });
    
    followingList.append(listItem);
  });
};

module.exports = async () => {
  const currentUser = document.querySelector('.current-user');
  const { avatar_url, following_url, login } = await getUserData();
  
  const currentUserAvatar = createAvatarImg(avatar_url, 40);
  const currentUserHeader = `<span>${createUsernameSpan(login)} following:</span>`;
  
  currentUser.innerHTML = currentUserAvatar + currentUserHeader;

  const [followingUrl] = following_url.split('{');

  const currentUserFollowingList = await fetch(followingUrl)
    .then(blob => blob.json());

  createFollowingListHtml(currentUserFollowingList);
};
