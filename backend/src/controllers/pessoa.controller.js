const Pessoa = require('../models/pessoa.model.js');

exports.create = (req, res) => {
    if(!req.body.nome) {
        return res.status(400).send({
            message: "O nome é obrigatorio"
        });
    }

    if(!req.body.email) {
        return res.status(400).send({
            message: "O email é obrigatorio"
        });
    }

    const pessoa = new Pessoa({
        nome: req.body.nome, 
        email: req.body.email
    });

    pessoa.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

exports.update = (req, res) => {
    if(!req.body.nome) {
        return res.status(400).send({
            message: "O nome é obrigatorio"
        });
    }

    if(!req.body.email) {
        return res.status(400).send({
            message: "O email é obrigatorio"
        });
    }

    Pessoa.findByIdAndUpdate(req.params.id, {
        nome: req.body.nome, 
        email: req.body.email
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
    Pessoa.findByIdAndRemove(req.params.id)
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
    Pessoa.findById(req.params.id)
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
    Pessoa.find()
    .then(value => {
        res.send(value);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error ao listar pessoas."
        });
    });
};
