import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferModalComponent } from './transfer-modal.component';
import { TransferFormModule } from '../transfer-form/transfer-form.module';

@NgModule({
  imports: [CommonModule, TransferFormModule],
  declarations: [TransferModalComponent],
  exports: [TransferModalComponent],
})
export class TransferModalModule {}
