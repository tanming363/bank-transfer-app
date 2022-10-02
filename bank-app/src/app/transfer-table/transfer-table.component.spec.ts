import { ComponentFixture, TestBed } from '@angular/core/testing';
import { first } from 'rxjs';
import { ITransfer } from '../models/transfer.model';

import { TransferTableComponent } from './transfer-table.component';

describe('TransferTableComponent', () => {
  let component: TransferTableComponent;
  let fixture: ComponentFixture<TransferTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransferTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('testing removeListItem function to return value', () => {
    const mockdata: ITransfer = {
      id: '31267cd2-d8dc-4e26-b146-9fdeef1ea3af',
      accountHolder: 'Vrushali Ingole',
      iban: 'DE12500105170648489890',
      amount: 11,
      note: 'vruhshali',
      date: '2022-10-22',
    };
    component.transfer = mockdata;
    component.removeListItem.pipe(first()).subscribe((selectedTransfer) => {
      expect(selectedTransfer).toBe(mockdata.id);
    });
    component.onDelete(new MouseEvent('click') as any);
  });
});
