import { HttpErrorResponse } from '@angular/common/http';
import { DialogMensagemComponent } from '../components/dialog/dialog-mensagem.component';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Validator } from './validator';

export class Util {

  public static abrirDialogErro(dialog: MatDialog, erro: HttpErrorResponse, titulo: string) {
    if (erro.error instanceof ErrorEvent || erro.error instanceof ProgressEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      dialog.open(DialogMensagemComponent, {
        width: '250px',
        data: {
          titulo: titulo,
          texto: erro.message
        }
      });
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      dialog.open(DialogMensagemComponent, {
        width: '250px',
        data: {
          titulo: titulo,
          texto: erro.status + ': ' + erro.error + ': ' + erro.message
        }
      });
    }
  }

  /**
   *
   * @param dialog - MatDialog declarado no construtor do component.
   * @param mensagem
   * @param titulo
   * @param router - Soh eh necessario passar este parametro caso no clique do botao OK voltar para a pagina inicial.
   * Router declarado no construtor do component.
   * @param login - Soh eh necessario e 'true' quando o router for redirecionar para '/login' e nao '/' ou '/home'
   */
  public static abrirDialogMensagem(dialog: MatDialog, mensagem: string, titulo: string, router?: Router, login?: boolean) {
    const dialogRef = dialog.open(DialogMensagemComponent, {
      width: '250px',
      data: {
        titulo: titulo,
        texto: mensagem
      }
    });

    dialogRef.afterClosed().subscribe(retorno => {
      if (!Validator.isNullUndefined(router)) {
        if (login) {
          router.navigate(['/login']);
        } else {
          router.navigate(['/']);
        }
      }
    });
  }

  public static coverterByteParaGigabyte(valor: number) {
    if (!Validator.isNullUndefinedEmpty(valor)) {
      valor = (valor / 1073741824);
    }
    return valor.toFixed(1);
  }

}
