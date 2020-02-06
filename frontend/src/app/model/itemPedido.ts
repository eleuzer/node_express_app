import { Produto } from "./produto";
import { Pedido } from "./pedido";

export class ItemPedido {
    _id: number;
    precoUnitario: number;
    quantidade: number;
    precoTotal: number;
    produto: Produto;
    pedido: Pedido;
}