module.exports = (app) => {

    const express = require('express');
    const router = express.Router();
    const authController = require('../controllers/auth.controller.js');
    const oauth2Controller = require('../controllers/oauth2.controller.js');

    // Create endpoint handlers for oauth2 authorize
    router.route('/oauth2/authorize')
        .get(authController.isAuthenticated, oauth2Controller.authorization)
        .post(authController.isAuthenticated, oauth2Controller.decision);

    // Create endpoint handlers for oauth2 token
    router.route('/oauth2/token')
        .post(authController.isClientAuthenticated, oauth2Controller.token);

    // Register all our routes with /api
    app.use('/api', router);

}