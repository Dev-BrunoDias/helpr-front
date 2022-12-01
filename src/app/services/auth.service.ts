import { Credenciais } from './../models/credenciais';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, EMPTY } from 'rxjs';
import { Token } from '../models/token';
import { API_CONFIG } from '../config/api.config';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public authenticate(credenciais: Credenciais): Observable<any> {   
    return this.http.post<Token>(`${API_CONFIG.baseUrl}/auth/login`, credenciais).pipe(
      tap(token => {
        localStorage.setItem("token", token.accessToken);
      }),
      catchError(error => {
        alert("Erro ao autenticar!");
        console.error(error);
        return EMPTY;
      })
    );
  }
}
