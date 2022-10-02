import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { select, Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';
import { ITransfer } from '../models/transfer.model';
import {
  invokeDeleteTransferAPI,
  invokeSaveTransferAPI,
  invokeTransferAPI,
  invokeUpdateTransferAPI,
} from '../ngrx/store/transfer.action';

import { selectTransfers } from '../ngrx/store/transfer.selector';
import { TransferService } from '../services/transfer.service';

@Component({
  selector: 'transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
})
export class TransferComponent implements OnInit {
  isModalOpen: boolean = false;
  isEdit: boolean = false;
  id!: string;
  editData!: ITransfer;
  subscription!: Subscription;
  filterString: string = '';
  sortDirection: any;

  transfers$ = this.store.pipe(select(selectTransfers));

  sortFields = [
    {
      name: 'Date',
    },
    {
      name: 'Amount',
    },
  ];

  constructor(
    private transferService: TransferService,
    private alertController: AlertController,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.transferService.isEditSubject$.subscribe((res) => {
      this.isEdit = res;
    });
    this.store.dispatch(invokeTransferAPI());
  }

  async onDelete(id: string) {
    const alert = await this.alertController.create({
      header: 'Are you sure?',
      message: 'Do you want to delete this transfer',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete',
          handler: () => {
            this.store.dispatch(invokeDeleteTransferAPI({ id: id }));
          },
        },
      ],
    });
    await alert.present();
  }

  updateForm(data: ITransfer) {
    this.store.dispatch(invokeUpdateTransferAPI({ transfer: { ...data } }));
    setTimeout(() => {
      this.isModalOpen = false;
    });
  }

  onEdit(data: ITransfer) {
    this.id = data.id;
    this.isModalOpen = true;
    this.transferService.modelOpen(this.isModalOpen);
    this.isEdit = true;
  }

  submitForm(data: ITransfer) {
    if (this.isEdit) {
      data.id = this.id;
      this.updateForm(data);
      this.isEdit = false;
    } else {
      this.store.dispatch(invokeSaveTransferAPI({ transfer: { ...data } }));
    }
    this.store.dispatch(invokeTransferAPI());
  }

  openFormModel() {
    this.isModalOpen = true;
    this.transferService.modelOpen(this.isModalOpen);
  }

  onSort(ev: any) {
    let value = ev.target.value;
    this.sortDirection = value;
  }

  handleChange(event: any) {
    const query = event.target.value;
    this.filterString = query;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
