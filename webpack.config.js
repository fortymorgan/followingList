const path = require('path');
 
module.exports = {
  entry: './js/following.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'static/dist')
  },
  devtool: 'eval',
};
