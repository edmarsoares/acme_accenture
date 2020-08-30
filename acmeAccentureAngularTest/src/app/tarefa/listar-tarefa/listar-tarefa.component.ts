import { Component, OnInit } from '@angular/core';
import { TarefaServiceService } from '../../service/tarefa-service.service';
import { Tarefa } from '../../model/Tarefa';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-tarefa',
  templateUrl: './listar-tarefa.component.html',
  styleUrls: ['./listar-tarefa.component.css']
})
export class ListarTarefaComponent implements OnInit {

  tarefas: Tarefa[] = []

  constructor(private tarefaService: TarefaServiceService,
              private router: Router,
  ) { }

  ngOnInit(): void {
    this.listarTarefas()

  }

  listarTarefas() {
    this.tarefaService.listar().subscribe(tarefaResponse => {
      this.tarefas = tarefaResponse;
    })
  }

  abrirComponenteItem(idTarefa) {
    this.router.navigate(['/item'], {
      queryParams: { id: idTarefa },

    })
  }

  abrirComponentCadastroItem(idTarefa) {
    this.router.navigate(['/item/cadastro'], {
      queryParams: { id: idTarefa },

    })
  }

}
