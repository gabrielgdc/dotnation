import { HomePage } from './../home/home';
import { CadMotoristaPage } from './../cad-motorista/cad-motorista';
import { CadInstituicaoPage } from './../cad-instituicao/cad-instituicao';
import { CadDoadorPage } from './../cad-doador/cad-doador';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the CadEscolherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cad-escolher',
  templateUrl: 'cad-escolher.html',
})
export class CadEscolherPage {

  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController, public navParams: NavParams) {
  }



  doador(){
    this.navCtrl.push(CadDoadorPage);
  }
  instituicao(){
    this.navCtrl.push(CadInstituicaoPage);
  }
  loginFacebook(){
    
  }
  motorista(){
    this.navCtrl.push(CadMotoristaPage);
  }
  voltar(){
    this.navCtrl.setRoot(HomePage);
  }

}
