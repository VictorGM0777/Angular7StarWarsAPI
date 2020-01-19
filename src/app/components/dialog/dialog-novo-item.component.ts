import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DadosDialog {
  titulo: string;
  placeholder: string;
}

@Component({
  selector: 'app-dialog-novo-item',
  templateUrl: 'dialog-novo-item.component.html',
})
export class DialogNovoItemComponent {
  resultado: string;

  constructor(
    public dialogRef: MatDialogRef<DialogNovoItemComponent>,
    @Inject(MAT_DIALOG_DATA) public dados: DadosDialog
  ) {
  }
}
