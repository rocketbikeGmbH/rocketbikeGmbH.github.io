import { Component, OnInit, ViewChild } from '@angular/core';
import { ImportState } from '../store/import/import.reducer';
import { ExportState } from '../store/export/export.reducer';
import { select, Store } from '@ngrx/store';
import {
  selectImportArticle,
  selectImportFutureInwardstockmovementOrder,
  selectImportInwardstockmovementOrder, selectImportResults
} from '../store/import/import.selector';
import {
  article,
  futureinwardstockmovementorder,
  inwardstockmovementorder, Results
} from '../model/import.model';
import { BestellArtikel, Bestellungen } from './bestellarticel';
import { bestellArtikelArray } from './BestellArtikelArray';
// @ts-ignore
import { verwendungen } from './verwendung';
import { Order, Orderlist, Production } from '../model/export.model';
import { addOrderlist } from '../store/export/export.actions';
import { Router } from '@angular/router';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Bestellung } from './bestellung/bestellung.component';
import { StepperServiceService } from '../stepper-service.service';
import { selectProductionlist } from '../store/export/export.selector';
import { browserRefresh } from '../app.component';
import { Prognose } from './prognose/prognose.component';
import { MatPaginator } from '@angular/material/paginator';
import { InfobuttonMengenplanungComponent } from './infobutton/infobutton-mengenplanung.component';

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

  dataSource: MatTableDataSource<BestellArtikel>;
  dataSource2: MatTableDataSource<Bestellungen>;

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

  _result: Results | undefined;
  restults$ = this.importStore.pipe(select(selectImportResults)).subscribe(i => this._result = i);

  forecast: Forecast | undefined;

  @ViewChild('table')
  table!: MatTable<Bestellungen>;

  @ViewChild('pagonatoru')
  paginator!: MatPaginator;

  @ViewChild('paginatori')
  paginator2!: MatPaginator;

  constructor(
    private importStore: Store<ImportState>,
    private exportStore: Store<ExportState>,
    private router: Router,
    public dialog: MatDialog,
    private stepperservice: StepperServiceService
  ) {
    this.dataSource = new MatTableDataSource(bestellArtikelArray);
    this.dataSource2 = new MatTableDataSource();
  }

  ngOnInit(): void {
    if (browserRefresh) {
      this.router.navigate(['/dateiimport']);
    }
    this.productionlist.forEach((p) => {
      // @ts-ignore
      verwendungen.forEach((v) => {
        if (v.id === p.attr_article) {
          v.quantity = p.attr_quantity;
        }
      });
    });

    this.dataSource.data.forEach((d) => {
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
            const orderperiod = Number.parseInt(e?.orderperiod ?? '0');
            // @ts-ignore
            const p_number = Number.parseInt(this._result.period ?? '0') +1;

            if(Math.floor((orderperiod + d.lieferfrist)) == p_number){
              d.eintreffendeBestellung = d.eintreffendeBestellung ?? 0;
              // @ts-ignore
              const amount = Number.parseInt(e?.amount ?? '0');
              d.eintreffendeBestellung += amount;
            }else{
              if(e.mode == 4){
                ob.push(new Bestellungen(e?.amount, orderperiod + (d.lieferfrist / 2), getKeyByValue(this.optionsMap, e.mode)));
              } else {
                ob.push(new Bestellungen(e?.amount, orderperiod + d.lieferfrist, getKeyByValue(this.optionsMap, e.mode)));
              }
            }
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
        (d.bruttobedarf * (d.lieferfrist + 1)),
        -1
      );
      const bestellpunktEil = round((d.bruttobedarf * (d.lieferfrist/2)), -1);
      // @ts-ignore
      const lagerbestand = Number.parseInt(d.lagerbestand ?? '0');
      // @ts-ignore
      const wareneingang = Number.parseInt(d.eintreffendeBestellung ?? '0');

      if(d.bruttobedarf != 0) {
        if((lagerbestand + wareneingang) <= d.bestellpunkt) {
          const bestellungen = new Bestellungen(roundToDiskont(d.diskont, round(d.bruttobedarf * d.lieferfrist, -1)), 0, 'Normal');
          bestellungen.id = d.id;
          this.dataSource2.data.push(bestellungen);
        }
        if((lagerbestand + wareneingang) <= bestellpunktEil || (lagerbestand + wareneingang) <= d.bruttobedarf) {
          const bestellungen = new Bestellungen(d.bruttobedarf, 0, 'Eil');
          bestellungen.id = d.id;
          this.dataSource2.data.push(bestellungen);

        }
        // if((lagerbestand + wareneingang) == 0) {
        //   const bestellungen = new Bestellungen(roundToDiskont(d.diskont, d.bruttobedarf), 0, 'Sonderbestellung');
        //   bestellungen.id = d.id;
        //   this.dataSource2.data.push(bestellungen);
        // }
      }
    });

    const s = this.dataSource2.data;
    s.sort((a, b) => {
      // @ts-ignore
      return this.optionsMap.get(a.modus) - this.optionsMap.get(b.modus);
    });
    this.dataSource2.data = s;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
    this.dataSource2.paginator = this.paginator2;
  }

  speichern() {
    this.stepperservice.set_dateiimport(this.type);

    const orders: Array<Order> = [];

    this.dataSource2.data.forEach((d) => {
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
    const index = this.dataSource2.data.indexOf(element);
    if (index > -1) {
      const s = this.dataSource2.data;
      s.splice(index, 1);
      this.dataSource2.data = s;
      this.table.renderRows();
    }
  }

  openPrognoseDialog(): void {
    // @ts-ignore
    const p_number = Number.parseInt(this._result.period ?? '0') +1;
    const dialogRef = this.dialog.open(Prognose, {
      width: '750px',
      data: new Forecast(
        new Periode((p_number + 1), 0, 0, 0),
        new Periode((p_number + 2), 0, 0, 0),
        new Periode((p_number + 3), 0, 0, 0)
      ),
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.forecast = result;
      this.dataSource.data.forEach((d) => {
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
        result.anzahl = round(result.anzahl, -1);
        const s = this.dataSource2.data;
        s.push(result);
        s.sort((a, b) => {
             // @ts-ignore
             return this.optionsMap.get(a.modus) - this.optionsMap.get(b.modus);
           });
        this.dataSource2.data = s;
        this.table.renderRows();
      }
    });
  }

  openInfoDialog(): void {
    this.dialog.open(InfobuttonMengenplanungComponent);
  }

  iw(): void {
    this.dataSource2.data.forEach((d) => {
      if (d.anzahl <= 0 || isNaN(d.anzahl)) {
        d.anzahl = 0;
      }else {
         d.anzahl = round(d.anzahl, -1);
      }
    });
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

const roundToDiskont = (diskont:number, bestellmenge:number) => {
  if(bestellmenge < diskont && (bestellmenge / diskont) >= 0.8) {
    return diskont;
  }
  return bestellmenge;
}
