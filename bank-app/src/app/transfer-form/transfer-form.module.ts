import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TransferFormComponent } from './transfer-form.component';
import { AngularIbanModule } from 'angular-iban';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AngularIbanModule,
    ReactiveFormsModule,
  ],
  declarations: [TransferFormComponent],
  exports: [TransferFormComponent],
})
export class TransferFormModule {}
