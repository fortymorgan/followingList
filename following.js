const input = document.querySelector('.search');
const button = document.querySelector('.search-button');
const currentUser = document.querySelector('.current-user');
const followingList = document.querySelector('.following');

button.addEventListener('click', () => render(input.value));
input.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    render(input.value);
  }
});

const resetList = () => {
  currentUser.innerHTML = '';
  followingList.innerHTML = '';
  input.value = '';
}

const render = async username => {
  resetList();
  const userLink = `https://api.github.com/users/${username}`;
  const currentUserData = await fetch(userLink)
    .then(blob => blob.json());

  const currentUserAvatar = document.createElement('img');
  currentUserAvatar.src = currentUserData.avatar_url;
  currentUserAvatar.height = 40;

  currentUser.appendChild(currentUserAvatar);

  const currentUserHeader = document.createElement('span');
  currentUserHeader.innerText = `User ${username} following:`;

  currentUser.appendChild(currentUserHeader);

  const [followingUrl] = currentUserData.following_url.split('{');

  const currentUserFollowingList = await fetch(followingUrl)
    .then(blob => blob.json());

  currentUserFollowingList.forEach(item => {
    const listItem = document.createElement('li');

    const userAvatar = document.createElement('img');
    userAvatar.src = item.avatar_url;
    userAvatar.height = 20;
  
    listItem.appendChild(userAvatar);

    const username = document.createElement('span');
    username.innerText = item.login;
  
    listItem.appendChild(username);

    listItem.addEventListener('click', () => render(item.login));

    followingList.appendChild(listItem);
  });
}