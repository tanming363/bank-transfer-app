import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DATE_PIPE_DEFAULT_TIMEZONE } from '@angular/common';
import { TransferComponent } from './transfer.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import { TransferTableModule } from '../transfer-table/transfer-table.module';
import { TransferFormModule } from '../transfer-form/transfer-form.module';
import { TransferModalModule } from '../transfer-modal/transfer-modal.module';
import { FilterPipe } from '../pipe/filter.pipe';
import { SortPipe } from '../pipe/sort.pipe';

registerLocaleData(localeDe, 'de-DE', localeDeExtra);

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    HttpClientModule,
    TransferTableModule,
    TransferFormModule,
    TransferModalModule,
  ],
  declarations: [TransferComponent, FilterPipe, SortPipe],
  providers: [
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'EUR',
    },
    {
      provide: LOCALE_ID,
      useValue: 'de-DE',
    },
    {
      provide: DATE_PIPE_DEFAULT_TIMEZONE,
      useValue: 'dd/MM/y',
    },
  ],
  exports: [TransferComponent],
})
export class TransferModule {}
