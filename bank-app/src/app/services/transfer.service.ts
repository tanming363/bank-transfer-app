import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { ITransfer } from '../models/transfer.model';

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  API_URL = environment.API_URL;

  isOpenSubject$ = new Subject<boolean>();
  isEditSubject$ = new Subject<boolean>();
  transferIDSubject$ = new Subject<string>();
  sortBySubject$ = new Subject<string>();
  fiterBySubject$ = new Subject<string>();

  constructor(private readonly http: HttpClient) {}

  getTransfers(): Observable<ITransfer[]> {
    return this.http.get<ITransfer[]>(this.API_URL).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  getTransfer(transferID: string): Observable<ITransfer> {
    return this.http.get<ITransfer>(`${this.API_URL}/${transferID}`).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  createTransfer(transfer: ITransfer): Observable<ITransfer> {
    return this.http.post<ITransfer>(this.API_URL, transfer).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  updateTransfer(id: string, transfer: ITransfer): Observable<ITransfer> {
    return this.http.put<ITransfer>(`${this.API_URL}/${id}`, transfer).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  deleteTransfer(transferID: string): Observable<ITransfer> {
    return this.http.delete<ITransfer>(`${this.API_URL}/${transferID}`).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  modelOpen(open: boolean) {
    this.isOpenSubject$.next(open);
  }

  transferID(id: string) {
    this.transferIDSubject$.next(id);
  }

  isEdit(edit: boolean) {
    this.isEditSubject$.next(edit);
  }

  sortList(value: string) {
    this.sortBySubject$.next(value);
  }

  fiterList(value: string) {
    this.fiterBySubject$.next(value);
  }
}
