import { CadMotoristaPage } from './../cad-motorista/cad-motorista';
import { MotoristaProvider } from './../../providers/motorista/motorista';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';

import { Observable } from 'rxjs-compat';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';


@IonicPage()
@Component({
  selector: 'page-adm-motorista',
  templateUrl: 'adm-motorista.html',
})
export class AdmMotoristaPage {

  motoristas: Observable<any[]>;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public provider: MotoristaProvider,
     public modalCtrl: ModalController, public toast: ToastController) {
    this.motoristas = this.provider.getAll();
  }

  editarMotorista(motorista: any) {
    // Maneira 1
    this.navCtrl.push(CadMotoristaPage, { motorista: motorista });
 
    // Maneira 2
    // this.navCtrl.push('ContactEditPage', { key: contact.key });
  }

  excluirMotorista(key: string) {
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
