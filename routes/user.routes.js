const routes = require('express').Router();
const userController = require('../controllers/users.controller');

routes.get('/getAllUsers', userController.getAllUsers);
routes.post('/postUsers', userController.postUsers);
routes.put('/updateUsers', userController.updateUsers);
routes.delete('/deleteUsers', userController.deleteUsers);
routes.post('/login', userController.login);
routes.get('/getUserById', userController.getUserById);

module.exports = routes;
