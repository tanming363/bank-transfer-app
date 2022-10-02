import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TransferService } from '../services/transfer.service';
import { ValidatorService } from 'angular-iban';
import { ITransfer } from '../models/transfer.model';

@Component({
  selector: 'transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.scss'],
})
export class TransferFormComponent implements OnInit {
  isModalOpen = false;
  isEdit = false;
  transferFormGroup!: FormGroup;

  @Output() transferFormObj: EventEmitter<ITransfer> =
    new EventEmitter<ITransfer>();
  tranferID!: string;

  constructor(
    private transferService: TransferService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.transferService.isOpenSubject$.subscribe((res) => {
      this.isModalOpen = res;
    });
    this.transferService.isEditSubject$.subscribe((res) => {
      this.isEdit = res;
    });
    this.transferService.transferIDSubject$.subscribe((transferid) => {
      this.transferService.getTransfer(transferid).subscribe((res) => {
        this.getTransferForm['accountHolder'].setValue(res.accountHolder);
        this.getTransferForm['iban'].setValue(res.iban);
        this.getTransferForm['date'].setValue(res.date);
        this.getTransferForm['amount'].setValue(res.amount);
        this.getTransferForm['note'].setValue(res.note);
      });
    });
    this.transferForm();
  }

  germanDateFormat(date: string) {
    const d = new Date(date);
    return d.toLocaleDateString('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }

  transferForm() {
    this.transferFormGroup = this.fb.group({
      accountHolder: ['', Validators.required],
      iban: new FormControl('', [
        Validators.required,
        ValidatorService.validateIban,
      ]),
      date: new FormControl('', [Validators.required]),
      amount: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(2),
        Validators.maxLength(8),
      ]),
      note: [''],
    });
  }

  get getTransferForm() {
    return this.transferFormGroup.controls;
  }

  onSubmitFormGroup() {
    const data = this.transferFormGroup.value;
    if (this.transferFormGroup.valid) {
      this.transferFormObj.emit(data);
    }
    this.resetForm();
    this.closeModel(false);
  }

  resetForm() {
    this.transferFormGroup.reset();
  }

  closeModel(isOpen: boolean) {
    this.resetForm();
    this.isModalOpen = isOpen;
    this.transferService.modelOpen(this.isModalOpen);
    this.isEdit = false;
  }
}
