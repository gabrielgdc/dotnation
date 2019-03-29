import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Tabs } from 'ionic-angular';
import { HomePage } from '../home/home';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { CadEscolherPage } from '../cad-escolher/cad-escolher';

/**
 * Generated class for the TabsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1 = HomePage;
  tab2 = CadEscolherPage;
  tab3 = '';
  tab4 = '';
  myIndex: Number;

  @ViewChild('primaryTabs') primaryTabs: Tabs


  constructor(public navCtrl: NavController, public navParams : NavParams) {
    this.myIndex = navParams.data.tabIndex || 0;
    
  }

}
