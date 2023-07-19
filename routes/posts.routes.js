const routes = require('express').Router();

const postsController = require('../controllers/posts.controller');

routes.get('/getAllPosts', postsController.getAllPosts);
routes.post('/postPosts', postsController.postPosts);
routes.put('/updatePosts', postsController.updatePosts);
routes.delete('/deletePosts', postsController.deletePosts);

routes.get('/getPostsByUserId/:userId', postsController.getPostByUserId);

module.exports = routes;
