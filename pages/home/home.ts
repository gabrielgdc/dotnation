import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { InstituicaoProvider } from '../../providers/instituicao/instituicao';
import { Observable } from 'rxjs-compat';
import { AngularFireDatabase } from 'angularfire2/database';
import { DetalhesPage } from '../detalhes/detalhes';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  private PATH = '/instituicoes';

  queryText: string;
  instituicoes: Observable<any[]>;

  mostrarPesquisa: boolean = false;
  mostrarSelect: boolean = false;
  pesquisaIcon: string = 'search';
  naoExiste;

  teste;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    private provider: InstituicaoProvider,
    private afDb: AngularFireDatabase) {
    this.instituicoes = this.provider.getAll();

  }



  ShowSearch() {
    this.mostrarPesquisa = this.mostrarPesquisa === false ? true : false;
    this.mostrarSelect = this.mostrarSelect === false ? true : false;
    this.pesquisaIcon = this.pesquisaIcon === 'search' ? 'close' : 'search';
    this.instituicoes = this.provider.getAll();
  }


  detalhesPage(instituicao) {
    this.navCtrl.push(DetalhesPage, {
      ong: instituicao.ong,
      cidade: instituicao.cidade,
      bairro: instituicao.bairro,
      cep: instituicao.cep,
      rua: instituicao.rua,
      descricao: instituicao.descricao,
      email: instituicao.email,
      produto: instituicao.produto,
      quantidade: instituicao.quantidade,
      finalidade: instituicao.finalidade
    });
  }

  filterData() {

    this.instituicoes = this.afDb.list(this.PATH, ref => ref.orderByChild('ong').equalTo(this.queryText)).valueChanges();

    if (this.queryText == "") {
      this.naoExiste = "Nao encontrei nenhum registro :(";
    }
  }
  FiltroSelect(cidade: any) {

    this.instituicoes = this.afDb.list(this.PATH, ref => ref.orderByChild('cidade').equalTo(cidade)).valueChanges();
  }



}