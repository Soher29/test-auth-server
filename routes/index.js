const user = require('./users')
module.exports = function(app) {
  user(app)
  return app;
};
