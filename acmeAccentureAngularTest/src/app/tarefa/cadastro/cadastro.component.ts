import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/model/Item';
import { FormGroup } from '@angular/forms';
import { Tarefa } from '../../model/Tarefa';
import { TarefaServiceService } from '../../service/tarefa-service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  formGroup : FormGroup

  itens: Item [] = [] ;

  constructor(private tarefaService: TarefaServiceService) { }

  ngOnInit(): void {
    this.formGroup = Tarefa.getControl();
    this.itens = [];

  }

  adicionarItem(event: Event){
    event.preventDefault();
    const item: Item = this.formGroup.get("item").value;
    
    if (item) {
        this.itens.push(item);  
    }
    this.formGroup.get("item").get("descricao").setValue("")
  }

  public hasError = (controlName: string, errorName: string, formGroupName?: string[]) => {

    if (formGroupName && formGroupName.includes('item') ) {
      return this.formGroup.get('item').get(controlName).hasError(errorName);
    }
    return this.formGroup.controls[controlName].hasError(errorName);
  }
  
  salvar(form){
    console.log(form);
    
    let tarefa: Tarefa = new Tarefa();
    tarefa = this.formGroup.value;

    if (this.itens.length > 0) {
      tarefa.itens = this.itens
    }

    this.tarefaService.salvar(tarefa).subscribe(() => {
      this.showMessageSuccess(form);
    })
  }

  showMessageSuccess(form) {
    const operacao = 'Criar tarefa'
    Swal.fire({
      title: `${operacao}`,
      text: `Tarefa criada com sucesso!`,
      icon: 'success',
      showCancelButton: false,
      confirmButtonText: 'ok',
    }).then((result) => {
      this.ngOnInit()

    })
  }
}
