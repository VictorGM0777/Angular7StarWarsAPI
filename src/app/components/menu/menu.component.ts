import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { PaginaInicialService } from '../pagina-inicial/pagina-inicial.service';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material';
import { BaseComponent } from '../base/base.component';
import { DatetimeAdapter } from '@mat-datetimepicker/core';

const componentSelector = 'menu';

@Component({
  selector: componentSelector,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent extends BaseComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private adapter: DateAdapter<any>,
    private timeAdapter: DatetimeAdapter<any>,
    public servicoTraducao: TranslateService,
    public dialog: MatDialog,
    private paginaInicialService: PaginaInicialService
  ) {
    super(servicoTraducao);
    servicoTraducao.setDefaultLang(this.servicoTraducao.getBrowserCultureLang());
    // servicoTraducao.setDefaultLang('pt-BR');
  }

  trocarIdioma(idioma: string) {
    this.servicoTraducao.use(idioma);
    this.adapter.setLocale(idioma);
    this.timeAdapter.setLocale(idioma);
  }

  sair() {
    const titulo = this.internacionalizacao('Warning');

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: {
        titulo: titulo,
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
