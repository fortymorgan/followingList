!function(e){var n={};function r(t){if(n[t])return n[t].exports;var o=n[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=n,r.d=function(e,n,t){r.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,n){if(1&n&&(e=r(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(r.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)r.d(t,o,function(n){return e[n]}.bind(null,o));return t},r.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(n,"a",n),n},r.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},r.p="",r(r.s=6)}([function(module,exports,__webpack_require__){eval("const router = __webpack_require__(5);\nconst routes = __webpack_require__(4);\n// const renderSearchResult = require('./searchResult');\n// const resetList = require('./resetList');\n\nmodule.exports = () => {\n  // resetList();\n  // if (!location.hash) {\n  //   return;\n  // }\n  // renderSearchResult();\n  router(routes);\n};\n\n\n//# sourceURL=webpack:///./js/render.js?")},function(module,exports){eval("module.exports = user => {\n  const state = { user };\n  const title = `${user} followings`;\n  const hash = !location.hash ? '#search' : '';\n  history.pushState(state, title, location.href + hash);\n};\n\n\n//# sourceURL=webpack:///./js/pushHistory.js?")},function(module,exports){eval("const currentUser = document.querySelector('.current-user');\nconst followingList = document.querySelector('.following');\nconst input = document.querySelector('.search');\n\nmodule.exports = () => {\n  currentUser.innerHTML = '';\n  followingList.innerHTML = '';\n  input.value = '';\n};\n\n\n//# sourceURL=webpack:///./js/resetList.js?")},function(module,exports,__webpack_require__){eval("// console.log('search');\n// console.log(render);\nconst createAvatarImg = (src, height = '') => `<img src=\"${src}\" height=\"${height}\">`;\nconst createUsernameSpan = (username) => `<span class=\"username\">${username}</span>`;\n\nconst getUserData = async () => {\n  // const username = location.hash.slice(1);\n  const username = history.state.user;\n  const userLink = `https://api.github.com/users/${username}`;\n  const userData = await fetch(userLink)\n  .then(blob => blob.json());\n  \n  return userData;\n};\n\nconst createFollowingListHtml = userFollowingList => {\n  const followingList = document.querySelector('.following');\n  const pushHistoryState = __webpack_require__(1);\n  const render = __webpack_require__(0);\n\n  userFollowingList.forEach(({ avatar_url, login }) => {\n    const listItem = document.createElement('li');\n    \n    const userAvatar = createAvatarImg(avatar_url, 20);\n    const username = createUsernameSpan(login);\n    \n    listItem.innerHTML = userAvatar + username;\n    // listItem.innerHTML = `<a href=\"#${login}\">${userAvatar + username}</a>`;\n    \n    listItem.addEventListener('click', () => {\n      pushHistoryState(login);\n      render();\n    });\n    \n    followingList.append(listItem);\n  });\n};\n\nmodule.exports = async () => {\n  const currentUser = document.querySelector('.current-user');\n  const { avatar_url, following_url, login } = await getUserData();\n  \n  const currentUserAvatar = createAvatarImg(avatar_url, 40);\n  const currentUserHeader = `<span>${createUsernameSpan(login)} following:</span>`;\n  \n  currentUser.innerHTML = currentUserAvatar + currentUserHeader;\n\n  const [followingUrl] = following_url.split('{');\n\n  const currentUserFollowingList = await fetch(followingUrl)\n    .then(blob => blob.json());\n\n  createFollowingListHtml(currentUserFollowingList);\n};\n\n\n//# sourceURL=webpack:///./js/searchResult.js?")},function(module,exports,__webpack_require__){eval("const renderSearchResult = __webpack_require__(3);\nconst resetList = __webpack_require__(2)\n\nmodule.exports = [\n  {\n    path: '',\n    component: () => {\n      resetList();\n    },\n  },\n  {\n    path: 'search',\n    component: () => {\n      resetList();\n      renderSearchResult();\n    },\n  }\n];\n\n\n//# sourceURL=webpack:///./js/routes.js?")},function(module,exports){eval("module.exports = (routes) => {\n  const hashValue = location.hash.slice(1);\n\n  const currentRoute = routes.find(route => route.path === hashValue);\n\n  currentRoute.component();\n};\n\n\n//# sourceURL=webpack:///./js/router.js?")},function(module,exports,__webpack_require__){eval("const pushHistoryState = __webpack_require__(1);\r\nconst render = __webpack_require__(0);\r\n// console.log('folowing');\r\n// console.log(render);\r\nconst input = document.querySelector('.search');\r\nconst button = document.querySelector('.search-button');\r\n\r\nbutton.addEventListener('click', () => {\r\n  pushHistoryState(input.value);\r\n  render();\r\n  // location.hash = input.value;\r\n});\r\n\r\ninput.addEventListener('keydown', (event) => {\r\n  if (event.keyCode === 13) {\r\n    pushHistoryState(input.value);\r\n    render();\r\n    // location.hash = input.value;\r\n  }\r\n});\r\n\r\nwindow.onpopstate = () => render();\r\n// window.addEventListener('hashchange', () => render());\r\n\r\nrender();\r\n\n\n//# sourceURL=webpack:///./js/following.js?")}]);