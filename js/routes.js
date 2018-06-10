const renderSearchResult = require('./searchResult');
const resetList = require('./resetList')

module.exports = [
  {
    path: '',
    component: () => {
      resetList();
    },
  },
  {
    path: 'following',
    component: () => {
      resetList();
      renderSearchResult();
    },
  }
];
