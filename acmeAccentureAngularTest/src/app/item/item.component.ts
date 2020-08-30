import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, Router, ActivatedRoute } from '@angular/router';
import { TarefaServiceService } from '../service/tarefa-service.service';
import { Item } from 'src/app/model/Item';
import { Tarefa } from '../model/Tarefa';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit, OnDestroy {

  itens: Item[] = [];
  idItensConcluidos: number[] = [];
  isChecked = false;
  tarefa: Tarefa;
  subscription: Subscription;

  constructor(private tarefaService: TarefaServiceService,
    private route: ActivatedRoute,
    private router: Router) { }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.listarItens();
    this.idItensConcluidos = [];

  }

  listarItens() {

   this.subscription = this.route.queryParams.subscribe(params => {
      const idTarefa = params['id'];

      this.tarefaService.consultar(idTarefa).subscribe((tarefa: Tarefa) => {
        this.tarefa = tarefa
        this.itens = tarefa.itens;
      })

    })
  }

  checkItemConcluido(item: Item) {
    this.isChecked = item.itemConcluido
    this.isChecked = !this.isChecked;
    debugger
    if (this.isChecked) {
      this.idItensConcluidos.push(item.id);
    } else {
      if (this.idItensConcluidos.includes(item.id)) {
        const indice = this.idItensConcluidos.indexOf(item.id);
        this.idItensConcluidos.splice(indice, 1)
      }
    }

  }

  marcarItensConcluidos() {
    debugger;
    const itensConcluidos = this.tarefa.itens.filter(item => item.itemConcluido);

    if (itensConcluidos.length ===  this.tarefa.itens.length) {
      this.showMessageItemConcluido();
      return;
    }

    this.tarefaService.marcarItensComoConluido(this.idItensConcluidos).subscribe(() => {
      this.showMessageSuccess();
    });

  }

  removerItemDaTarefa(idItem : number){
    this.confirmDelete(idItem);
    // this.tarefaService.removerItemDaTarefa(idItem, this.tarefa.id).subscribe(()=>{
    //    this.showMessageItemRemovido();
    // })
  }
  
  showMessageItemRemovido() {
    const operacao = 'Remover item'
    Swal.fire({
      title: `${operacao}`,
      text: `Item removido com sucesso!`,
      icon: 'success',
      showCancelButton: false,
      confirmButtonText: 'ok',
    }).then((result) => {
      this.ngOnInit();

    })
  }

  showMessageSuccess() {
    const operacao = 'Concluir itens'
    Swal.fire({
      title: `${operacao}`,
      text: `Item concluído com sucesso!`,
      icon: 'success',
      showCancelButton: false,
      confirmButtonText: 'ok',
    }).then((result) => {
      this.ngOnInit();

    })
  }

  showMessageItemConcluido() {
    Swal.fire({
      text: `Todos os Itens ja foram concluídos! Caso algum item não tenha sido concluído corretamente,
      por favor crie uma nova 
      tarefa e adicione novos itens`,
      icon: 'warning',
      showCancelButton: false,
      confirmButtonText: 'ok',
    }).then((result) => {
      this.ngOnInit();

    })
  }
  confirmDelete(idItem){
    Swal.fire({
      title: 'Remover item',
      text: 'Vocẽ tem certeza que quer remover este item ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, tenho',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
       this.tarefaService.removerItemDaTarefa(idItem, this.tarefa.id).subscribe(()=>{
        this.showMessageItemRemovido();
       })
   
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Ação cancelada',
          'error'
        )
      }
    })
  }
 

}
