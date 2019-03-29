import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

/*
  Generated class for the EmpresaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EmpresaProvider {

  private PATH = 'empresas/';

  constructor(private db: AngularFireDatabase, public alertCtrl: AlertController) {

  }

  getAll() {
    return this.db.list(this.PATH, ref => ref.orderByChild('razaosocial'))
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

  save(empresa: any) {
    return new Promise((resolve, reject) => {
      if (empresa.key) {
        this.db.list(this.PATH)
          .update(empresa.key, {
            razaosocial: empresa.razaosocial,
            cnpj: empresa.cnpj,
            cep: empresa.cep,
            email: empresa.email,
            senha: empresa.senha,
            cidade: empresa.cidade,
            bairro: empresa.bairro,
            rua: empresa.rua
          })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
          .push({
            razaosocial: empresa.razaosocial,
            cnpj: empresa.cnpj,
            cep: empresa.cep,
            email: empresa.email,
            senha: empresa.senha,
            cidade: empresa.cidade,
            bairro: empresa.bairro,
            rua: empresa.rua
          })
          .then(() => resolve());
      }
    })
  }

  remove(key: string) {
    return this.db.list(this.PATH).remove(key);
  }

}
