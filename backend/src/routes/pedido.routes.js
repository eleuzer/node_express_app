module.exports = (app) => {
    const express = require('express');
    const router = express.Router();
    const authController = require('../security/controllers/auth.controller.js');
    const pedidoController = require('../controllers/pedido.controller.js');

    router.route('/pedido')
        .post(authController.isAuthenticated, pedidoController.create);

    router.route('/pedido/:id')
        .put(authController.isAuthenticated, pedidoController.update);

    router.route('/pedido/:id')
        .delete(authController.isAuthenticated, pedidoController.delete);

    router.route('/pedido/:id')
        .get(authController.isAuthenticated, pedidoController.findOne);

    router.route('/pedidos')
        .get(authController.isAuthenticated, pedidoController.findAll);

    app.use('/api', router);

}