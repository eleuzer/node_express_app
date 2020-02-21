import { Routes } from '@angular/router';

import { PessoaListComponent } from 'app/pessoa-list/pessoa-list.component';
import { PessoaEditComponent } from 'app/pessoa-edit/pessoa-edit.component';
import { ProdutoListComponent } from 'app/produto-list/produto-list.component';
import { ProdutoEditComponent } from 'app/produto-edit/produto-edit.component';
import { PedidoListComponent } from 'app/pedido-list/pedido-list.component';
import { PedidoEditComponent } from 'app/pedido-edit/pedido-edit.component';
import { AuthGuard } from 'app/services/auth-guard';

export const AdminLayoutRoutes: Routes = [
   
    { path: 'pessoa-list',   component: PessoaListComponent, canActivate: [AuthGuard] },
    { path: 'pessoa-edit/:id',   component: PessoaEditComponent, canActivate: [AuthGuard] },
    { path: 'produto-list',   component: ProdutoListComponent, canActivate: [AuthGuard] },
    { path: 'produto-edit/:id',   component: ProdutoEditComponent, canActivate: [AuthGuard] },
    { path: 'pedido-list',   component: PedidoListComponent, canActivate: [AuthGuard] },
    { path: 'pedido-edit/:id',   component: PedidoEditComponent, canActivate: [AuthGuard] },
];
