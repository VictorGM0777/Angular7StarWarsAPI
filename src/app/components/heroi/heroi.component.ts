import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { HeroiService } from './heroi.service';
import { Validator } from 'src/app/util/validator';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Util } from 'src/app/util/util';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../base/base.component';
import { IHeroi } from '../../models/iheroi';

@Component({
  selector: 'app-heroi',
  templateUrl: './heroi.component.html',
  styleUrls: ['./heroi.component.css']
})
export class HeroiComponent extends BaseComponent implements OnInit {
  busca: boolean;
  listaHeroi: IHeroi[];

  constructor(
    private heroiService: HeroiService,
    private router: Router,
    public dialog: MatDialog,
    public servicoTraducao: TranslateService,
    public zone: NgZone,
    public changeDetectorRef: ChangeDetectorRef
  ) {
    super(servicoTraducao, zone, changeDetectorRef);
  }

  ngOnInit() {
  }

  buscar() {
    this.listaHeroi = null;
    this.busca = true;
    this.render();
    this.requestHerois();
  }

  requestHerois() {
    this.heroiService.listarHerois().subscribe(
      (data: any) => {
        this.listaHeroi = data.results;
      },
      error => {
        const titulo = this.internacionalizacao('Error');
        Util.abrirDialogErro(this.dialog, error, titulo);
        console.log(error);
      }
    );
    this.busca = false;
    this.render();
  }

  carregandoDados() {
    return this.busca;
  }

  exibirLista() {
    return !Validator.isNullUndefinedEmpty(this.listaHeroi);
  }

  voltar() {
    this.router.navigate(['/home']);
  }
}
