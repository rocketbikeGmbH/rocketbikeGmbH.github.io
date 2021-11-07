import { Component, OnInit } from '@angular/core';
import { ImportState } from '../store/import/import.reducer';
import { ExportState } from '../store/export/export.reducer';
import { select, Store } from '@ngrx/store';
import {
  selectImportArticle, selectImportFutureInwardstockmovementOrder,
  selectImportInwardstockmovementOrder
} from '../store/import/import.selector';
import {
  article, futureinwardstockmovementorder,
  inwardstockmovementorder
} from '../model/import.model';
import { BestellArtikel, ProduktType } from './bestellarticel';

@Component({
  selector: 'app-mengenplanung',
  templateUrl: './mengenplanung.component.html',
  styleUrls: ['./mengenplanung.component.scss'],
})
export class MengenplanungComponent implements OnInit {
  dataSource: Array<BestellArtikel> = [
    new BestellArtikel(21, 1.8, 0.4, new ProduktType(1, 0, 0), 300),
    new BestellArtikel(22, 1.7, 0.4, new ProduktType(1, 0, 0), 300),
    new BestellArtikel(23, 1.2, 0.2, new ProduktType(1, 0, 0), 300),
    new BestellArtikel(24, 3.2, 0.3, new ProduktType(1, 0, 0), 6100),
    new BestellArtikel(25, 0.9, 0.2, new ProduktType(1, 0, 0), 3600),
    new BestellArtikel(27, 0.9, 0.2, new ProduktType(1, 0, 0), 3600),
    new BestellArtikel(28, 1.7, 0.4, new ProduktType(1, 0, 0), 3600),
    new BestellArtikel(32, 2.1, 0.4, new ProduktType(1, 0, 0), 3600),
    new BestellArtikel(33, 1.9, 0.4, new ProduktType(1, 0, 0), 3600),
    new BestellArtikel(34, 1.6, 0.4, new ProduktType(1, 0, 0), 3600),
    new BestellArtikel(35, 2.2, 0.4, new ProduktType(1, 0, 0), 3600),
    new BestellArtikel(36, 1.2, 0.4, new ProduktType(1, 0, 0), 3600),
    new BestellArtikel(37, 1.5, 0.4, new ProduktType(1, 0, 0), 3600),
    new BestellArtikel(38, 1.7, 0.4, new ProduktType(1, 0, 0), 3600),
    new BestellArtikel(39, 1.5, 0.4, new ProduktType(1, 0, 0), 3600),
    new BestellArtikel(40, 1.7, 0.4, new ProduktType(1, 0, 0), 3600),
    new BestellArtikel(41, 0.9, 0.4, new ProduktType(1, 0, 0), 3600),
    new BestellArtikel(42, 1.2, 0.4, new ProduktType(1, 0, 0), 3600),
    new BestellArtikel(43, 2, 0.4, new ProduktType(1, 0, 0), 3600),
    new BestellArtikel(44, 1, 0.4, new ProduktType(1, 0, 0), 3600),
    new BestellArtikel(45, 1.7, 0.4, new ProduktType(1, 0, 0), 3600),
    new BestellArtikel(46, 0.9, 0.4, new ProduktType(1, 0, 0), 3600),
    new BestellArtikel(47, 1.1, 0.4, new ProduktType(1, 0, 0), 3600),
    new BestellArtikel(48, 1, 0.4, new ProduktType(1, 0, 0), 3600),
    new BestellArtikel(52, 1.6, 0.4, new ProduktType(1, 0, 0), 3600),
    new BestellArtikel(53, 1.6, 0.4, new ProduktType(1, 0, 0), 3600),
    new BestellArtikel(57, 1.7, 0.4, new ProduktType(1, 0, 0), 3600),
    new BestellArtikel(58, 1.6, 0.4, new ProduktType(1, 0, 0), 3600),
    new BestellArtikel(59, 1.7, 0.4, new ProduktType(1, 0, 0), 3600),
  ];
  displayedColumns = [
    'artikelnr',
    'lieferfrist',
    'abweichung',
    'verwendung',
    'diskont',
    'anfangsbestand',
    'offeneBestellung',
  ];
  _articles: Array<article> | undefined;
  articles$ = this.importStore
    .pipe(select(selectImportArticle))
    .subscribe((i) => (this._articles = i));

  _orders: Array<inwardstockmovementorder> | undefined;
  orders$ = this.importStore
    .pipe(select(selectImportInwardstockmovementOrder))
    .subscribe((i) => this._orders = i);

  _futureorders: Array<futureinwardstockmovementorder> | undefined;
  futureorders$ = this.importStore
    .pipe(select(selectImportFutureInwardstockmovementOrder))
    .subscribe((i) => this._futureorders = i);


  constructor(
    private importStore: Store<ImportState>,
    private exportStore: Store<ExportState>
  ) {}

  ngOnInit(): void {
    this.dataSource.forEach((d) => {
      const article = this._articles?.find((article) => article.id == d.id);
      d.anfangsbestand = article?.amount;
      const order = this._orders?.find(
        (o) => o.article == d.id
      );

      if(order){
        d.offeneBestellung = order?.amount;
      }

      const futureOrder = this._futureorders?.find(
        (fo) => fo.article == d.id
      );
      if(futureOrder){
        d.offeneBestellung = futureOrder?.amount;
      }
    });
  }
}
