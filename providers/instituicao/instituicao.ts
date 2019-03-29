import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()
export class InstituicaoProvider {
  private PATH = 'instituicoes/';

  constructor(private db: AngularFireDatabase, public alertCtrl: AlertController) {
   
  }

  getAll() {
    return this.db.list(this.PATH, ref => ref.orderByChild('ong'))
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
 
  save(instituicao: any) {
    return new Promise((resolve, reject) => {
      if (instituicao.key) {
        this.db.list(this.PATH)
          .update(instituicao.key, { ong: instituicao.ong, cep: instituicao.cep, cnpj: instituicao.cnpj, email: instituicao.email, senha: instituicao.senha, finalidade: instituicao.finalidade, cidade: instituicao.cidade,bairro : instituicao.bairro, rua: instituicao.rua })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
          .push({ ong: instituicao.ong, cep: instituicao.cep, cnpj: instituicao.cnpj, email: instituicao.email, senha: instituicao.senha, finalidade: instituicao.finalidade, cidade: instituicao.cidade,bairro : instituicao.bairro, rua: instituicao.rua })
          .then(() => resolve());
      }
    })
  }
 
  remove(key: string) {
    return this.db.list(this.PATH).remove(key);
  }



}



