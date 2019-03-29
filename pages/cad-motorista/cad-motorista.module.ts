import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadMotoristaPage } from './cad-motorista';

@NgModule({
  declarations: [
    CadMotoristaPage,
  ],
  imports: [
    IonicPageModule.forChild(CadMotoristaPage),
  ],
})
export class CadMotoristaPageModule {}
