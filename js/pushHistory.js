module.exports = (resource, user) => {
  history.pushState(null, null, location.origin + `/${resource}/${user}`);
};
