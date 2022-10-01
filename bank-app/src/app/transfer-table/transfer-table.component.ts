import {
  Component,
  Input,
  ViewEncapsulation,
  EventEmitter,
  Output,
  OnInit,
} from '@angular/core';
import { ITransfer } from '../models/transfer.model';
import { TransferService } from '../services/transfer.service';

@Component({
  selector: 'transfer-table',
  templateUrl: './transfer-table.component.html',
  styleUrls: ['./transfer-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TransferTableComponent implements OnInit {
  @Input() transfer!: ITransfer;
  @Output() removeListItem: EventEmitter<string> = new EventEmitter<string>();
  @Output() editListItem: EventEmitter<ITransfer> =
    new EventEmitter<ITransfer>();

  constructor(private readonly transferService: TransferService) {}

  ngOnInit(): void {}

  onEdit(data: ITransfer) {
    this.transferService.transferID(data.id);
    this.transferService.isEdit(true);
    this.editListItem.emit(data);
  }

  onDelete(id: string) {
    this.removeListItem.emit(id);
  }
}
