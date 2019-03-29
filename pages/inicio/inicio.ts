import { HomePage } from './../home/home';
import { CadEscolherPage } from './../cad-escolher/cad-escolher';

import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides} from 'ionic-angular';
import { LoginPage } from '../login/login';


/**
 * Generated class for the InicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 
@IonicPage()
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})
export class InicioPage {

  @ViewChild(Slides) slides: Slides;

  exibirBotao: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  skipButton(){
     this.slides.slideTo(3, 500);
    //this.navCtrl.setRoot(HomePage);
  }

  slider = [
    {
      titulo:'O DOTNATION',
      descricao:'BemVindo ',
      image:'assets/imgs/cultura3.png'
    },
    {
      titulo:'BEM VINDO AO DOTNATION',
      descricao:'Um aplicativo que te ajuda a ajudar outras pessoas e instituições carentes de sua ajuda :)',
      image:'assets/imgs/icone-doacao.png'
    },
    {
      titulo:'AQUI VOCÊ PODE DOAR TODO TIPO DE COISA',
      descricao:'Brinquedos, comida, roupa, até mesmo o seu tempo para ajudar os necessitados',
      image:'assets/imgs/coracao.png'
    },
    {
      titulo:'VOCÊ ESTÁ QUASE PRONTO',
      descricao:'Entre e ajude',
      image:'assets/imgs/Donate-green.png'
    }
  ];

  showButton(valor){
    if(this.slides.isEnd()){
      this.exibirBotao = true;
    } else {
      this.exibirBotao = false;
    }
    
  }
  gotoHome(){
    this.navCtrl.setRoot(HomePage);
  }

  whenReachEnd(){
    this.slides.getActiveIndex();
    console.log(this.slides.getActiveIndex());
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad InicioPage');
  }

  cadastrar(){
    this.navCtrl.push(CadEscolherPage);
  }

  entrar(){
    this.navCtrl.push(LoginPage);
  }

  continuar(){
    this.navCtrl.setRoot(HomePage);
  }

}
