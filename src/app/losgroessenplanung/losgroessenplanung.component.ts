import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SplitDialogOverview } from '../splitdialog/splitdialogoverview.component';
import { StepperServiceService } from '../stepper-service.service';
import { Production, Productionlist } from '../model/export.model';
import { select, Store } from '@ngrx/store';
import { ExportState } from '../store/export/export.reducer';
import { addProductionlist } from '../store/export/export.actions';
import { Router } from '@angular/router';
import { selectProductionlist } from '../store/export/export.selector';
import { browserRefresh } from '../app.component';
import {InfobuttonLosgrossenplanungComponent} from "../infobutton-losgrossenplanung/infobutton-losgrossenplanung.component";

class Prodlist implements Production {
  attr_article: number;
  attr_quantity: number;

  constructor(attr_article: number, attr_quantity: number) {
    this.attr_article = attr_article;
    this.attr_quantity = attr_quantity;
  }
}

export interface LosgrossenElement {
  attr_article: number;
  attr_quantity: number;
  delbutton: boolean;
  splitbutton: boolean;
}

export interface SplitDialog {
  attr_splitquant: number;
}

let Element_Data: LosgrossenElement[] = [
  { attr_article: 13, attr_quantity: 0, delbutton: false, splitbutton: true},
  { attr_article: 14, attr_quantity: 0, delbutton: false, splitbutton: true },
  { attr_article: 15, attr_quantity: 0, delbutton: false, splitbutton: true },
  { attr_article: 18, attr_quantity: 0, delbutton: false, splitbutton: true },
  { attr_article: 19, attr_quantity: 0, delbutton: false, splitbutton: true },
  { attr_article: 20, attr_quantity: 0, delbutton: false, splitbutton: true },
  { attr_article: 7, attr_quantity: 0, delbutton: false, splitbutton: true },
  { attr_article: 8, attr_quantity: 0, delbutton: false, splitbutton: true },
  { attr_article: 9, attr_quantity: 0, delbutton: false, splitbutton: true},
  { attr_article: 49, attr_quantity: 0, delbutton: false, splitbutton: true },
  { attr_article: 54, attr_quantity: 0, delbutton: false, splitbutton: true },
  { attr_article: 29, attr_quantity: 0, delbutton: false, splitbutton: true },
  { attr_article: 4, attr_quantity: 0, delbutton: false, splitbutton: true },
  { attr_article: 5, attr_quantity: 0, delbutton: false, splitbutton: true },
  { attr_article: 6, attr_quantity: 0, delbutton: false, splitbutton: true },
  { attr_article: 10, attr_quantity: 0, delbutton: false, splitbutton: true },
  { attr_article: 11, attr_quantity: 0, delbutton: false, splitbutton: true },
  { attr_article: 12, attr_quantity: 0, delbutton: false, splitbutton: true },
  { attr_article: 17, attr_quantity: 0, delbutton: false, splitbutton: true },
  { attr_article: 16, attr_quantity: 0, delbutton: false, splitbutton: true },
  { attr_article: 50, attr_quantity: 0, delbutton: false, splitbutton: true },
  { attr_article: 55, attr_quantity: 0, delbutton: false, splitbutton: true },
  { attr_article: 30, attr_quantity: 0, delbutton: false, splitbutton: true },
  { attr_article: 51, attr_quantity: 0, delbutton: false, splitbutton: true },
  { attr_article: 56, attr_quantity: 0, delbutton: false, splitbutton: true },
  { attr_article: 31, attr_quantity: 0, delbutton: false, splitbutton: true },
  { attr_article: 26, attr_quantity: 9, delbutton: false, splitbutton: true },
  { attr_article: 1, attr_quantity: 0, delbutton: false, splitbutton: true },
  { attr_article: 2, attr_quantity: 0, delbutton: false, splitbutton: true },
  { attr_article: 3, attr_quantity: 0, delbutton: false, splitbutton: true },
];

@Component({
  selector: 'app-losgroessenplanung',
  templateUrl: './losgroessenplanung.component.html',
  styleUrls: ['./losgroessenplanung.component.scss'],
})
export class LosgroessenplanungComponent implements OnInit {
  attr_name!: string;
  attr_splitquant: number | undefined;
  type = 'losgroessenplanung';
  productionlist$ = this.exportStore.pipe(select(selectProductionlist));

  productionlist: Production[] = [];
  @ViewChild('table')
  table!: MatTable<LosgrossenElement>;
  displayedColumns: string[] = [
    'Artikel',
    'Produktionsmenge',
    'Aufteilen',
    'Löschen',
  ];
  dataSource = Element_Data;

  constructor(
    public dialog: MatDialog,
    private stepperservice: StepperServiceService,
    private exportStore: Store<ExportState>,
    private router: Router
  ) {}

  dropTable(event: CdkDragDrop<LosgrossenElement[]>) {
    const prevIndex = this.dataSource.findIndex((d) => d === event.item.data);
    moveItemInArray(this.dataSource, prevIndex, event.currentIndex);
    this.table.renderRows();
  }
  ngOnInit(): void {
    console.log('refreshed?:', browserRefresh);
    if (browserRefresh) {
      this.router.navigate(['/dateiimport'])
    }

    this.productionlist$.subscribe((i) => (this.productionlist = i));
    this.productionlist.forEach((i) =>
      this.dataSource.forEach((d) => {
        if (d.attr_article == i.attr_article) {
          d.attr_quantity = i.attr_quantity;
        }
      })
    );
  }

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
        if (result <= quant_attr){
          // @ts-ignore
          prod.attr_quantity = quant_attr - result;

          this.dataSource.push({
            attr_article: article_attr,
            attr_quantity: result,
            delbutton: true,
            splitbutton: false,
          });
          this.table.renderRows();
        }

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

  // Von Jan wegen dem Stepper
  speichern() {
    this.stepperservice.set_dateiimport(this.type);

    const productionlist: Array<Production> = [];

    this.dataSource.forEach((d) => {
      const production = new Prodlist(d.attr_article, d.attr_quantity);
    if (d.attr_quantity !== 0) {
      productionlist.push(production);
    }
    });
    const prodlist: Productionlist = { production: productionlist };
    this.exportStore.dispatch(addProductionlist({ productionlist: prodlist }));
    this.router.navigate(['dateiexport']);
  }

  openInfoDialog() {
    this.dialog.open(InfobuttonLosgrossenplanungComponent);
  }
}
