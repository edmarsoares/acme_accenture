import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

export class ServicoBasico<T> {
  protected baseUrl = "http://localhost:8080/api";
  constructor(protected http: HttpClient, private path:string) {
      
  }

  listar():Observable<T[]>{
      return this.http.get(`${this.baseUrl}/${this.path}`)
                      .pipe(map(value => value as T[]));
  }

  consultar(id: number | string): Observable<T> {
      return this.http.get(`${this.baseUrl}/${this.path}/${id}`)
                      .pipe(map(value => value as T));
  }

  atualizar(body: T){
      return this.http.put<HttpResponse<T>>(`${this.baseUrl}/${this.path}`, body);                  
  }

  salvar<T>(body){
      return this.http.post<HttpResponse<T>>(`${this.baseUrl}/${this.path}`, body);
  }

  deleteById(id: number): Observable<any>{
      return this.http.delete(`${this.baseUrl}/${this.path}/${id}`);
  }


}
