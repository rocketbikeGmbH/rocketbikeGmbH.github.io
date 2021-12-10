import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { Bestellungen } from '../bestellarticel';
import { options } from '../mengenplanung.component';
import { bestellArtikelArray } from '../BestellArtikelArray';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-mengenplanung',
  templateUrl: './bestellung.component.html',
})

export class Bestellung {
  options = options;
  ids = bestellArtikelArray.map(i => i.id);
  bestellung = this.formBuilder.group({
    menge: ['', {
      validators: [
        Validators.required,
        Validators.min(0)
      ],
      updateOn: 'blur'
    }],
    id: ['', {
      validators: [
        Validators.required,
      ],
      updateOn: 'blur'
    }],
    modus: ['', {
      validators: [
        Validators.required,
      ],
      updateOn: 'blur'
    }]
  });

  constructor(
    public dialogRef: MatDialogRef<Bestellung>,
    @Inject(MAT_DIALOG_DATA) public data: Bestellungen,
    private formBuilder: FormBuilder,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
