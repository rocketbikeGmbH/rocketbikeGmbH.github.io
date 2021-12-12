import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SplitDialog} from "../losgroessenplanung/losgroessenplanung.component";

@Component({
  selector: 'app-losgroessenplanung',
  templateUrl: './splitdialogoverview.component.html',
})

export class SplitDialogOverview {
  constructor(
    public dialogRef: MatDialogRef<SplitDialogOverview>,
    @Inject(MAT_DIALOG_DATA) public data: SplitDialog,
  ) {}



  onNoClick(): void {
    this.dialogRef.close()
  }

  

}
