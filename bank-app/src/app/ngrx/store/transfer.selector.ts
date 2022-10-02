import { createFeatureSelector } from '@ngrx/store';
import { ITransfer } from 'src/app/models/transfer.model';

export const selectTransfers =
  createFeatureSelector<ITransfer[]>('mytransfers');

export const selectTransferByID =
  createFeatureSelector<ITransfer>('mytransfers');
