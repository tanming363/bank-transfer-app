import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ITransfer } from '../models/transfer.model';

import { TransferService } from './transfer.service';

describe('TransferService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: TransferService;

  const mockdata: ITransfer[] = [
    {
      id: '31267cd2-d8dc-4e26-b146-9fdeef1ea3af',
      accountHolder: 'Vrushali Ingole',
      iban: 'DE12500105170648489890',
      amount: 11,
      note: 'vruhshali',
      date: '2022-10-22',
    },
    {
      id: '27ed997c-aa36-419c-a5f0-a0e3a3d1ec60',
      accountHolder: 'Tanmay Ingole',
      iban: 'DE12500105170648489890',
      amount: 13,
      note: 'tanmay',
      date: '2022-10-22',
    },
    {
      id: 'dcf38f07-d585-4e61-a5ec-00e1ccb7fba8',
      accountHolder: 'Kavya Ingole',
      iban: 'DE12500105170648489890',
      amount: 12,
      note: 'Kavya ',
      date: '2022-10-25',
    },
    {
      id: 'a15264c0-96e5-4454-9443-b3e7233f8641',
      accountHolder: 'Vikram Ingole',
      iban: 'DE12500105170648489890',
      amount: 77,
      note: 'vikram',
      date: '2022-11-06',
    },
  ];

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({});
    service = new TransferService(httpClientSpy);
  });

  describe('getTransfers()', () => {
    it('should return expected transfers when getTranafers is called', () => {
      httpClientSpy.get.and.returnValue(of(mockdata));
      service.getTransfers().subscribe({
        next: (transfers) => {
          expect(transfers).toEqual(mockdata);
        },
        error: () => {},
      });
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    });
  });
});
