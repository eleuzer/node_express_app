module.exports = (app) => {

    const express = require('express');
    const router = express.Router();
    const authController = require('../controllers/auth.controller.js');
    const clientController = require('../controllers/client.controller.js');

    // Create endpoint handlers for /clients
    router.route('/clients')
        .post(authController.isAuthenticated, clientController.postClients);

    router.route('/clients/authorize')
        .post(authController.isAuthenticated, clientController.getClients);    

    // Register all our routes with /api
    app.use('/api', router);

}