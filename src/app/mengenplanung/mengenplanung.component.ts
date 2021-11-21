import { Component, OnInit, ViewChild } from '@angular/core';
import { ImportState } from '../store/import/import.reducer';
import { ExportState } from '../store/export/export.reducer';
import { select, Store } from '@ngrx/store';
import {
  selectImportArticle,
  selectImportForecast,
  selectImportFutureInwardstockmovementOrder,
  selectImportInwardstockmovementOrder,
} from '../store/import/import.selector';
import {
  article,
  forecast,
  futureinwardstockmovementorder,
  inwardstockmovementorder,
} from '../model/import.model';
import { BestellArtikel, Bestellungen } from './bestellarticel';
import { bestellArtikelArray } from './BestellArtikelArray';
import { Order, Orderlist } from '../model/export.model';
import { addOrderlist } from '../store/export/export.actions';
import { Router } from '@angular/router';
import { MatTable } from '@angular/material/table';
import { LosgrossenElement } from '../losgroessenplanung/losgroessenplanung.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverview } from './dialog/dialogoverview.component';

class OrderImpl implements Order {
  attr_article: number;
  attr_quantity: number;
  attr_modus: number;

  constructor(attr_article: number, attr_quantity: number, attr_modus: number) {
    this.attr_article = attr_article;
    this.attr_quantity = attr_quantity;
    this.attr_modus = attr_modus;
  }
}
export const options: Array<string> = ['Normal', 'Eil', 'Sonderbestellung'];

@Component({
  selector: 'app-mengenplanung',
  templateUrl: './mengenplanung.component.html',
  styleUrls: ['./mengenplanung.component.scss'],
})
export class MengenplanungComponent implements OnInit {
  dataSource: Array<BestellArtikel> = bestellArtikelArray;
  dataSource2: Array<Bestellungen> = [];
  options = options;
  optionsMap = new Map([
    ['Normal', 5],
    ['Eil', 4],
    ['Sonderbestellung', 1],
  ]);
  displayedColumns = [
    'artikelnr',
    'lieferfrist',
    'abweichung',
    'verwendung',
    'diskont',
    'anfangsbestand',
    'eintreffendeBestellung',
    'offeneBestellung',
    'bruttobedarf',
    'bestellpunkt',
  ];
  displayedColumns2 = ['artikelnr', 'menge', 'modus', 'loeschen'];
  _articles: Array<article> | undefined;
  articles$ = this.importStore
    .pipe(select(selectImportArticle))
    .subscribe((i) => (this._articles = i));

  _orders: Array<inwardstockmovementorder> | undefined;
  orders$ = this.importStore
    .pipe(select(selectImportInwardstockmovementOrder))
    .subscribe((i) => (this._orders = i));

  _futureorders: Array<futureinwardstockmovementorder> | undefined;
  futureorders$ = this.importStore
    .pipe(select(selectImportFutureInwardstockmovementOrder))
    .subscribe((i) => (this._futureorders = i));

  _forecast: forecast | undefined;
  forecast$ = this.importStore
    .pipe(select(selectImportForecast))
    .subscribe((i) => (this._forecast = i));

  @ViewChild('table')
  table!: MatTable<LosgrossenElement>;

  constructor(
    private importStore: Store<ImportState>,
    private exportStore: Store<ExportState>,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.dataSource.forEach((d) => {
      const article = this._articles?.find((article) => article.id == d.id);
      d.anfangsbestand = article?.amount;
      // überprüfen ob es ein Array ist
      const order = this._orders?.find((o) => o.article == d.id);

      if (order) {
        d.eintreffendeBestellung = new Bestellungen(
          order?.amount,
          order?.orderperiod,
          ''
        );
      }

      // überprüfen ob es ein Array ist
      const futureOrder = this._futureorders?.find((fo) => fo.article == d.id);
      if (futureOrder) {
        d.offeneBestellung = futureOrder?.amount;
      }

      const { p1, p2, p3 } = this._forecast ?? {};
      d.bruttobedarf =
        d.verwendung.p1 * (p1 ?? 0) +
        d.verwendung.p2 * (p2 ?? 0) +
        d.verwendung.p3 * (p3 ?? 0);

      d.bestellpunkt = round(
        (d.bruttobedarf * (5 * d.lieferfrist + 5)) / 5,
        -1
      );

      // @ts-ignore
      if (d.anfangsbestand <= d.bestellpunkt) {
        let modus;

        // if ((d.bruttobedarf * d.lieferfrist) <= d.bestellpunkt) {
        //   // @ts-ignore
        //   if((d.anfangsbestand * (d.lieferfrist / 2)) <= d.bestellpunkt){
        //     modus = 'Sonderbestellung';
        //   } else {
        //     modus = 'Eil';
        //   }
        // } else {
        modus = 'Normal';
        // }
        const bestellungen = new Bestellungen(d.bruttobedarf, 0, modus);
        bestellungen.id = d.id;
        this.dataSource2.push(bestellungen);
      }
    });
  }

  speichern() {
    const orders: Array<Order> = [];

    this.dataSource2.forEach((d) => {
      const order = new OrderImpl(
        d.id,
        d.anzahl,
        this.optionsMap.get(d.modus) ?? 5
      );
      orders.push(order);
    });
    const orderlist: Orderlist = { order: orders };
    this.exportStore.dispatch(addOrderlist({ orderlist: orderlist }));
    this.router.navigate(['losgroessenplanung']);
  }

  loeschen(element: Bestellungen) {
    const index = this.dataSource2.indexOf(element);
    if (index > -1) {
      this.dataSource2.splice(index, 1);
      this.table.renderRows();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverview, {
      width: '350px',
      data: new Bestellungen(0, 0, ''),
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.dataSource2.push(result);
      this.table.renderRows();
    });
  }
}

const round = (value: number, precision: number) => {
  let multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
};
