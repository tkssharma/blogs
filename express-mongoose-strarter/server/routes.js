const express = require('express'),
  path = require('path'),
  rootPath = path.normalize(__dirname + '/../'),
  router = express.Router(),
  passport = require('passport'),
  {
    AuthorsController,
    HomeController,
    TagCtrl,
    UserCtrl,
    BooksController
  } = require('./controllers');

module.exports = function (app) {
  router.get('/', HomeController.index);
  router.route('/login').post((...params) => AuthCtrl.login(...params));
  router.route('/register').post((...params) => AuthCtrl.register(...params));
  router.route('/me').get((...params) => AuthCtrl.checkAuth(...params));
  router
    .route('/users')
    .get((...params) => UserCtrl.list(...params));
  router
    .route('/users/:id')
    .get((...params) => UserCtrl.getUser(...params))
    .patch((...params) => UserCtrl.update(...params));

  router
    .route('/authors')
    .get((...params) => AuthorsController.getAllAuthors(...params))
    .post((...params) => AuthorsController.createAuthor(...params));

  router
    .route('/authors')
    .get((...params) => AuthorsController.show(...params))
    .put((...params) => AuthorsController.update(...params))
    .delete((...params) => AuthorsController.remove(...params));

  router
    .route('/tag')
    .get((...params) => TagCtrl.getAllTags(...params))
    .post((...params) => TagCtrl.createTag(...params));

  router
    .route('/book')
    .get((...params) => BooksController.getAllBooks(...params))
    .post((...params) => BooksController.createBook(...params));

  router
    .route('/book/tag/:tagId')
    .post((...params) =>BooksController.CreateBookAndAddToTag(...params));

  router
    .route('/tag/book/:bookId')
    .post((...params) =>TagCtrl.CreateTagAndAddToBook(...params));

  app.use('/api', router);
};
