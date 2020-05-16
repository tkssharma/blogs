const express = require('express'),
  path = require('path'),
  rootPath = path.normalize(__dirname + '/../'),
  router = express.Router(),
  passport = require('passport'),
  {
    AuthorsController,
    HomeController,
    AuthCtrl,
    UserCtrl
  } = require('./controllers');

module.exports = function (app) {
  router.get('/', HomeController.index);
  router.route('/login').post((...params) => AuthCtrl.login(...params));
  router.route('/register').post((...params) => AuthCtrl.register(...params));
  router.route('/me').get((...params) => AuthCtrl.checkAuth(...params));
  router
    .route('/users')
    .get(passport.authenticate(), (...params) => UserCtrl.list(...params));
  router
    .route('/users/:id')
    .get(passport.authenticate(), (...params) => UserCtrl.getUser(...params))
    .patch(passport.authenticate(), (...params) => UserCtrl.update(...params));

  router
    .route('/authors')
    .get(passport.authenticate(), (...params) => AuthorsController.index(...params))
    .post(passport.authenticate(), (...params) => AuthorsController.store(...params));

  router
    .route('/authors')
    .get(passport.authenticate(), (...params) => AuthorsController.show(...params))
    .put(passport.authenticate(), (...params) => AuthorsController.update(...params))
    .delete(passport.authenticate(), (...params) => AuthorsController.remove(...params));

  app.use('/api', router);
};
