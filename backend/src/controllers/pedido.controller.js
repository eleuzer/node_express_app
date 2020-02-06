const Pedido = require('../models/pedido.model.js');
const ItemPedido = require('../models/itemPedido.model.js');

exports.create = (req, res) => {
    const pedido = new Pedido({
        data: new Date(), 
        valorTotal: req.body.itemPedidos.map(item => item.precoTotal).reduce((prev, next) => prev + next),
        pessoa: req.body.pessoa._id
    });
    pedido.itemPedidos = [];
    
    pedido.save()
    .then(data => {  
        req.body.itemPedidos.forEach(element => {
            const itemPedido = new ItemPedido({
                precoUnitario: element.precoUnitario,
                quantidade: element.quantidade,
                precoTotal: element.precoTotal,
                produto: element.produto._id,
                pedido: pedido._id
            });
            
            itemPedido.save();  
            pedido.itemPedidos.push(itemPedido);
        });

        pedido.save();
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
    
};

exports.update = (req, res) => {
    Pedido.findByIdAndUpdate(req.params.id, {
       // descricao: req.body.descricao, 
       // preco: req.body.preco
    }, {new: true})
    .then(value => {
        if(!value) {
            return res.status(404).send({
                message: "Not found with id " + req.params.id
            });
        }
        res.send(value);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating with id " + req.params.id
        });
    });
};

exports.delete = (req, res) => {
    Pedido.findByIdAndRemove(req.params.id)
    .then(value => {
        if(!value) {
            return res.status(404).send({
                message: "Not found with id " + req.params.id
            });
        }
        res.send({message: "Deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete with id " + req.params.id
        });
    });
};










exports.findOne = (req, res) => {
    Pedido.findById(req.params.id)
        .populate('pessoa')
        .populate({
                    path: 'itemPedidos',
                    model: 'itempedido',
                    populate: {
                        path: 'produto',
                        model: 'produto'
                    }
                })
        .then(value => {
            if(!value) {
                return res.status(404).send({
                    message: "Not found with id " + req.params.id
                });            
            }

            res.send(value);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving with id " + req.params.id
            });
        });
};

exports.findAll = (req, res) => {
    Pedido.find()
    .then(value => {
        res.send(value);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error ao listar pedidos."
        });
    });
};
