import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdmEmpresaPage } from './adm-empresa';

@NgModule({
  declarations: [
    AdmEmpresaPage,
  ],
  imports: [
    IonicPageModule.forChild(AdmEmpresaPage),
  ],
})
export class AdmEmpresaPageModule {}
