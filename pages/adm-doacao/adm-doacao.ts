import { DoacaoProvider } from './../../providers/doacao/doacao';
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

@IonicPage()
@Component({
  selector: 'page-adm-doacao',
  templateUrl: 'adm-doacao.html',
})
export class AdmDoacaoPage {

  doacoes: Observable<any[]>;


  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public provider: DoacaoProvider, 
    public modalCtrl: ModalController, public toast: ToastController) {
    this.doacoes = this.provider.getAll();
  }


  excluirDoacao(key: string) {
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
