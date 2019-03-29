import { PerfilPage } from './../perfil/perfil';
import { EmpresaProvider } from './../../providers/empresa/empresa';
import { DoadorProvider } from './../../providers/doador/doador';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginProvider } from '../../providers/login/login';
import { CnpjvalidacaoProvider } from '../../providers/cnpjvalidacao/cnpjvalidacao';
import { ViacepProvider } from '../../providers/viacep/viacep';



@IonicPage()
@Component({
  selector: 'page-cad-doador',
  templateUrl: 'cad-doador.html',
})
export class CadDoadorPage {

  title: string;
  pessoa: FormGroup;
  empresa: FormGroup;

  private cep; //CEP
  private endereco:any = {}; //CEP

  private cnpj; //cnpj
	private cnpjList:any = {}; //cnpj

  empresa_array: any;
  doador_array: any;

  exibirPessoa: boolean = false;

  exibirEmpresa: boolean = false;

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public vc: ViewController,
    private DoadorProvider: DoadorProvider,
    private EmpresaProvider: EmpresaProvider,
    private validacnpj: CnpjvalidacaoProvider,
    public alertCtrl: AlertController,
    private toast: ToastController,
    private viacep: ViacepProvider,
    private formBuilder: FormBuilder,
    private loginProvider: LoginProvider) {

    this.doador_array = this.navParams.data.doador || {};
    this.empresa_array = this.navParams.data.empresa || {};
    this.createFormpessoa();
    this.createFormempresa();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadDoadorPage');
  }

  createFormpessoa() {
    this.pessoa = this.formBuilder.group({
      key: [this.doador_array.key, Validators.required],
      nomePessoa: [this.doador_array.nomePessoa, Validators.required],
      data_nascimento: [this.doador_array.data_nascimento, Validators.required],
      email: [this.doador_array.email, Validators.required],
      cpf: [this.doador_array.cpf, Validators.required],
      cep: [this.doador_array.cep, Validators.required],
      senha: [this.doador_array.senha, Validators.required],
      cidade : [this.endereco.uf],
      bairro : [this.endereco.bairro],
      rua : [this.endereco.logradouro]
    });
  }

  createFormempresa() {
    this.empresa = this.formBuilder.group({
      key: [this.empresa_array.key, Validators.required],
      razaosocial: [this.empresa_array.razaosocial, Validators.required],
      cnpj: [this.empresa_array.cnpj, Validators.required],
      cep: [this.empresa_array.cep, Validators.required],
      email: [this.empresa_array.email, Validators.required],
      senha: [this.empresa_array.senha, Validators.required],
      cidade : [this.endereco.uf],
      bairro : [this.endereco.bairro],
      rua : [this.endereco.logradouro]
    });
  }
  getEndereco(){ //CEP
    console.log(this.cep);
  this.viacep.callService(this.cep)
  .subscribe(
      data =>{
  this.endereco = data;
  console.log(data);
      }
    );
    
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

  createAccount(button: string) {

      this.getEndereco();

      setTimeout(() => {
        if (button == 'empresa') {

      this.EmpresaProvider.save(this.empresa.value)
        .then(() => {
          // this.toast.create({ message: 'Empresa salva com sucesso.', duration: 3000 }).present();
          this.navCtrl.pop();
        })
        .catch((e) => {
          // this.toast.create({ message: 'Erro ao salvar o empresa.', duration: 3000 }).present();
          console.error(e);
        });

      let data = this.empresa.value;
      let credentials = {
        email: data.email,
        senha: data.senha
      };

      let toast = this.toast.create({ duration: 3000, position: 'bottom' });

      this.loginProvider.createUser(credentials)
        .then((credentials: any) => {
          toast.setMessage('Empresa cadastrada com sucesso');
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
    } else if (button == 'pessoa') {

      this.DoadorProvider.save(this.pessoa.value)
        .then(() => {
          // this.toast.create({ message: 'Doador salvo com sucesso.', duration: 3000 }).present();
          this.navCtrl.pop();
        })
        .catch((e) => {
          // this.toast.create({ message: 'Erro ao salvar o doador.', duration: 3000 }).present();
          console.error(e);
        })

      let data = this.pessoa.value;
      let credentials = {
        email: data.email,
        senha: data.senha
      };

      let toast = this.toast.create({ duration: 3000, position: 'bottom' });

      this.loginProvider.createUser(credentials)
        .then((credentials: any) => {
          toast.setMessage('Usuário cadastrado com sucesso');
          toast.present();
          this.navCtrl.setRoot(HomePage);
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
      }, 2000);

    
  }


  botao(valor) {
    if (valor == 'empresa') {
      this.exibirEmpresa = true;
      this.exibirPessoa = false;
      this.title = this.navParams.data.empresa ? 'Alterando empresa' : 'Nova empresa ';
    } else if (valor == 'pessoa') {
      this.exibirEmpresa = false;
      this.exibirPessoa = true;
      this.title = this.navParams.data.pessoa ? 'Alterando doador' : 'Novo doador ';
    }

  }
  
  mostrar() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

}
