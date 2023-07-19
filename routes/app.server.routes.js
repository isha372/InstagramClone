const Router = require('express');

const users = require('./user.routes');
const posts = require('./posts.routes');
const likes = require('./likes.routes');
const comments = require('./comments.routes');

const routes = Router();

routes.use('/users', users);
routes.use('/posts', posts);
routes.use('/comments', comments);
routes.use('/likes', likes);

module.exports = routes;
