import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  token = {
    headers: new HttpHeaders().set('Authorization', environment.token),
  };

  refreshToken(){
    this.token = {
      headers: new HttpHeaders().set('Authorization', environment.token)
    }
  }


  constructor(
    private http: HttpClient
  ) { }

  entrar(usuarioLogin: UsuarioLogin):Observable<UsuarioLogin>{
    return this.http.post<UsuarioLogin>('https://aldablog.herokuapp.com/usuarios/logar',usuarioLogin)
  }

  cadastrar(usuario: Usuario):Observable<Usuario>{
    return this.http.post<Usuario>('https://aldablog.herokuapp.com/usuarios/cadastrar',usuario)

  }

  getByIdUsuario(id: number): Observable<Usuario>{
    return this.http.get<Usuario>(`https://aldablog.herokuapp.com/usuarios/${id}`, this.token)
  }

  logado(){
    let ok: boolean = false

    if(environment.token != ''){
      ok = true;
    }

    return ok;
  }
}