module.exports = (app) => {
    const express = require('express');
    const router = express.Router();
    const authController = require('../security/controllers/auth.controller.js');
    const pessoaController = require('../controllers/pessoa.controller.js');

    router.route('/pessoa')
        .post(authController.isAuthenticated, pessoaController.create);

    router.route('/pessoa/:id')
        .put(authController.isAuthenticated, pessoaController.update);

    router.route('/pessoa/:id')
        .delete(authController.isAuthenticated, pessoaController.delete);

    router.route('/pessoa/:id')
        .get(authController.isAuthenticated, pessoaController.findOne);

    router.route('/pessoas')
        .get(authController.isAuthenticated, pessoaController.findAll);

    app.use('/api', router);

}