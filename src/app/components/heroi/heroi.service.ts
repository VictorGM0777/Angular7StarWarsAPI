
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IHeroi } from '../../models/iheroi';


@Injectable()
export class HeroiService {
  // private url = AppConfig.settings.apiServer.caminho + '/LogEvento/maquina/';
  private url = 'https://swapi.co/api/people'; // star wars

  constructor(private http: HttpClient) { }

  listarHerois(): Observable<IHeroi> {
    return this.http.get<IHeroi>(this.url);
  }

  buscarHeroi(id: number) {
    return this.http.get<IHeroi>(this.url + '/' + id);
  }
}
