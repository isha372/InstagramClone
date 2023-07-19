const routes = require('express').Router();
const commentsController = require('../controllers/comments.controller');

routes.get('/getAllComments', commentsController.getAllComments);
routes.post('/postComments', commentsController.postComments);
routes.put('/updateComments', commentsController.updateComments);
routes.delete('/deleteComments', commentsController.deleteComments);

module.exports = routes;
