import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-mengenplanung',
  templateUrl: './mengenplanung.component.html',
  styleUrls: ['./mengenplanung.component.scss'],
})
export class MengenplanungComponent implements OnInit {
  panelOpenState = true;
  dataSource: Array<BestellArtikel> = bestellArtikelArray;
  dataSource2: Array<Bestellungen> = [];
  options: Array<string> = [ 'Normal', 'Eil', 'Sonderbestellung'];
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
  displayedColumns2 = ['artikelnr', 'menge', 'modus'];
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

  constructor(
    private importStore: Store<ImportState>,
    private exportStore: Store<ExportState>
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
        // @ts-ignore
        if (d.anfangsbestand * d.lieferfrist <= d.bestellpunkt) {
          modus = 'Eil';
        } else {
          modus = 'Normal';
        }
        const bestellungen = new Bestellungen(d.bruttobedarf, 0, modus);
        bestellungen.id = d.id;
        this.dataSource2.push(bestellungen);
      }
    });
  }
}
const round = (value: number, precision: number) => {
  let multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}
