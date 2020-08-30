import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroComponent } from './tarefa/cadastro/cadastro.component';
import { ItemComponent } from './item/item.component';
import { ListarTarefaComponent } from './tarefa/listar-tarefa/listar-tarefa.component';
import { CadastroItemComponent } from './item/cadastro-item/cadastro-item.component';


const routes: Routes = [
  { path: "",  component: CadastroComponent, pathMatch: 'full' },
  { path: "tarefas",  component: ListarTarefaComponent },
  { path: "item",  component: ItemComponent },
  { path: "item/cadastro",  component: CadastroItemComponent }


  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
