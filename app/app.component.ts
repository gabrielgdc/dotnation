import { AdmRelatorioPage } from './../pages/adm-relatorio/adm-relatorio';

import { PerfilPage } from './../pages/perfil/perfil';
import { CadEscolherPage } from './../pages/cad-escolher/cad-escolher';
import { LoginPage } from './../pages/login/login';
import { InicioPage } from './../pages/inicio/inicio';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AngularFireAuth } from '../../node_modules/angularfire2/auth';
import { LoginProvider } from '../providers/login/login';
import { TabsPage } from '../pages/tabs/tabs';

import {timer} from 'rxjs/observable/timer';


export interface PageInterface{
    title: string;
    pageName: string;
    component?:any;
    index?:number;
    icon:string;
    method?:any;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage:any = TabsPage;

  showSplash = true;
  nome:string;

  pages: PageInterface[] = [
    {title: 'Home', pageName: 'HomePage', method: 'openPage', component: HomePage, index: 0, icon: 'md-home'},
    {title: 'Cadastro', pageName: 'CadastroPage', method: 'openPage', component: CadEscolherPage, index: 2, icon: 'md-contact'},
    {title: 'Meu Perfil', pageName: 'PerfilPage', method: 'openPage', component: PerfilPage, index: 1, icon: 'person'},
    {title: 'Login', pageName: 'LoginPage', method: 'openPage', component: LoginPage, icon: 'log-in'},
    {title: 'Administrador', pageName: 'AdminPage', method: 'openPage', component: AdmRelatorioPage, index: 3, icon: 'md-construct'},
    {title: 'Sair', pageName: 'SairPage', method: 'signOut', icon: 'exit'}
  ];

  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public afAuth: AngularFireAuth, 
    public loginProvider: LoginProvider) {

    this.initializeApp();
    

     const authObserver = afAuth.authState.subscribe(credentials => {
       if(credentials){
         this.rootPage = TabsPage;
         authObserver.unsubscribe();
       }else {
         this.rootPage = InicioPage;
         authObserver.unsubscribe();
       }
     })

  }


  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      timer(2000).subscribe(() => this.showSplash = false)
    });
  }

  openPage(component: PageInterface) {
    // let params = {};

    // if(page.index){
    //   params = {tabIndex: page.index}
    // }

    // if(this.nav.getActiveChildNav() && page.index != undefined){
    //   this.nav.getActiveChildNav().select(page.index);
    // } else {
    //   this.nav.setRoot(page.component, params);
    // }
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(component);
  }

  signOut(){
    this.loginProvider.signOut()
    .then(() => {
      this.nav.setRoot(InicioPage);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  onAction(method, component: any){
    //console.log(component);
    if(method == "openPage"){
      this.openPage(component);
    } else if(method == "signOut") {
      this.signOut();
    }
  }
  
}

