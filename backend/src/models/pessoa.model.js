const mongoose = require('mongoose');

const PessoaSchema = mongoose.Schema({
    id: Number,
    nome: String,
    email: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('pessoa', PessoaSchema);