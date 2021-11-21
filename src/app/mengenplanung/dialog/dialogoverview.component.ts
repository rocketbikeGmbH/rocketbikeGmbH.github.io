import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { Bestellungen } from '../bestellarticel';
import { options } from '../mengenplanung.component';
import { bestellArtikelArray } from '../BestellArtikelArray';

@Component({
  selector: 'app-mengenplanung',
  templateUrl: './dialogoverview.component.html',
})

export class DialogOverview {
  options = options;
  ids = bestellArtikelArray.map(i => i.id);
  constructor(
    public dialogRef: MatDialogRef<DialogOverview>,
    @Inject(MAT_DIALOG_DATA) public data: Bestellungen,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
