import { DoarPage } from './../doar/doar';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs-compat';
import { Http } from '@angular/http';


@IonicPage()
@Component({
  selector: 'page-detalhes',
  templateUrl: 'detalhes.html',
})
export class DetalhesPage {

  ong;
  cidade;
  bairro;
  cep;
  rua;
  descricao;
  email;
  finalidade;
  produto;
  quantidade;

  receberdata = Date();

  dataDoacao = this.receberdata;

  instituicoes: Observable<any[]>;

  donation_type = [
    "Trabalho voluntário",
    "Doação de sangue",
    "Doação de brinquedos",
    "Cesta Básica",
    "Doacção de dinheiro"
  ];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http) {


    //RECEBENDO VIA GET
    this.ong = this.navParams.get("ong");
    this.cidade = this.navParams.get("cidade");
    this.bairro = this.navParams.get("bairro");
    this.rua = this.navParams.get("rua");
    this.finalidade = this.navParams.get("finalidade");
    this.email = this.navParams.get("email");
    this.produto = this.navParams.get("produto");
    this.quantidade = this.navParams.get("quantidade");
    this.cep = this.navParams.get("cep");

    console.log(this.dataDoacao);
  }


  gotoDoar() {
    this.navCtrl.push(DoarPage, {
      ong: this.ong,
      donation: this.donation_type,
      rua: this.rua,
      bairro: this.bairro,
      dataDoacao : this.dataDoacao
    });
  }

}
