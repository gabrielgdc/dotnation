
import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';//camera
import { LoginProvider } from '../../providers/login/login';
import { Observable } from 'rxjs/internal/Observable';
import { StoragedataProvider } from '../../providers/storagedata/storagedata';



@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {


  myphoto: any = 'assets/imgs/avatar.jpg'; //camera
  userdataMotorista: Observable<any[]>;

  userdataEmpresa: Observable<any[]>;


  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  //MOTORISTA
  nomeMotorista: string;
  emailMotorista: string;
  senhaMotorista: string;
  ruaMotorista: string;
  bairroMotorista: string;
  cidadeMotorista: string;
  cpfMotorista: string;
  //INSTITUICAO
  nomeInstituicao: string;
  emailInstituicao: string;
  senhaInstituicao: string;
  ruaInstituicao: string;
  bairroInstituicao: string;
  cidadeInstituicao: string;
  cnpjInstituicao: string;
  precisaInstituicao: string;
  //DOADOR
  nomePessoa: string;
  emailPessoa: string;
  senhaPessoa: string;
  ruaPessoa: string;
  bairroPessoa: string;
  cidadePessoa: string;
  cpfPessoa: string;
  //EMPRESA
  razaoEmpresa: string
  emailEmpresa: string;
  senhaEmpresa: string;
  ruaEmpresa: string;
  bairroEmpresa: string;
  cidadeEmpresa: string;
  cnpjEmpresa: string;





  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    public loginProvider: LoginProvider,
    private afDb: AngularFireDatabase,
    private storageProvider: StoragedataProvider) {
    this.GetLoggedInUser();
  }



  GetLoggedInUser() {
    var user = this.loginProvider.getCurrentUser();

    if (user != null) {
      console.log(user);
      this.afDb.list('/motoristas', ref => ref.orderByChild('email').equalTo(user.email)).valueChanges()
        .subscribe(
          data => {
            var userdataMotorista = data;

            if (userdataMotorista.length > 0) {
              this.nomeMotorista = userdataMotorista['0']['nome'];
              this.emailMotorista = userdataMotorista['0']['email'];
              this.senhaMotorista = userdataMotorista['0']['senha'];
              this.ruaMotorista = userdataMotorista['0']['rua'];
              this.bairroMotorista = userdataMotorista['0']['bairro'];
              this.cidadeMotorista = userdataMotorista['0']['cidade'];
              this.cpfMotorista = userdataMotorista['0']['cpf'];

            }
          });

      this.afDb.list('/empresas', ref => ref.orderByChild('email').equalTo(user.email)).valueChanges()
        .subscribe(
          data => {
            var userdataEmpresa = data;

            if (userdataEmpresa.length > 0) {
              console.log(userdataEmpresa);

              this.razaoEmpresa = userdataEmpresa['0']['razaosocial'];
              this.emailEmpresa = userdataEmpresa['0']['email'];
              this.senhaEmpresa = userdataEmpresa['0']['senha'];
              this.ruaEmpresa = userdataEmpresa['0']['rua'];
              this.bairroEmpresa = userdataEmpresa['0']['bairro'];
              this.cidadeEmpresa = userdataEmpresa['0']['cidade'];
              this.cnpjEmpresa = userdataEmpresa['0']['cnpj'];
            }
          });

      this.afDb.list('/doadores', ref => ref.orderByChild('email').equalTo(user.email)).valueChanges()
        .subscribe(
          data => {
            var userdataPessoa = data;

            if (userdataPessoa.length > 0) {
              console.log(userdataPessoa);
              this.nomePessoa = userdataPessoa['0']['nomePessoa'];
              this.emailPessoa = userdataPessoa['0']['email'];
              this.senhaPessoa = userdataPessoa['0']['senha'];
              this.ruaPessoa = userdataPessoa['0']['rua'];
              this.bairroPessoa = userdataPessoa['0']['bairro'];
              this.cidadePessoa = userdataPessoa['0']['cidade'];
              this.cpfPessoa = userdataPessoa['0']['cpf'];
            }
          });

      this.afDb.list('/instituicoes', ref => ref.orderByChild('email').equalTo(user.email)).valueChanges()
        .subscribe(
          data => {
            var userdataInstituicoes = data;

            if (userdataInstituicoes.length > 0) {
              console.log(userdataInstituicoes);
              this.nomeInstituicao = userdataInstituicoes['0']['ong'];
              this.emailInstituicao = userdataInstituicoes['0']['email'];
              this.senhaInstituicao = userdataInstituicoes['0']['senha'];
              this.ruaInstituicao = userdataInstituicoes['0']['rua'];
              this.bairroInstituicao = userdataInstituicoes['0']['bairro'];
              this.cidadeInstituicao = userdataInstituicoes['0']['cidade'];
              this.cnpjInstituicao = userdataInstituicoes['0']['cnpj'];
            }
          });
    }
  }

  pegarFotoGaleria() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      allowEdit: true,
      targetHeight: 300,
      targetWidth: 300
    }

    this.camera.getPicture(options).then((imageData) => {
      this.myphoto = 'data:image/jpeg;base64,' + imageData;

      this.storageProvider.uploadToStorage(this.myphoto);

    }, (err) => {
      //error
    });
  }


  editar() {
    console.log("iti malia");
    //codigo para salvar
  }
  mostrar() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  escolhaprecisa() {
    console.log(this.precisaInstituicao);
  }


}
