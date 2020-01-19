import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DadosDialogMensagem {
  texto: string;
  titulo: string;
}

@Component({
  selector: 'app-dialog-mensagem',
  templateUrl: 'dialog-mensagem.component.html',
})
export class DialogMensagemComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogMensagemComponent>,
    @Inject(MAT_DIALOG_DATA) public dados: DadosDialogMensagem
  ) {
  }
}
