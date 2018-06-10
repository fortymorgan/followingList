const createAvatarImg = (src, height = '') => `<img src="${src}" height="${height}">`;
const createUsernameSpan = (username) => `<span class="username">${username}</span>`;

const getUserData = async () => {
  const [_, __, username] = location.pathname.split('/');
  const userLink = `https://api.github.com/users/${username}`;
  const userData = await fetch(userLink)
  .then(blob => blob.json());
  
  return userData;
};

const createFollowingListHtml = userFollowingList => {
  const followingList = document.querySelector('.following');

  userFollowingList.forEach(({ avatar_url, login }) => {
    const listItem = document.createElement('li');
    
    const userAvatar = createAvatarImg(avatar_url, 20);
    const username = createUsernameSpan(login);
    
    listItem.innerHTML = `<a href="/following/${login}">${userAvatar + username}</a>`;
    
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
