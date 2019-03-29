import { PerfilPage } from './../perfil/perfil';
import { InstituicaoProvider } from './../../providers/instituicao/instituicao';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginProvider } from '../../providers/login/login';
import { ViacepProvider } from '../../providers/viacep/viacep';
import { CnpjvalidacaoProvider } from '../../providers/cnpjvalidacao/cnpjvalidacao';

@IonicPage()
@Component({
  selector: 'page-cad-instituicao',
  templateUrl: 'cad-instituicao.html',
})
export class CadInstituicaoPage {

  private cep; //CEP
  private endereco: any = {}; //CEP

  private cnpj; //cnpj
  private cnpjList: any = {}; //cnpj


  ocultarBasico: boolean = true;
  ocultarContato: boolean = false;
  ocultarDoacao: boolean = false;

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  title: string;
  instituicao: FormGroup;
  instituicao_array: any;

  finalidades = [
    "Defesa social e Institucional",
    "Proteção Social",
    "Vigilância Social",
    "Associação de Moradores",
    "Cultura e arte",
    "Defesa de Direitos de Grupos e Minorias",
    "Defesa e Proteção do Meio Ambiente",
    "Desenvolvimento Rural",
    "Educação Infantil",
    "Educação Profissional",
    "Emprego e Treinamento",
    "Ensino Superior",
    "Entidades Financiadoras de Projetos",
    "Estudos e Pesquisas",
    "Habitação",
    "Hospitais",
    "Micro-Crédito Produtivo e Orientado",
    "Outras Formas de Desenvolvimento e Defesa de Direitos",
    "Outras formas de Educação/Ensino",
    "Outras não Especificadas Anteriormente",
    "Outros Serviços em Saúde",
    "Promoção do Voluntariado",
    "Segurança e Cidadania"
  ];


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public vc: ViewController,
    private viacep: ViacepProvider,
    private validacnpj: CnpjvalidacaoProvider,
    private instituicaoProvider: InstituicaoProvider, private toast: ToastController, private formBuilder: FormBuilder, public loginProvider: LoginProvider) {
    this.instituicao_array = this.navParams.data.instituicao || {};
    this.createForm();

    this.setupPageTitle();
  }




  private setupPageTitle() {
    this.title = this.navParams.data.instituicao ? 'Alterando instituição' : 'Nova instituição';
  }


  getCNPJ() { //cnpj

    this.cnpj = this.cnpj.replace(/[./-]/g, '');

    this.validacnpj.callServiceCNPJ(this.cnpj)
      .subscribe(
      data => {
        this.cnpjList = data;
        console.log(data);
      }
      );
    this.cnpj = this.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/gi, '\$1.\$2.\$3\/\$4\-');

  }

  getEndereco() { //CEP
    console.log(this.cep);
    this.viacep.callService(this.cep)
      .subscribe(
      data => {
        this.endereco = data;
        console.log(data);
      }
      );

    setTimeout(() => { //GAMBIARRA
      this.createAccount()

    }, 2000);

  }

  createForm() {
    this.instituicao = this.formBuilder.group({
      key: [this.instituicao_array.key, Validators.required],
      ong: [this.instituicao_array.ong, Validators.required],
      cep: [this.instituicao_array.cep, Validators.required],
      cnpj: [this.instituicao_array.cnpj, Validators.required],
      email: [this.instituicao_array.email, Validators.required],
      senha: [this.instituicao_array.senha, Validators.required],
      finalidade: [this.instituicao_array.finalidade, Validators.required],
      cidade: [this.endereco.uf],
      bairro: [this.endereco.bairro],
      rua: [this.endereco.logradouro]
    })
  }

  mostrar() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  createAccount() {
    if (this.navParams.data.instituicao) {
      this.instituicaoProvider.save(this.instituicao.value)
        .then(() => {
          this.toast.create({ message: 'Instituicão salva com sucesso.', duration: 3000 }).present();
          this.navCtrl.pop();
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao salvar a instituição.', duration: 3000 }).present();
          console.error(e);
        });
    } else {
      if (this.instituicao.value) {

        this.instituicaoProvider.save(this.instituicao.value)
          .then(() => {
            this.toast.create({ message: 'Instituicão salva com sucesso.', duration: 3000 }).present();
            this.navCtrl.pop();
          })
          .catch((e) => {
            this.toast.create({ message: 'Erro ao salvar a instituição.', duration: 3000 }).present();
            console.error(e);
          });

        let data = this.instituicao.value;
        let credentials = {
          email: data.email,
          senha: data.senha
        };

        let toast = this.toast.create({ duration: 3000, position: 'bottom' });

        this.loginProvider.createUser(credentials)
          .then((credentials: any) => {
            toast.setMessage('Usuário criado com sucesso');
            toast.present();
            this.navCtrl.setRoot(PerfilPage);
          })
          .catch((error: any) => {
            if (error.code == 'auth/email-already-in-use') {
              toast.setMessage('O email digitado já está em uso');
            } else if (error.code == 'auth/invalid-email') {
              toast.setMessage('O email digitado não é válido');
            } else if (error.code == 'auth/operation-not-allowed') {
              toast.setMessage('Não está habilitado criar usuários');
            } else if (error.code == 'auth/weak-password') {
              toast.setMessage('A senha digitada é muito fraca');
            }
            toast.present();
          });
      }
    }

  }



}
