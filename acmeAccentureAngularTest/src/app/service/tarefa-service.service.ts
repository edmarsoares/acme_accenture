import { Injectable } from '@angular/core';
import { ServicoBasico } from './servico-basico.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Tarefa } from '../model/Tarefa';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Item } from 'src/app/model/Item';

@Injectable({
  providedIn: 'root'
})
export class TarefaServiceService extends ServicoBasico<Tarefa> {

  constructor(private httpClient : HttpClient) {
    super(httpClient, "tarefa");
  }

  marcarItensComoConluido(idItens: number []): Observable<Tarefa> {
    debugger;
    return this.httpClient.get(`${this.baseUrl}/tarefa/itensConcluidos/${idItens}`)
                    .pipe(map(value => value as Tarefa));
  }

  removerItemDaTarefa(idItem: number, idTarefa): Observable<any>{
    return this.http.delete(`${this.baseUrl}/tarefa/item/${idItem}/tarefa/${idTarefa}`);
  }

  adicionarItem(idTarefa: number, item: Item){
    return this.http.put(`${this.baseUrl}/tarefa/item/${idTarefa}`, item);
  }

}
