import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IEmpresa } from 'src/app/models/iempresa';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { PaginaInicialService } from '../pagina-inicial/pagina-inicial.service';
import { BaseComponent } from '../base/base.component';

const componentSelector = 'login';

@Component({
  selector: componentSelector,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit {
  esconder = true;
  formulario: FormGroup;
  empresa: IEmpresa;

  constructor(
    private loginService: LoginService,
    private router: Router,
    public dialog: MatDialog,
    public paginaInicialService: PaginaInicialService,
    public servicoTraducao: TranslateService,
    public zone: NgZone,
    public changeDetectorRef: ChangeDetectorRef
  ) {
    super(servicoTraducao, zone, changeDetectorRef);
    this.empresa = <IEmpresa>{};
  }

  ngOnInit() {
    this.criarFormulario();
  }

  criarFormulario() {
    this.formulario = new FormGroup({
      usuario: new FormControl('', Validators.required),
      senha: new FormControl('', Validators.required)
    });
  }

  entrar() {
    this.paginaInicialService.setLogin(true);
    this.router.navigate(['/']);
  }
}
