import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, map, switchMap, withLatestFrom } from 'rxjs';
import { TransferService } from 'src/app/services/transfer.service';
import {
  deleteTransferAPISuccess,
  invokeDeleteTransferAPI,
  invokeSaveTransferAPI,
  invokeTransferAPI,
  invokeUpdateTransferAPI,
  saveTransferAPISuccess,
  transferFetchAPISuccess,
  updateTransferAPISuccess,
} from './transfer.action';
import { selectTransfers } from './transfer.selector';

@Injectable()
export class TransferEffects {
  constructor(
    private actions$: Actions,
    private transferService: TransferService,
    private store: Store
  ) {}

  loadAllTransfers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeTransferAPI),
      withLatestFrom(this.store.pipe(select(selectTransfers))),
      switchMap(([, transferFromStore]) => {
        if (transferFromStore.length > 0) {
          return EMPTY;
        }
        return this.transferService
          .getTransfers()
          .pipe(map((data) => transferFetchAPISuccess({ allTransfers: data })));
      })
    )
  );

  saveNewTransfer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeSaveTransferAPI),
      switchMap((action) => {
        return this.transferService
          .createTransfer(action.transfer)
          .pipe(map((data) => saveTransferAPISuccess({ transfer: data })));
      })
    )
  );

  updateTransfer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeUpdateTransferAPI),
      switchMap((action) => {
        return this.transferService
          .updateTransfer(action.transfer)
          .pipe(map((data) => updateTransferAPISuccess({ transfer: data })));
      })
    )
  );

  deleteTransfer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeDeleteTransferAPI),
      switchMap((action) => {
        return this.transferService
          .deleteTransfer(action.id)
          .pipe(map((data) => deleteTransferAPISuccess({ id: action.id })));
      })
    )
  );
}
