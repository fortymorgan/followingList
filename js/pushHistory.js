module.exports = user => {
  const state = { user };
  const title = `${user} followings`;
  const hash = !location.hash ? '#search' : '';
  history.pushState(state, title, location.href + hash);
};
