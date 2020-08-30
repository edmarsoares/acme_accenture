import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Item } from 'src/app/model/Item';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TarefaServiceService } from 'src/app/service/tarefa-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro-item',
  templateUrl: './cadastro-item.component.html',
  styleUrls: ['./cadastro-item.component.css']
})
export class CadastroItemComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;

  subscription: Subscription;

  idTarefa: number;

  constructor(private tarefaService: TarefaServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.formGroup = Item.getControl();
    this.recuperarIDTarefa();
  }

  recuperarIDTarefa() {

    this.subscription = this.activatedRoute.queryParams.subscribe(params => {
      this.idTarefa = params['id'];
    })
  }

  adicionarItem(){
    const item: Item = this.formGroup.value;

    this.tarefaService.adicionarItem(this.idTarefa, item).subscribe(()=> {
      this.showMessageSuccess();
    })
  }

  showMessageSuccess() {
    const operacao = 'Adicionar itens'
    Swal.fire({
      title: `${operacao}`,
      text: `Item adicionado com sucesso!`,
      icon: 'success',
      showCancelButton: false,
      confirmButtonText: 'ok',
    }).then((result) => {
      this.router.navigate(['/tarefas'])

    })
  }


}
