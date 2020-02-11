module.exports = (app) => {
    const express = require('express');
    const router = express.Router();
    const authController = require('../security/controllers/auth.controller.js');
    const produtoController = require('../controllers/produto.controller.js');

    router.route('/produto')
        .post(authController.isAuthenticated, produtoController.create);

    router.route('/produto/:id')
        .put(authController.isAuthenticated, produtoController.update);

    router.route('/produto/:id')
        .delete(authController.isAuthenticated, produtoController.delete);

    router.route('/produto/:id')
        .get(authController.isAuthenticated, produtoController.findOne);

    router.route('/produtos')
        .get(authController.isAuthenticated, produtoController.findAll);

    app.use('/api', router);
}