import { Component, OnInit } from '@angular/core';
import { PaginaInicialService } from '../pagina-inicial/pagina-inicial.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../base/base.component';
import { IHeroi } from '../../models/iheroi';

@Component({
  selector: 'app-heroi-detail',
  templateUrl: './heroi-detail.component.html',
  styleUrls: ['./heroi.component.css']
})
export class HeroiDetailComponent extends BaseComponent implements OnInit {
  heroi: IHeroi;
  tipoEvento: string;

  dadosTabela: any;

  constructor(
    private paginaInicialService: PaginaInicialService,
    private router: Router,
    public servicoTraducao: TranslateService
  ) {
    super(servicoTraducao);
  }

  ngOnInit() {
    this.heroi = this.paginaInicialService.getDataSelect();
  }

  voltar() {
    this.router.navigate(['/event']);
  }
}
