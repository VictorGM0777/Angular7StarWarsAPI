import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PaginaInicialService } from './components/pagina-inicial/pagina-inicial.service';
import { PlatformLocation } from '@angular/common';
import { Router } from '@angular/router';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatDialog } from '@angular/material';
import { BaseComponent } from './components/base/base.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends BaseComponent {
  title = 'app';

  constructor(
    public servicoTraducao: TranslateService,
    public paginaInicialService: PaginaInicialService,
    location: PlatformLocation,
    public dialog: MatDialog,
    private router: Router
  ) {
    super(servicoTraducao);

    servicoTraducao.setDefaultLang(this.servicoTraducao.getBrowserCultureLang());
    // servicoTraducao.setDefaultLang('pt-BR');

    location.onPopState(() => {
      history.forward();
      const estahLogado = this.paginaInicialService.getLogin();

      if (estahLogado) {
        this.abrirDialogDeslogar();
      }
    });
  }

  trocarIdioma(idioma: string) {
    this.servicoTraducao.use(idioma);
  }

  getLogin() {
    return this.paginaInicialService.getLogin();
  }

  getCadastrar() {
    return this.paginaInicialService.getCadastrar();
  }

  abrirDialogDeslogar() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: {
        titulo: this.internacionalizacao('Warning'),
        texto: this.internacionalizacao('WannaLeave')
      }
    });

    dialogRef.afterClosed().subscribe(retorno => {
      if (retorno) {
        this.deslogar();
      }
    });
  }

  deslogar() {
    this.paginaInicialService.setEmpresaLogin(null);
    this.paginaInicialService.setLogin(false);
    this.paginaInicialService.setCadastrar(false);
    this.router.navigate(['/login']);
  }
}
