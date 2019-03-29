import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadDoadorPage } from './cad-doador';

@NgModule({
  declarations: [
    CadDoadorPage,
  ],
  imports: [
    IonicPageModule.forChild(CadDoadorPage),
  ],
})
export class CadDoadorPageModule {}
