const router = require('./router');
const routes = require('./routes');
// const renderSearchResult = require('./searchResult');
// const resetList = require('./resetList');

module.exports.render = () => {
  // resetList();
  // if (!location.hash) {
  //   return;
  // }
  // renderSearchResult();
  router(routes);
};