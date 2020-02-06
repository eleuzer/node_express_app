const mongoose = require('mongoose');

const ProdutoSchema = mongoose.Schema({
    id: Number,
    descricao: String,
    preco: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('produto', ProdutoSchema);