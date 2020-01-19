import { AppConfig } from 'src/app/app.config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEmpresa } from 'src/app/models/iempresa';


@Injectable()
export class LoginService {
  private url = AppConfig.settings.apiServer.caminho + '/Empresa/login/';

  constructor(private http: HttpClient) { }

  buscarDadosEmpresa(login: string): Observable<IEmpresa> {
    return this.http.get<IEmpresa>(this.url + login);
  }
}
