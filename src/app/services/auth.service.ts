import { Credenciais } from './../models/credenciais';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Token } from '../models/token';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public authenticate(credenciais: Credenciais): Observable<any> {
    const baseUrl = "http://localhost8080";
    return this.http.post<Token>(`${baseUrl}/auth/login`, credenciais).pipe(
      tap(token => {
        localStorage.setItem("token", token.accessToken);
      })
    );

    // Autenticar
  }
}
