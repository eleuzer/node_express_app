const Produto = require('../models/produto.model.js');

exports.create = (req, res) => {
    if(!req.body.descricao) {
        return res.status(400).send({
            message: "A descrição é obrigatoria"
        });
    }

    if(!req.body.preco) {
        return res.status(400).send({
            message: "O preco é obrigatorio"
        });
    }

    const produto = new Produto({
        descricao: req.body.descricao, 
        preco: req.body.preco
    });

    produto.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

exports.update = (req, res) => {
    if(!req.body.descricao) {
        return res.status(400).send({
            message: "A descrição é obrigatoria"
        });
    }

    if(!req.body.preco) {
        return res.status(400).send({
            message: "O preco é obrigatorio"
        });
    }

    Produto.findByIdAndUpdate(req.params.id, {
        descricao: req.body.descricao, 
        preco: req.body.preco
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
    Produto.findByIdAndRemove(req.params.id)
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
    Produto.findById(req.params.id)
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
            message: "Error retrieving with id " + req.params.id
        });
    });
};

exports.findAll = (req, res) => {
    Produto.find()
    .then(value => {
        res.send(value);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error ao listar pessoas."
        });
    });
};
