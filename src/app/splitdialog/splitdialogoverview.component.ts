import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SplitDialog } from '../losgroessenplanung/losgroessenplanung.component';
import {
  AbstractControl,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-losgroessenplanung',
  templateUrl: './splitdialogoverview.component.html',
  styleUrls: ['./splitdialogoverview.component.scss'],
})
export class SplitDialogOverview implements OnInit {

  split = this.formBuilder.group({
    splitquant: [
      '',
      {
        validators: [
          Validators.required,
          Validators.min(0),
          this.splitQuantValidator,
        ],
        updateOn: 'blur',
      },
    ],
  });


  splitQuantValidator(
    currentControl: AbstractControl
  ): { [key: string]: boolean } | null {
    if (
      currentControl.value % 10 !== 0
    ) {
      return {splitquant: true};
    }
      return null;
    }

  constructor(
    public dialogRef: MatDialogRef<SplitDialogOverview>,
    @Inject(MAT_DIALOG_DATA) public data: SplitDialog,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
