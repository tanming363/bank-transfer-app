import { createAction, props } from '@ngrx/store';
import { ITransfer } from 'src/app/models/transfer.model';

export class TransferAction {}

export const invokeTransferAPI = createAction(
  '[Transfer API] invoke Transfer Fetch API'
);

export const transferFetchAPISuccess = createAction(
  '[Transfer API] TRANSFER FETCH API success',
  props<{ allTransfers: ITransfer[] }>()
);

export const invokeSaveTransferAPI = createAction(
  '[Transfer API] INVOKE SAVE TRANSFER API',
  props<{ transfer: ITransfer }>()
);

export const saveTransferAPISuccess = createAction(
  '[Transfer API] SAVE TRANSFER API success',
  props<{ transfer: ITransfer }>()
);

export const invokeUpdateTransferAPI = createAction(
  '[Transfer API] UPDATE TRANSFER API',
  props<{ transfer: ITransfer }>()
);

export const updateTransferAPISuccess = createAction(
  '[Transfer API] UPDATE TRANSFER API success',
  props<{ transfer: ITransfer }>()
);

export const invokeDeleteTransferAPI = createAction(
  '[Transfer API] DELETE TRANSFER API',
  props<{ id: string }>()
);

export const deleteTransferAPISuccess = createAction(
  '[Transfer API] DELETE TRANSFER API success',
  props<{ id: string }>()
);
