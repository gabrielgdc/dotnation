import { CadEscolherPage } from './../cad-escolher/cad-escolher';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  Empresa: any = [];
  Instituicao: any = [];
  email;//empresa
  senha;//empresa
  TestLogado = 0;

  loginForm: FormGroup;
  loginArray: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    private provider: LoginProvider,
    ) {
    this.loginArray = this.navParams.data.loginForm || {};
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: [this.loginArray.email],
      senha: [this.loginArray.senha]
    });
  }

  gotoCadastro() {
    this.navCtrl.push(CadEscolherPage);
  }

  signin() {
    let data = this.loginForm.value;
    let credentials = {
      email: data.email,
      senha: data.senha
    };

    let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });

    if (this.loginForm.valid) {
      this.provider.signIn(credentials)
        .then(() => {
          this.navCtrl.setRoot(HomePage);
        })
        .catch((error: any) => {
          if (error.code == 'auth/invalid-email') {
            toast.setMessage('O email não é válido');
          } else if (error.code == 'auth/user-disabled') {
            toast.setMessage('O usuário está desativado');
          } else if (error.code == 'auth/user-not-found') {
            toast.setMessage('O usuário não existe');
          } else if (error.code == 'auth/wrong-password') {
            toast.setMessage('A senha digitada está errada');
          }
          toast.present();
        });
    }
  }

  //botão de sair
  signOut() {
    this.provider.signOut()
      .then(() => {
        this.navCtrl.setRoot('')
      })
      .catch((error) => {
        console.error(error);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Recuperar senha',
      subTitle: 'Enviaremos para você o email com o passo a passo para recuperar sua senha',
      inputs: [
        {
          name: 'email',
          placeholder: 'Digite seu email',
          id: 'email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Enviar',
          handler: data => {
            if (data) {
              console.log(data.email);
              let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' })
              this.provider.resetPassword(data)
                .then(() => {
                  toast.setMessage('Uma solicitação foi enviada para o seu email');
                  toast.present();
                })
                .catch((error: any) => {
                  if (error.code == 'auth/invalid-email') {
                    toast.setMessage('O email digitado não é válido');
                  } else if (error.code == 'auth/user-not-found') {
                    toast.setMessage('O usuário não foi encontrado');
                  }
                  toast.present();
                });
            }
          }
        }
      ]
    });
    alert.present();
  }

  // resetPasswordPAGINA(){
  //   let data = this.formulario.value;
  //   let credentials = {
  //     email: data.email
  //   };

  //   if (this.formulario.valid){
  //     let toast = this.toastCtrl.create({duration: 3000, position: 'bottom'})

  //     this.afAuth.resetPassword(credentials.email)
  //     .then(() => {
  //       toast.setMessage('Uma solicitação foi enviada para o seu email');
  //       toast.present();
  //       this.navCtrl.pop();
  //     })
  //     .catch((error : any) => {
  //       if(error.code == 'auth/invalid-email'){
  //         toast.setMessage('O email digitado não é válido');
  //       }else if(error.code == 'auth/user-not-found'){
  //         toast.setMessage('O usuário não foi encontrado');
  //       }
  //       toast.present();
  //     });
  //   }
  // }


}
