import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { Forecast, options } from '../mengenplanung.component';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-mengenplanung',
  templateUrl: './prognose.component.html',
})

export class Prognose {
  options = options;
  prognose = this.formBuilder.group({
    menge: ['', {
      validators: [
        Validators.required,
        Validators.min(0)
      ],
      updateOn: 'blur'
    }]
  });

  constructor(
    public dialogRef: MatDialogRef<Prognose>,
    @Inject(MAT_DIALOG_DATA) public data: Forecast,
    private formBuilder: FormBuilder,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
