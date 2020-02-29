const controller = require('../server/controllers/users')

module.exports = function(app) {

  app.route('/sign_up')
    .post(controller.add);
  app.route('/sign_in')
    .get(controller.login);
  app.route('/user')
    .get(controller.get);
  app.route('/users')
    .get(controller.all);

};
