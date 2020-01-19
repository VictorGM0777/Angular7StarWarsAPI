import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { PaginaInicialService } from '../pagina-inicial/pagina-inicial.service';
import { Validator } from 'src/app/util/validator';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../base/base.component';
import { IHeroi } from '../../models/iheroi';

@Component({
  selector: 'app-heroi-master',
  templateUrl: './heroi-master.component.html',
  styleUrls: ['./heroi.component.css']
})
export class HeroiMasterComponent extends BaseComponent implements OnInit, AfterViewInit {
  colunasExibidas: string[] = ['name', 'acoes'];

  @Input()
  listaHeroi: IHeroi[];

  dadosTabela: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private paginaInicialService: PaginaInicialService,
    public servicoTraducao: TranslateService
  ) {
    super(servicoTraducao);
  }

  ngOnInit() {
    this.dadosTabela = new MatTableDataSource<IHeroi>(this.listaHeroi);
  }

  ngAfterViewInit() {
    this.dadosTabela.paginator = this.paginator;
    this.dadosTabela.sort = this.sort;
  }

  aplicarFiltro(valorFiltro: string) {
    this.dadosTabela.filter = valorFiltro.trim().toLowerCase();
  }

  navegarEventoDetail(heroi: IHeroi) {
    this.paginaInicialService.setDataSelect(heroi);
    this.router.navigate(['/event-detail']);
  }

  exibirLista() {
    return Validator.isArrayWithItems(this.listaHeroi);
  }
}
