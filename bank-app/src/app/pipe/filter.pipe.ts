import { Pipe, PipeTransform } from '@angular/core';
import { ITransfer } from '../models/transfer.model';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(transfers: ITransfer[] = [], filterString: string) {
    if (transfers.length === 0 || filterString === '') {
      return transfers;
    } else {
      return transfers.filter((transfer) => {
        return (
          transfer.accountHolder
            .toLowerCase()
            .includes(filterString.toLowerCase()) ||
          transfer.note.toLowerCase().includes(filterString.toLowerCase())
        );
      });
    }
  }
}
