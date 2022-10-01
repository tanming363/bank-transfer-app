import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { TransferTableComponent } from './transfer-table.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HttpClientModule],
  declarations: [TransferTableComponent],
  exports: [TransferTableComponent],
})
export class TransferTableModule {}
