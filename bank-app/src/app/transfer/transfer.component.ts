import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ITransfer } from '../models/transfer.model';
import { TransferService } from '../services/transfer.service';

@Component({
  selector: 'transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
})
export class TransferComponent implements OnInit {
  isModalOpen: boolean = false;
  isEdit: boolean = false;
  transfers!: ITransfer[];
  id!: string;
  editData!: ITransfer;
  subscription!: Subscription;
  filterString: string = '';
  sortDirection: any;

  transfersSort = [
    {
      name: 'Date',
    },
    {
      name: 'Amount',
    },
  ];

  constructor(
    private transferService: TransferService,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
    this.transferService.isEditSubject$.subscribe((res) => {
      this.isEdit = res;
    });
    this.getAllTransfer();
  }

  getAllTransfer() {
    this.subscription = this.transferService.getTransfers().subscribe((res) => {
      this.transfers = res;
    });
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
            this.transferService.deleteTransfer(id).subscribe();
            this.getAllTransfer();
          },
        },
      ],
    });
    await alert.present();
  }

  updateForm(data: ITransfer) {
    this.transferService.updateTransfer(this.id, data).subscribe({
      next: () => (this.isModalOpen = false),
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    });
  }

  onEdit(data: ITransfer) {
    this.id = data.id;
    this.isModalOpen = true;
    this.transferService.modelOpen(this.isModalOpen);
    this.updateForm(data);
  }

  submitForm(data: ITransfer) {
    if (this.isEdit && !this.isModalOpen) {
      this.updateForm(data);
    } else {
      this.transferService.createTransfer(data).subscribe();
    }
    this.getAllTransfer();
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
