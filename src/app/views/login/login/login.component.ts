import { Credenciais } from './../../../models/credenciais';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    private AuthService: AuthService,
    private router: Router
    ) { 
    this.formLogin = formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      senha: ["", [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  public signIn(): void {
    if(this.formLogin.valid) {
      // Processo de Autenticação
      const credenciais: Credenciais = this.formLogin.value;
      this.AuthService.authenticate(credenciais).subscribe(Response => {
        alert("Bem-vindo!");
        this.router.navigate(["/home"])
      });
    }else {
      alert("Dados inválidos.")
    }
  }

}
