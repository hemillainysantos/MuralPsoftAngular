import { Http, Response } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import {LoginComponent} from '../login/login.component';
import { MuralComponent } from '../mural/mural.component';
import 'rxjs/add/operator/map';
import swal from 'sweetalert';

@Injectable()
export class MensagensService {

  private mensagens: Object[] = [];
  msgCreated = new EventEmitter<any>();
  
  constructor(private http: Http) { }
  
  getArrayMensagens() {
    return this.mensagens = this.mensagens
    .sort((a, b) =>  {
      //b.created_at
      //a.created_at
      return new Date().getTime() - new Date().getTime();
    });
  }
  
  getMensagens() {
    return this.http.get('http://150.165.85.16:9900/api/msgs')
    .map((response: Response) => response.json());
  }
  
  notifyAddMsg(): void {
    this.msgCreated.emit();
  }
  
  setArrayMsgs(mensagens: Object[]): any {
    this.mensagens = mensagens;
  }
  
  enviaMensagem(titulo: string, mensagem: string, autor: string, senha: string) {
     const user = 'hemillainy';
     const body = {
       title: titulo,
       msg: mensagem,
       author: autor,
       credentials: `${user}:${senha}`
     }
     this.http.post('http://150.165.85.16:9900/api/msgs', body)
     .subscribe(response => {
       if (response.status == 200) {

       }
     },
     error => {
       const swal = require('sweetalert');
       swal('Senha incorreta!');
     });
  }
}