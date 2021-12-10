import { Component, OnInit, ViewChild } from '@angular/core';
import { ImportState } from '../store/import/import.reducer';
import { ExportState } from '../store/export/export.reducer';
import { select, Store } from '@ngrx/store';
import {
  selectImportArticle,
  selectImportFutureInwardstockmovementOrder,
  selectImportInwardstockmovementOrder,
} from '../store/import/import.selector';
import {
  article,
  futureinwardstockmovementorder,
  inwardstockmovementorder,
} from '../model/import.model';
import { BestellArtikel, Bestellungen } from './bestellarticel';
import { bestellArtikelArray } from './BestellArtikelArray';
// @ts-ignore
import { verwendungen } from './verwendung';
import { Order, Orderlist, Production } from '../model/export.model';
import { addOrderlist } from '../store/export/export.actions';
import { Router } from '@angular/router';
import { MatTable } from '@angular/material/table';
import { LosgrossenElement } from '../losgroessenplanung/losgroessenplanung.component';
import { MatDialog } from '@angular/material/dialog';
import { Bestellung } from './bestellung/bestellung.component';
import { StepperServiceService } from '../stepper-service.service';
import { InfobuttonProgrammplanungComponent } from '../infobutton-programmplanung/infobutton-programmplanung.component';
import { selectProductionlist } from '../store/export/export.selector';
import { browserRefresh } from '../app.component';
import { Prognose } from './prognose/prognose.component';

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

export class Forecast {
  periode0: Periode;
  periode1: Periode;
  periode2: Periode;

  constructor(periode0: Periode, periode1: Periode, periode2: Periode) {
    this.periode0 = periode0;
    this.periode1 = periode1;
    this.periode2 = periode2;
  }
}
class Periode {
  p_number: number;
  p1: number;
  p2: number;
  p3: number;

  constructor(p_number: number, p1: number, p2: number, p3: number) {
    this.p_number = p_number;
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
  }
}
export const options: Array<string> = ['Normal', 'Eil', 'Sonderbestellung'];

@Component({
  selector: 'app-mengenplanung',
  templateUrl: './mengenplanung.component.html',
  styleUrls: ['./mengenplanung.component.scss'],
})
export class MengenplanungComponent implements OnInit {
  type = 'mengenplanung';

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
    // 'verwendung',
    'diskont',
    'lagerbestand',
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

  productionlist: Production[] = [];
  productionlist$ = this.exportStore
    .pipe(select(selectProductionlist))
    .subscribe((i) => (this.productionlist = i));

  forecast: Forecast | undefined;

  @ViewChild('table')
  table!: MatTable<LosgrossenElement>;

  constructor(
    private importStore: Store<ImportState>,
    private exportStore: Store<ExportState>,
    private router: Router,
    public dialog: MatDialog,
    private stepperservice: StepperServiceService
  ) {}

  ngOnInit(): void {
    this.productionlist.forEach((p) => {
      // @ts-ignore
      verwendungen.forEach((v) => {
        if (v.id === p.attr_article) {
          v.quantity = p.attr_quantity;
        }
      });
    });

    if (browserRefresh) {
      this.router.navigate(['/dateiimport']);
    }
    console.log('refreshed?:', browserRefresh);

    this.dataSource.forEach((d) => {
      const article = this._articles?.find((article) => article.id == d.id);
      d.lagerbestand = article?.amount;

      if (Array.isArray(this._orders)) {
        const order = this._orders?.find((o) => o.article == d.id);
        if (order) {
          d.eintreffendeBestellung = order?.amount;
        }
      }

      if (Array.isArray(this._futureorders)) {
        const futureOrders = this._futureorders?.filter(
          (e) => e.article == d.id
        );

        if (futureOrders) {
          const ob: Array<Bestellungen> = [];
          futureOrders.forEach((e) => {
            // @ts-ignore
            const lieferfrist = Number.parseInt(e?.orderperiod ?? '0');
            ob.push(
              new Bestellungen(
                e?.amount,
                lieferfrist + d.lieferfrist,
                getKeyByValue(this.optionsMap, e.mode)
              )
            );
          });
          d.offeneBestellung = ob;
        }
      }
      d.bruttobedarf = 0;
      // @ts-ignore
      verwendungen.forEach((v) => {
        // @ts-ignore
        v.parts.forEach((parts) => {
          if (parts.id === d.id) {
            // @ts-ignore
            d.bruttobedarf += parts.faktor * v.quantity;
          }
        });
      });

      // const { p1, p2, p3 } = this._forecast ?? {};
      // d.bruttobedarf =
      //   d.verwendung.p1 * (p1 ?? 0) +
      //   d.verwendung.p2 * (p2 ?? 0) +
      //   d.verwendung.p3 * (p3 ?? 0);

      d.bestellpunkt = round(
        (d.bruttobedarf * (5 * d.lieferfrist + 5)) / 5,
        -1
      );
      // @ts-ignore
      const ab = Number.parseInt(d.lagerbestand ?? '0');
      // @ts-ignore
      const anz = Number.parseInt(d.eintreffendeBestellung?.anzahl ?? '0');

      // @ts-ignore
      if (d.bruttobedarf != 0 && (ab + anz) <= d.bestellpunkt) {
        let modus;
        if ((ab - (d.bruttobedarf * d.lieferfrist)) < 0) {
          // @ts-ignore
          if((ab - (d.bruttobedarf * (d.lieferfrist / 2))) < 0){
            modus = 'Sonderbestellung';
          } else {
            modus = 'Eil';
          }
        } else {
          modus = 'Normal';
        }

        const bestellungen = new Bestellungen(d.bruttobedarf, 0, modus);
        bestellungen.id = d.id;
        this.dataSource2.push(bestellungen);
      }
    });
    this.dataSource2.sort((a, b) => {
      // @ts-ignore
      return this.optionsMap.get(a.modus) - this.optionsMap.get(b.modus);
    });
  }

  speichern() {
    this.stepperservice.set_dateiimport(this.type);

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

  openPrognoseDialog(): void {
    const dialogRef = this.dialog.open(Prognose, {
      width: '750px',
      data: new Forecast(
        new Periode(1, 0, 0, 0),
        new Periode(2, 0, 0, 0),
        new Periode(3, 0, 0, 0)
      ),
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.forecast = result;
      this.dataSource.forEach((d) => {
        // @ts-ignore
        const p0 = this.forecast.periode0.p1 * d.verwendung.p1 + this.forecast.periode0.p2 * d.verwendung.p2 + this.forecast.periode0.p3 * d.verwendung.p3;
        // @ts-ignore
        const p1 = this.forecast.periode1.p1 * d.verwendung.p1 + this.forecast.periode1.p2 * d.verwendung.p2 + this.forecast.periode1.p3 * d.verwendung.p3;
        // @ts-ignore
        const p2 = this.forecast.periode2.p1 * d.verwendung.p1 + this.forecast.periode2.p2 * d.verwendung.p2 + this.forecast.periode2.p3 * d.verwendung.p3;
        // @ts-ignore
        const s = (d.bruttobedarf + p0 + p1 + p2) / 4;
        d.bestellpunkt = round((s * (5 * d.lieferfrist + 5)) / 5, -1);
      });
      this.table.renderRows();
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(Bestellung, {
      width: '350px',
      data: new Bestellungen(0, 0, ''),
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.id && result?.modus && result?.anzahl) {
        this.dataSource2.push(result);
        this.table.renderRows();
      }
    });
  }

  openInfoDialog(): void {
    this.dialog.open(InfobuttonProgrammplanungComponent);
  }
}

const round = (value: number, precision: number) => {
  let multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
};

const getKeyByValue = (map: Map<string, number>, searchValue: number) => {
  for (let [key, value] of map.entries()) {
    if (value == searchValue) return key;
  }
  return '';
};
