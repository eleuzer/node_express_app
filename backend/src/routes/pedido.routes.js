module.exports = (app) => {
    const pedidoController = require('../controllers/pedido.controller.js');

    app.post('/pedido', pedidoController.create);

    app.put('/pedido/:id', pedidoController.update);

    app.delete('/pedido/:id', pedidoController.delete);

    app.get('/pedido/:id', pedidoController.findOne);

    app.get('/pedidos', pedidoController.findAll);

}