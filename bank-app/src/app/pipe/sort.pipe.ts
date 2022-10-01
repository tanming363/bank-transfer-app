import { Pipe, PipeTransform } from '@angular/core';
import { ITransfer } from '../models/transfer.model';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(transfers: ITransfer[] = [], args: any): any {
    let sortDirection = args;
    if (
      transfers.length === 0 ||
      sortDirection === '' ||
      sortDirection === undefined
    ) {
      return transfers;
    }
    if (sortDirection.includes('Amount')) {
      return transfers.sort((a, b) => a.amount - b.amount);
    }
    if (sortDirection.includes('Date')) {
      return transfers.sort((a, b) => {
        let datessA: any = a.date;
        let datessB: any = b.date;
        datessA = datessA.toString().split('.').reverse().join('-');
        datessB = datessB.toString().split('.').reverse().join('-');
        let d1 = new Date(datessA) as any;
        let d2 = new Date(datessB) as any;
        return d1 - d2;
      });
    }
  }
}
