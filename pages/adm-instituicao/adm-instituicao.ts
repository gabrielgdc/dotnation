import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { InstituicaoProvider } from '../../providers/instituicao/instituicao';
import { Http } from '@angular/http';

import { Observable } from 'rxjs-compat';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { CadInstituicaoPage } from '../cad-instituicao/cad-instituicao';


@IonicPage()
@Component({
  selector: 'page-adm-instituicao',
  templateUrl: 'adm-instituicao.html',
})
export class AdmInstituicaoPage {

instituicoes: Observable<any[]>;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public provider: InstituicaoProvider,
     public modalCtrl: ModalController, public toast: ToastController) {
    this.instituicoes = this.provider.getAll();
  }

  ionViewDidLoad(){
    
  }

  editarInstituicao(instituicao: any) {
    // Maneira 1
    this.navCtrl.push(CadInstituicaoPage, { instituicao: instituicao });
 
    // Maneira 2
    // this.navCtrl.push('ContactEditPage', { key: contact.key });
  }

  excluirInstituicao(key: string) {
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
