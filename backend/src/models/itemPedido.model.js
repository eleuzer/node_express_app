const mongoose = require('mongoose');

const ItemPedidoSchema = mongoose.Schema({
    id: Number,
    precoUnitario: Number,
    quantidade: Number,
    precoTotal: Number,
    produto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'produto'
    },
    pedido: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pedido'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('itempedido', ItemPedidoSchema);