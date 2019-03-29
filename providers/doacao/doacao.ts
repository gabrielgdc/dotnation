import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

/*
  Generated class for the DoacaoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DoacaoProvider {

  private PATH = 'doacoes/';

  constructor(private db: AngularFireDatabase, public alertCtrl: AlertController) {
   
  }

  getAll() {
    return this.db.list(this.PATH, ref => ref.orderByChild('dataDoacao'))
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
 
  save(doacao: any) {
    return new Promise((resolve, reject) => {
      if (doacao.key) {
        this.db.list(this.PATH)
          .update(doacao.key, { alvo_doacao: doacao.ong, rua: doacao.rua, bairro: doacao.bairro, doacao_tipo: doacao.donation, dataDoacao: doacao.dataDoacao, entregaStatus: doacao.entregaStatus })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
          .push({ alvo_doacao: doacao.ong, rua: doacao.rua, bairro: doacao.bairro, doacao_tipo: doacao.donation, dataDoacao: doacao.dataDoacao, entregaStatus: doacao.entregaStatus })
          .then(() => resolve());
      }
    })
  }
 
  remove(key: string) {
    return this.db.list(this.PATH).remove(key);
  }

}
