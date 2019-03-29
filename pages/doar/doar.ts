import { DoacaoProvider } from './../../providers/doacao/doacao';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-doar',
  templateUrl: 'doar.html',
})
export class DoarPage {

  ong;
  bairro;
  rua;
  donation;

  //dataDoacao: String = new Date().toISOString();
  dataDoacao;

  doador;

  entrega;
  entregaStatus;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private doacaoProvider: DoacaoProvider, private toast: ToastController) {
   
      this.ong = this.navParams.get('ong')
      this.donation = this.navParams.get('donation');
      this.rua = this.navParams.get('rua');
      this.bairro = this.navParams.get('bairro');
      this.dataDoacao = this.navParams.get('dataDoacao');

    console.log(this.donation);
  }

  finalizarDoacao(doacao: any) {
    if(this.entrega == "motorista"){
      this.entregaStatus = "motorista";
    }else{
      this.entregaStatus = "O doador fara a entrega";
    }
    let data = {
      'ong' : this.ong, 
      'donation': this.donation,
      'rua': this.rua,
      'bairro': this.bairro,
      'dataDoacao' : this.dataDoacao,
      'entregaStatus' : this.entregaStatus
    };
    console.log(this.dataDoacao);

    this.doacaoProvider.save(data)
      .then(() => {
        this.toast.create({ message: 'Doação feita com sucesso.', duration: 3000 }).present();
        this.navCtrl.pop();
      })
      .catch((e) => {
        this.toast.create({ message: 'Erro ao fazer a doação.', duration: 3000 }).present();
        console.error(e);
      });
  }

}
