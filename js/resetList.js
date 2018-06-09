const currentUser = document.querySelector('.current-user');
const followingList = document.querySelector('.following');
const input = document.querySelector('.search');

module.exports = () => {
  currentUser.innerHTML = '';
  followingList.innerHTML = '';
  input.value = '';
};
