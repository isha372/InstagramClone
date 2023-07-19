const routes = require('express').Router();
const likesController = require('../controllers/likes.controller');

routes.get('/getAllLikes', likesController.getAllLikes);
routes.post('/postLikes', likesController.postLikes);
routes.put('/updateLikes', likesController.updateLikes);
routes.delete('/deleteLikes', likesController.deleteLikes);

module.exports = routes;
