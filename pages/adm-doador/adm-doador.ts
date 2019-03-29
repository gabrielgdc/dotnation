import { DoadorProvider } from './../../providers/doador/doador';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';


import { Observable } from 'rxjs-compat';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { ModalController } from '../../../node_modules/ionic-angular/components/modal/modal-controller';
import { CadDoadorPage } from '../cad-doador/cad-doador';





@IonicPage()
@Component({
  selector: 'page-adm-doador',
  templateUrl: 'adm-doador.html'
})
export class AdmDoadorPage {

  doadores: Observable<any[]>;


  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public provider: DoadorProvider, 
    public modalCtrl: ModalController, public toast: ToastController) {
    this.doadores = this.provider.getAll();
  }

  editarDoador(doador: any) {
    // Maneira 1
    this.navCtrl.push(CadDoadorPage, { doador: doador });
 
    // Maneira 2
    // this.navCtrl.push('ContactEditPage', { key: contact.key });
  }

  excluirDoador(key: string) {
    if (key) {
      this.provider.remove(key)
        .then(() => {
          this.toast.create({ message: 'Contato removido sucesso.', duration: 3000 }).present();
        })
        .catch(() => {
          this.toast.create({ message: 'Erro ao remover o contato.', duration: 3000 }).present();
        });
    }
  }


}