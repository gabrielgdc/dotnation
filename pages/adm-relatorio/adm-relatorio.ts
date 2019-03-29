import { AdmDoacaoPage } from './../adm-doacao/adm-doacao';
import { DoacaoProvider } from './../../providers/doacao/doacao';
import { AdmMotoristaPage } from './../adm-motorista/adm-motorista';
import { DoadorProvider } from './../../providers/doador/doador';
import { EmpresaProvider } from './../../providers/empresa/empresa';
import { AdmEmpresaPage } from './../adm-empresa/adm-empresa';
import { AdmInstituicaoPage } from './../adm-instituicao/adm-instituicao';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { AdmDoadorPage } from '../adm-doador/adm-doador';

import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';//GRAFICO


import { InstituicaoProvider } from '../../providers/instituicao/instituicao';
import { Observable } from 'rxjs-compat';
import { AngularFireDatabase } from 'angularfire2/database';
import { MotoristaProvider } from '../../providers/motorista/motorista';

@IonicPage()
@Component({
  selector: 'page-adm-relatorio',
  templateUrl: 'adm-relatorio.html',
})
export class AdmRelatorioPage {

  exibirGrafico: boolean = false;
  exibirCrud: boolean = true;

  gerarStatus = false;
  somaDoadores;
  instituicoes: Observable<any[]>;
  empresa: Observable<any[]>;
  doador: Observable<any[]>;
  motorista: Observable<any[]>;
  doacao: Observable<any[]>;
  dadosInstituicoes: number;
  dadosMotorista: number;
  dadosEmpresa: number;
  dadosDoador: number;
  dadosDoacao: number;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private instituicaoProvider: InstituicaoProvider,
    private empresaProvider: EmpresaProvider,
    private doadorProvider: DoadorProvider,
    private MotoristaProvider: MotoristaProvider,
    private doacaoProvider: DoacaoProvider,
    public http: Http,
    private afDb: AngularFireDatabase) {


    this.instituicoes = this.instituicaoProvider.getAll();
    this.motorista = this.MotoristaProvider.getAll();
    this.empresa = this.empresaProvider.getAll();
    this.doador = this.doadorProvider.getAll();
    this.doacao = this.doacaoProvider.getAll();


    //INSTITUICAO
    this.instituicoes.subscribe(resultInst => {
      this.dadosInstituicoes = resultInst.length;
      console.log("Instituicoes:", this.dadosInstituicoes)
    });
    //MOTORISTA
    this.motorista.subscribe(resultMoto => {
      this.dadosMotorista = resultMoto.length;
      console.log("Motoristas:", this.dadosMotorista)
    });
    //EMPRESA
    this.empresa.subscribe(resultempre => {
      this.dadosEmpresa = resultempre.length;
      console.log("Empresas:", this.dadosEmpresa)
    });
    //DOADOR
    this.doador.subscribe(resultdoa => {
      this.dadosDoador = resultdoa.length;
      console.log("Doador:", this.dadosDoador)
    });
    //DOACAO
    this.doacao.subscribe(resultdoacao => {
      this.dadosDoacao = resultdoacao.length;
      console.log("Doacoes:", this.dadosDoacao)
    });

  }


  //TODOS OS REGISTROS
  public doughnutChartLabels: string[] = ['Instituiçoes', 'Empresas', 'Doadores', 'Motoristas', 'Doaçoes'];
  public doughnutChartData: any[] = [1, 1, 1, 1, 0];
  public doughnutChartType: string = 'doughnut';
  public chartColors: Array<any> = [
    { // all colors in order
      backgroundColor: ['#2E8B57', '#b22222', '#ffbf00', '#19aae6', '#800080']
    }
  ];
  public barChartOptions = {
    title: {
      text: 'Todos os registros',
      display: true
    }
  };


  //TODOS OS doadores por doaçoes
  public pieChartLabels: string[] = ['Doaçoes', 'Doadores'];
  public pieChartData: any[] = [1, 1];
  public pieChartType: string = 'pie';
  public chartColors1: Array<any> = [
    { // all colors in order
      backgroundColor: ['#FF4500', '#1E90FF']
    }
  ];
  public barChartOptions1 = {
    title: {
      text: 'Doadores por doaçoes',
      display: true
    }
  };


  gerarGrafico() {
    this.doughnutChartData = [this.dadosInstituicoes, this.dadosEmpresa, this.dadosDoador, this.dadosDoador, this.dadosDoacao];

    this.somaDoadores = this.dadosEmpresa + this.dadosDoador;
    console.log("Soma Doadoes", this.somaDoadores)

    this.pieChartData = [this.dadosDoacao, this.somaDoadores];
  }


  instituicaotabela() {
    this.navCtrl.push(AdmInstituicaoPage);
  }
  empresatabela() {
    this.navCtrl.push(AdmEmpresaPage);
  }
  doadortabela() {
    this.navCtrl.push(AdmDoadorPage);
  }
  motoristatabela() {
    this.navCtrl.push(AdmMotoristaPage);
  }
  doacaotabela(){
    this.navCtrl.push(AdmDoacaoPage);
  }


  botao(valor) {
    if (valor == 'crud') {
      this.exibirCrud = true;
      this.exibirGrafico = false;
    } else if (valor == 'graficos') {
      this.gerarGrafico();
      this.exibirGrafico = true;
      this.exibirCrud = false;
    }

  }

}
