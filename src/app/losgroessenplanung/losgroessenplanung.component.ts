import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SplitDialogOverview } from '../splitdialog/splitdialogoverview.component';

export interface LosgrossenElement {
  attr_article: number;
  attr_quantity: number;
  delbutton: boolean;
}

export interface SplitDialog {
  attr_name: string; //Gruppenname z. B. d1
  attr_splitquant: number;
}

let Element_Data: LosgrossenElement[] = [
  { attr_article: 13, attr_quantity: 210, delbutton: false },
  { attr_article: 14, attr_quantity: 140, delbutton: false },
  { attr_article: 15, attr_quantity: 100, delbutton: false },
  { attr_article: 18, attr_quantity: 200, delbutton: false },
  { attr_article: 19, attr_quantity: 150, delbutton: false },
  { attr_article: 20, attr_quantity: 100, delbutton: false },
  { attr_article: 7, attr_quantity: 200, delbutton: false },
  { attr_article: 8, attr_quantity: 150, delbutton: false },
  { attr_article: 9, attr_quantity: 100, delbutton: false },
  { attr_article: 49, attr_quantity: 200, delbutton: false },
  { attr_article: 54, attr_quantity: 150, delbutton: false },
  { attr_article: 29, attr_quantity: 100, delbutton: false },
  { attr_article: 4, attr_quantity: 200, delbutton: false },
  { attr_article: 5, attr_quantity: 150, delbutton: false },
  { attr_article: 6, attr_quantity: 100, delbutton: false },
  { attr_article: 10, attr_quantity: 200, delbutton: false },
  { attr_article: 11, attr_quantity: 150, delbutton: false },
  { attr_article: 12, attr_quantity: 100, delbutton: false },
  { attr_article: 17, attr_quantity: 450, delbutton: false },
  { attr_article: 16, attr_quantity: 460, delbutton: false },
  { attr_article: 50, attr_quantity: 200, delbutton: false },
  { attr_article: 55, attr_quantity: 150, delbutton: false },
  { attr_article: 30, attr_quantity: 100, delbutton: false },
  { attr_article: 51, attr_quantity: 200, delbutton: false },
  { attr_article: 56, attr_quantity: 150, delbutton: false },
  { attr_article: 31, attr_quantity: 100, delbutton: false },
  { attr_article: 26, attr_quantity: 449, delbutton: false },
  { attr_article: 1, attr_quantity: 200, delbutton: false },
  { attr_article: 2, attr_quantity: 150, delbutton: false },
  { attr_article: 3, attr_quantity: 100, delbutton: false },
];

@Component({
  selector: 'app-losgroessenplanung',
  templateUrl: './losgroessenplanung.component.html',
  styleUrls: ['./losgroessenplanung.component.scss'],
})
export class LosgroessenplanungComponent implements OnInit {
  attr_name!: string;
  attr_splitquant: number | undefined;

  @ViewChild('table')
  table!: MatTable<LosgrossenElement>;
  displayedColumns: string[] = [
    'Artikel',
    'Produktionsmenge',
    'Aufteilen',
    'Löschen',
  ];
  dataSource = Element_Data;

  constructor(public dialog: MatDialog) {}

  dropTable(event: CdkDragDrop<LosgrossenElement[]>) {
    const prevIndex = this.dataSource.findIndex((d) => d === event.item.data);
    moveItemInArray(this.dataSource, prevIndex, event.currentIndex);
    this.table.renderRows();
  }

  ngOnInit(): void {}

  // Loop if(article gibts mindestes 2 mal) -> dann Lösch-Button anzeigen
  openDialog(element: LosgrossenElement): void {
    const dialogRef = this.dialog.open(SplitDialogOverview, {
      width: '350px',
      data: {
        attr_name: this.attr_name,
        attr_splitquant: this.attr_splitquant,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.attr_splitquant = result;
        const article_attr = element.attr_article;
        let quant_attr = element.attr_quantity;
        const prod = this.dataSource.find(
          (d) => d.attr_article === article_attr
        );
        // @ts-ignore
        prod.attr_quantity = quant_attr - result;
        this.dataSource.push({
          attr_article: article_attr,
          attr_quantity: result,
          delbutton: true,
        });
        this.table.renderRows();
      }
    });
  }

  deletesplit(element: LosgrossenElement) {

    const index = this.dataSource.indexOf(element);
    if (index > -1) {
      const datasource = this.dataSource[index];
      const prod = this.dataSource.find(
        (d) => d.attr_article === datasource.attr_article
      );
      // @ts-ignore
      prod.attr_quantity += datasource.attr_quantity;
      this.dataSource.splice(index, 1);
      this.table.renderRows();

    }

  }
}
