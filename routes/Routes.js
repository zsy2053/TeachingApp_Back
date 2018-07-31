module.exports = (app) => {
  var userList = require('../controllers/UserController');

  app.route('/users')
    .get(userList.list_all_users)
    .post(userList.create_a_user);

  app.route('/sign_in_a_user')
    .post(userList.sign_in_a_user)

  app.route('/users/:id')
    .get(userList.read_a_user)
    .put(userList.update_a_user)
    .delete(userList.delete_a_user);
};
