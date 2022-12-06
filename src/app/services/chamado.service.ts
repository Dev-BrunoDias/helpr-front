import { catchError } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chamado } from '../models/chamado';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {

  constructor(private http: HttpClient) { }

  public findAll(): Observable<Chamado[]> {
    return this.http.get<Chamado[]>(`${API_CONFIG.baseUrl}/chamados`).pipe(
      catchError(error => {
        alert("Erro ao buscar dados de chamados");
        console.error(error);
        return EMPTY
      })
      ) 
  }

  public findById(id: string): Observable<Chamado> {
    return this.http.get<Chamado>(`${API_CONFIG.baseUrl}/chamados/${id}`).pipe(
      catchError(error => {
        alert("Erro ao buscar dado do Chamado");
        console.error(error);
        return EMPTY;
      })
    );
  }

  public create(chamado: Chamado):Observable<Chamado> {
    const data = {
      titulo: chamado.titulo,
      descricao: chamado.descricao,
      idCliente:chamado.cliente.id
    }
    return this.http.post<Chamado>(`${API_CONFIG.baseUrl}/chamados`, data).pipe(
      catchError(error => {
        alert("Erro ao cadastrar novo chamado.");
        console.error(error);
        return EMPTY
      })
    );
  }
}
