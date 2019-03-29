import { AdmDoacaoPage } from './../pages/adm-doacao/adm-doacao';
import { AdmMotoristaPage } from './../pages/adm-motorista/adm-motorista';
import { PerfilPage } from './../pages/perfil/perfil';
import { AdmDoadorPage } from './../pages/adm-doador/adm-doador';
import { AdmEmpresaPage } from './../pages/adm-empresa/adm-empresa';
import { AdmInstituicaoPage } from './../pages/adm-instituicao/adm-instituicao';
import { AdmRelatorioPage } from './../pages/adm-relatorio/adm-relatorio';

import { InicioPage } from './../pages/inicio/inicio';
import { CadInstituicaoPage } from './../pages/cad-instituicao/cad-instituicao';
import { CadEscolherPage } from './../pages/cad-escolher/cad-escolher';
import { CadDoadorPage } from './../pages/cad-doador/cad-doador';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpModule } from '@angular/http'; 
import { HttpClientModule } from '@angular/common/http';

import { BrMaskerModule } from 'brmasker-ionic-3';//MASCARA

//Firebase Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { Camera } from '@ionic-native/camera';//CAMERA
import { ChartsModule } from 'ng2-charts'; // grafico


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { DoadorProvider } from '../providers/doador/doador';
import { InstituicaoProvider } from '../providers/instituicao/instituicao';
import { EmpresaProvider } from '../providers/empresa/empresa';
import { LoginProvider } from '../providers/login/login';
import { CadMotoristaPage } from '../pages/cad-motorista/cad-motorista';
import { MotoristaProvider } from '../providers/motorista/motorista';
import { TabsPage } from '../pages/tabs/tabs';
import { DetalhesPage } from '../pages/detalhes/detalhes';
import { DoarPage } from '../pages/doar/doar';
import { ViacepProvider } from '../providers/viacep/viacep';
import { CnpjvalidacaoProvider } from '../providers/cnpjvalidacao/cnpjvalidacao';
import { StoragedataProvider } from '../providers/storagedata/storagedata';
import { DoacaoProvider } from '../providers/doacao/doacao';

export const firebaseconfig = {
  apiKey: "AIzaSyBSvRpORf2jlKhHZWQ4qjtk6MCukXIJST8",
  authDomain: "dotnation-dc232.firebaseapp.com",
  databaseURL: "https://dotnation-dc232.firebaseio.com",
  projectId: "dotnation-dc232",
  storageBucket: "dotnation-dc232.appspot.com",
  messagingSenderId: "133676203138"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    CadDoadorPage,
    CadEscolherPage,
    CadInstituicaoPage,
    InicioPage,
    AdmRelatorioPage,
    AdmInstituicaoPage,
    AdmEmpresaPage,
    AdmDoadorPage,
    PerfilPage,
    CadMotoristaPage,
    TabsPage,
    DetalhesPage,
    DoarPage,
    AdmMotoristaPage,
    AdmDoacaoPage
    

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrMaskerModule,//MASCARA
    HttpModule,
    ChartsModule, //grafico
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseconfig, 'app_teste'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CadEscolherPage,
    CadDoadorPage,
    CadInstituicaoPage,
    InicioPage,
    AdmRelatorioPage,
    AdmInstituicaoPage,
    AdmEmpresaPage,
    AdmDoadorPage,
    PerfilPage,
    CadMotoristaPage,
    TabsPage,
    DetalhesPage,
    DoarPage,
    AdmMotoristaPage,
    AdmDoacaoPage
    

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuthModule,
    DoadorProvider,
    InstituicaoProvider,
    EmpresaProvider,
    DoadorProvider,
    LoginProvider,
    MotoristaProvider,
    Camera,
    ViacepProvider,
    CnpjvalidacaoProvider,
    StoragedataProvider,
    DoacaoProvider
  ]
})
export class AppModule {}
