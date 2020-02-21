module.exports = (app) => {

    const express = require('express');
    const router = express.Router();
    const userController = require('../controllers/user.controller.js');
    const authController = require('../controllers/auth.controller.js');

    // Create endpoint handlers for /users
    router.route('/users')
        .post(userController.postUsers)
        .get(authController.isAuthenticated, userController.getUsers);

    // Register all our routes with /api
    app.use('/api/security', router);
}