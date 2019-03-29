import { PerfilPage } from './../perfil/perfil';
import { MotoristaProvider } from './../../providers/motorista/motorista';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
import { ViacepProvider } from '../../providers/viacep/viacep';
/**
 * Generated class for the CadMotoristaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cad-motorista',
  templateUrl: 'cad-motorista.html',
})
export class CadMotoristaPage {


  cepValidator : boolean = false;

  private cep; //CEP
  private endereco:any = {}; //CEP

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  title: string;
  motorista: FormGroup;
  motorista_array: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public vc: ViewController,
    private viacep: ViacepProvider,
    public loginProvider: LoginProvider,
    private motoristaProvider: MotoristaProvider,
    private toast: ToastController, private formBuilder: FormBuilder) {
      this.motorista_array = this.navParams.data.motorista || {};
      this.createForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadMotoristaPage');
  }

  createForm() {

    this.motorista = this.formBuilder.group({
      key: [this.motorista_array.key, Validators.required],
      nome: [this.motorista_array.nome, Validators.required],
      cep: [this.motorista_array.cep, Validators.required],
      placa: [this.motorista_array.placa, Validators.required],
      cpf: [this.motorista_array.cpf, Validators.required],
      email: [this.motorista_array.email, Validators.required],
      senha: [this.motorista_array.senha, Validators.required],
      cidade : [this.endereco.uf],
      bairro : [this.endereco.bairro],
      rua : [this.endereco.logradouro]
    
    })
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

    setTimeout(() => { //GAMBIARRA
      this.createAccount()
      
    }, 2000);
}

  public keyUpChecker(event: any) {

    let newValue = event.target.value;

    let regExp = new RegExp('^[A-Za-z0-9? ]+$');

    if (! regExp.test(newValue)) {
      event.target.value = newValue.slice(0, -1);
    }
  }

  mostrar() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  createAccount() {

    if (this.navParams.data.motorista) {
      this.motoristaProvider.save(this.motorista.value)
        .then(() => {
          this.toast.create({ message: 'Instituicão salva com sucesso.', duration: 3000 }).present();
          this.navCtrl.pop();
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao salvar a instituição.', duration: 3000 }).present();
          console.error(e);
        });
    } else {
      if (this.motorista.value) {

        this.motoristaProvider.save(this.motorista.value)
          .then(() => {
            this.toast.create({ message: 'Instituicão salva com sucesso.', duration: 3000 }).present();
            this.navCtrl.pop();
          })
          .catch((e) => {
            this.toast.create({ message: 'Erro ao salvar a instituição.', duration: 3000 }).present();
            console.error(e);
          });

        let data = this.motorista.value;
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
