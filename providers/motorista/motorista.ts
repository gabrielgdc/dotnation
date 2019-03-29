import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';


import { AngularFireDatabase } from 'angularfire2/database';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';


@Injectable()
export class MotoristaProvider {
  private PATH = 'motoristas/';

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

  save(motorista: any) {
    return new Promise((resolve, reject) => {
      if (motorista.key) {
        this.db.list(this.PATH)
          .update(motorista.key, {
            nome: motorista.nome,
            cep: motorista.cep,
            placa: motorista.placa,
            cpf: motorista.cpf,
            email: motorista.email,
            senha: motorista.senha,
            cidade: motorista.cidade,
            bairro: motorista.bairro,
            rua: motorista.rua
          })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
          .push({
            nome: motorista.nome,
            cep: motorista.cep,
            placa: motorista.placa,
            cpf: motorista.cpf,
            email: motorista.email,
            senha: motorista.senha,
            cidade: motorista.cidade,
            bairro: motorista.bairro,
            rua: motorista.rua
          })
          .then(() => resolve());
      }
    })
  }

  remove(key: string) {
    return this.db.list(this.PATH).remove(key);
  }


  



}