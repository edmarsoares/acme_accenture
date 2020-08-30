import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroComponent } from './tarefa/cadastro/cadastro.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './menu/menu.component';
import { ItemComponent } from './item/item.component';
import { TarefaServiceService } from './service/tarefa-service.service';
import { ListarTarefaComponent } from './tarefa/listar-tarefa/listar-tarefa.component';
import { CadastroItemComponent } from './item/cadastro-item/cadastro-item.component';


@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent,
    ItemComponent,
    MenuComponent,
    ListarTarefaComponent,
    CadastroItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [TarefaServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
