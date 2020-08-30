import { Item } from './Item';
import { FormGroup, Validators, FormControl } from '@angular/forms';

export class Tarefa {
   id: number;
   descricao: string;
   dataExecucao: Date;
   itens: Item [] = [];

   constructor(){
   }


   static getControl(): FormGroup {
      return new FormGroup({
        id: new FormControl(),
        descricao: new FormControl('', [Validators.required]),
        dataExecucao: new FormControl(''),
        item: Item.getControl()
      });
    }

}