module.exports = (app) => {
    const produtoController = require('../controllers/produto.controller.js');

    app.post('/produto', produtoController.create);

    app.put('/produto/:id', produtoController.update);

    app.delete('/produto/:id', produtoController.delete);

    app.get('/produto/:id', produtoController.findOne);

    app.get('/produtos', produtoController.findAll);

}