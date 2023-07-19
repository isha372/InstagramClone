const Router = require('express');

const appRoutes = require('./app.server.routes');

const routes = Router();

routes.use('/', appRoutes);

module.exports = routes;
