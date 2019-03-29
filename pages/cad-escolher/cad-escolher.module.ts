import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadEscolherPage } from './cad-escolher';

@NgModule({
  declarations: [
    CadEscolherPage,
  ],
  imports: [
    IonicPageModule.forChild(CadEscolherPage),
  ],
})
export class CadEscolherPageModule {}
