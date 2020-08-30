import { FormGroup, FormControl, Validators } from '@angular/forms';

export class Item {
    id: number;
    descricao: string;
    itemConcluido: boolean;

    static getControl(): FormGroup {
        return new FormGroup({
          id: new FormControl(),
          descricao: new FormControl(''),

        });
      }
}