const mongoose = require('mongoose');

const PedidoSchema = mongoose.Schema({
    id: Number,
    data: Date,
    valorTotal: Number,
    pessoa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pessoa'
    },
    itemPedidos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'itempedido'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('pedido', PedidoSchema);