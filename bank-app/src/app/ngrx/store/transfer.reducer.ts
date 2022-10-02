import { createReducer, on } from '@ngrx/store';
import { ITransfer } from 'src/app/models/transfer.model';
import {
  deleteTransferAPISuccess,
  saveTransferAPISuccess,
  transferFetchAPISuccess,
  updateTransferAPISuccess,
} from './transfer.action';

export const initialState: ReadonlyArray<ITransfer> = [];

export const transferReducer = createReducer(
  initialState,
  on(transferFetchAPISuccess, (state, { allTransfers }) => {
    return allTransfers;
  }),
  on(saveTransferAPISuccess, (state, { transfer }) => {
    let newState = [...state];
    newState.push(transfer);
    return newState;
  }),
  on(updateTransferAPISuccess, (state, { transfer }) => {
    let newState = state.filter((_) => _.id !== transfer.id);

    newState.push(transfer);
    console.log(newState);
    return newState;
  }),
  on(deleteTransferAPISuccess, (state, { id }) => {
    let newState = state.filter((_) => _.id !== id);
    return newState;
  })
);
