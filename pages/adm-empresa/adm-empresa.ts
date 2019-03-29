import { EmpresaProvider } from './../../providers/empresa/empresa';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Http} from '@angular/http';
import { Observable } from 'rxjs-compat';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { CadDoadorPage } from '../cad-doador/cad-doador';




@IonicPage()
@Component({
  selector: 'page-adm-empresa',
  templateUrl: 'adm-empresa.html',
})
export class AdmEmpresaPage {

  empresas: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, 
    public provider: EmpresaProvider, public modalCtrl: ModalController, public toast: ToastController) {
    this.empresas = this.provider.getAll();
  }

  ionViewDidLoad() {
    
  }

  editarEmpresa(empresa: any) {
    // Maneira 1
    this.navCtrl.push(CadDoadorPage, { empresa: empresa });
 
    // Maneira 2
    // this.navCtrl.push('ContactEditPage', { key: contact.key });
  }

  excluirEmpresa(key: string){
    if (key) {
      this.provider.remove(key)
        .then(() => {
          this.toast.create({ message: 'Empresa removida sucesso.', duration: 3000 }).present();
        })
        .catch(() => {
          this.toast.create({ message: 'Erro ao remover a empresa.', duration: 3000 }).present();
        });
    }
  }


}
