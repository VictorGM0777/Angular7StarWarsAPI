import { Injectable } from '@angular/core';
import { IEmpresa } from 'src/app/models/iempresa';

@Injectable()
export class PaginaInicialService {

  private data: any;
  private logado: boolean;
  private cadastro: boolean;
  private empresa: IEmpresa;

  constructor() { }

  public setDataSelect(data: any) {
    this.data = data;
  }

  public getDataSelect() {
    return this.data;
  }

  public setLogin(logado: boolean) {
    this.logado = logado;
  }

  public getLogin() {
    return this.logado;
  }

  public setCadastrar(cadastro: boolean) {
    this.cadastro = cadastro;
  }

  public getCadastrar() {
    return this.cadastro;
  }

  public setEmpresaLogin(empresa: IEmpresa) {
    this.empresa = empresa;
  }

  public getEmpresaLogin() {
    return this.empresa;
  }

}
