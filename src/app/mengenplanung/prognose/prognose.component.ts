import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { Forecast, options } from '../mengenplanung.component';
@Component({
  selector: 'app-mengenplanung',
  templateUrl: './prognose.component.html',
})

export class Prognose {
  options = options;
  constructor(
    public dialogRef: MatDialogRef<Prognose>,
    @Inject(MAT_DIALOG_DATA) public data: Forecast,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
