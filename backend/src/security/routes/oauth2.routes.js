module.exports = (app) => {

    const express = require('express');
    const router = express.Router();
    const authController = require('../controllers/auth.controller.js');
    const oauth2Controller = require('../controllers/oauth2.controller.js');

    // Create endpoint handlers for oauth2 authorize
    router.route('/oauth2/authorize')
        .get(authController.isAuthenticated, oauth2Controller.authorization)
        .post(authController.isAuthenticated, oauth2Controller.decision);

    router.route('/oauth2/code')
        .post(authController.isAuthenticated, oauth2Controller.getCodeClient);

    // Create endpoint handlers for oauth2 token
    router.route('/oauth2/token')
        .post(authController.isClientAuthenticated, oauth2Controller.token);
    router.route('/oauth2/access_token')
        .post(authController.isAuthenticated, oauth2Controller.getTokenClient);



    // Register all our routes with /api
    app.use('/api', router);

}