//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { HttpHeaders } from '@angular/common/http';
//import { Headers, RequestOptions } from '@angular/http';
import { AlertController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()
export class DoadorProvider {
  private PATH = 'doadores/';

  constructor(private db: AngularFireDatabase, public alertCtrl: AlertController) {

  }

  getAll() {
    return this.db.list(this.PATH, ref => ref.orderByChild('nome'))
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
  }

  get(key: string) {
    return this.db.object(this.PATH + key).snapshotChanges()
      .map(c => {
        return { key: c.key, ...c.payload.val() };
      });
  }

  save(doador: any) {
    return new Promise((resolve, reject) => {
      if (doador.key) {
        this.db.list(this.PATH)
          .update(doador.key, {
            nomePessoa: doador.nomePessoa,
            data_nascimento: doador.data_nascimento,
            email: doador.email,
            cpf: doador.cpf,
            cep: doador.cep,
            senha: doador.senha,
            cidade: doador.cidade,
            bairro: doador.bairro,
            rua: doador.rua
          })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
          .push({
            nomePessoa: doador.nomePessoa,
            data_nascimento: doador.data_nascimento,
            email: doador.email,
            cpf: doador.cpf,
            cep: doador.cep,
            senha: doador.senha,
            cidade: doador.cidade,
            bairro: doador.bairro,
            rua: doador.rua
          })
          .then(() => resolve());
      }
    })
  }

  remove(key: string) {
    return this.db.list(this.PATH).remove(key);
  }




}
