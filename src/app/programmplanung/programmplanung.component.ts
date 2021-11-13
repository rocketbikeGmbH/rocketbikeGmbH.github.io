import { Component, enableProdMode, OnInit } from '@angular/core';
import { orders_workplace, warehousestock, ordersinwork, waitinglist, waitinglistworkstations, waiting_workplace, forecast } from '../model/import.model';
import { selectImportForecast, selectImportOrdersInWork, selectImportWarehousestock, selectWaitingListWorkstations } from '../store/import/import.selector';
import { select, Store } from '@ngrx/store';
import { ImportState } from '../store/import/import.reducer';
import { ExportState } from '../store/export/export.reducer';
import { Selldirect } from '../model/export.model';
import { selectWishList } from '../store/export/export.selector';



export interface Endprodukte {
  artikelnummer: number;
  aktueller_lagerbestand: number;
  in_bearbeitung: number;
  in_warteschlange: number;
  geplanter_endbestand: number;
  vertriebswunsch: number;
  direktverkauf: number;
  produktionsauftraege: number;
}

// Testdaten
// const ENDPRODUKT_DATEN: Endprodukte[] = [
//   {artikelnummer: 1, aktueller_lagerbestand: 300, in_bearbeitung: 100, in_warteschlange: 0, geplanter_endbestand: 100, vertriebswunsch: 50, direktverkauf: 200, produktionsauftraege: 300},
//   {artikelnummer: 2, aktueller_lagerbestand: 200, in_bearbeitung: 50, in_warteschlange: 0, geplanter_endbestand: 50, vertriebswunsch: 50, direktverkauf: 10, produktionsauftraege: 300},
//   {artikelnummer: 3, aktueller_lagerbestand: 150, in_bearbeitung: 100, in_warteschlange: 50, geplanter_endbestand: 60, vertriebswunsch: 50, direktverkauf: 80, produktionsauftraege: 250}
// ];

//TODO: Wie kann man den Array eleganter implementieren?
// var endprodukt_daten: Array<Endprodukte>;
var endprodukt_daten: Endprodukte[] = [
  { artikelnummer: 1, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0 },
  { artikelnummer: 2, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0 },
  { artikelnummer: 3, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0 }
];

// var zwischenprodukt_daten: Endprodukte[] = [
//   {artikelnummer: 4, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0},
//   {artikelnummer: 5, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0},
//   {artikelnummer: 6, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0},
//   {artikelnummer: 7, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0},
//   {artikelnummer: 8, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0},
//   {artikelnummer: 9, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0},
//   {artikelnummer: 10, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0},
//   {artikelnummer: 11, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0},
//   {artikelnummer: 12, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0},
//   {artikelnummer: 13, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0},
//   {artikelnummer: 14, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0},
//   {artikelnummer: 15, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0},
//   {artikelnummer: 16, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0},
//   {artikelnummer: 17, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0},
//   {artikelnummer: 18, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0},
//   {artikelnummer: 19, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0},
//   {artikelnummer: 20, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0},
//   {artikelnummer: 26, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0},
//   {artikelnummer: 29, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0},
//   {artikelnummer: 30, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0},
//   {artikelnummer: 49, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0},
//   {artikelnummer: 50, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0},
//   {artikelnummer: 51, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0},
//   {artikelnummer: 54, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0},
//   {artikelnummer: 55, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0},
//   {artikelnummer: 56, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0}
// ];

const zwischenprodukt_daten: Endprodukte[] = [];
// const zwischen_artikel: number[] = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 26, 29, 30, 31, 49, 50, 51, 54, 55, 56];
const zwischen_artikel: number[] = [26, 51, 56, 31, 16, 17, 50, 55, 30, 4, 10, 49, 5, 11, 54, 6, 12, 29, 7, 13, 18, 8, 14, 19, 9, 15, 20];
var artikelZuordnung = new Map([
  [1, [0]],
  [2, [0]],
  [3, [0]],
  [4, [50]],
  [5, [55]],
  [6, [30]],
  [7, [49]],
  [8, [54]],
  [9, [29]],
  [10, [50]],
  [11, [55]],
  [12, [30]],
  [13, [49]],
  [14, [54]],
  [15, [29]],
  [16, [51, 56, 31]],
  // [16, [56]],
  // [16, [31]],
  [17, [51, 56, 31]],
  // [17, [56]],
  // [17, [31]],
  [18, [49]],
  [19, [54]],
  [20, [29]],
  [26, [1, 2, 3]],
  // [26, [2]],
  // [26, [3]],
  [29, [30]],
  [30, [31]],
  [31, [3]],
  [49, [50]],
  [50, [51]],
  [51, [1]],
  [54, [55]],
  [55, [56]],
  [56, [2]],
])



@Component({
  selector: 'app-programmplanung',
  templateUrl: './programmplanung.component.html',
  styleUrls: ['./programmplanung.component.scss']
})

export class ProgrammplanungComponent implements OnInit {

  // Tabelle
  displayedColumns: string[] = ['artikelnummer', 'aktueller_lagerbestand', 'in_bearbeitung', 'in_warteschlange', 'geplanter_endbestand', 'vertriebswunsch', 'direktverkauf', 'produktionsauftraege'];
  displayedColumnsZwi: string[] = ['artikelnummer', 'aktueller_lagerbestand', 'in_bearbeitung', 'in_warteschlange', 'geplanter_endbestand', 'vertriebswunsch', 'produktionsauftraege'];
  dataSourceEnd = endprodukt_daten;
  dataSourceZwi = zwischenprodukt_daten;
  warehousestock$ = this.store.pipe(select(selectImportWarehousestock));
  ordersInWork$ = this.store.pipe(select(selectImportOrdersInWork));
  waitingListWorkstations$ = this.store.pipe(select(selectWaitingListWorkstations));
  forecast$ = this.store.pipe(select(selectImportForecast));
  wishlist$ = this.exportstore.pipe(select(selectWishList));
  //SERGIO
  total_waitinglist: waitinglist[] = [];
  vorhanden: waitinglist[] = [];

  constructor(private store: Store<ImportState>, private exportstore: Store<ExportState>) {

    let data_warehousestock: warehousestock | undefined;
    this.warehousestock$.subscribe((i) => (data_warehousestock = i));

    let data_ordersinwork: ordersinwork | undefined;
    this.ordersInWork$.subscribe((i) => (data_ordersinwork = i));

    // let data_waitingListWorkstations: waitinglistworkstations | undefined;
    // this.waitingListWorkstations$.subscribe((i) => (data_waitingListWorkstations!= i));

    let data_waitingListWorkstations: waitinglistworkstations | undefined;
    this.waitingListWorkstations$.subscribe((i) => (data_waitingListWorkstations = i));

    let data_forecast: forecast | undefined;
    this.forecast$.subscribe((i) => (data_forecast = i));

    let data_wishlist: Selldirect | undefined;
    this.wishlist$.subscribe((i) => (data_wishlist = i));


    console.log('wishlist:' + data_wishlist);
    this.berechnungEndprodukte(data_warehousestock, data_ordersinwork, data_waitingListWorkstations, data_forecast, data_wishlist);
    this.berechnungZwischenprodukte(data_warehousestock, data_ordersinwork, data_waitingListWorkstations, data_forecast);
    console.log(endprodukt_daten);
    console.log('wa' + data_warehousestock?.article[1]);
    console.log('or' + data_ordersinwork);
    console.log('en' + endprodukt_daten);
  }

  ngOnInit(): void {
  }

  changeend(newValue: number, artikel: number) {
    // No longer need to cast to any - hooray for react!
    // this.setState({temperature: e.target.value});
    console.log(newValue);
    endprodukt_daten[artikel - 1].geplanter_endbestand = newValue;

    endprodukt_daten[artikel - 1].produktionsauftraege =
      +endprodukt_daten[artikel - 1].vertriebswunsch
      + +endprodukt_daten[artikel - 1].geplanter_endbestand
      - +endprodukt_daten[artikel - 1].aktueller_lagerbestand
      - +endprodukt_daten[artikel - 1].in_bearbeitung
      - +endprodukt_daten[artikel - 1].in_warteschlange;
  };

  changezwi(newValue: number, artikel: number) {
    // No longer need to cast to any - hooray for react!
    // this.setState({temperature: e.target.value});
    console.log(newValue);
    var wert = zwischen_artikel.indexOf(artikel);
    zwischenprodukt_daten[wert].geplanter_endbestand = newValue;

    zwischenprodukt_daten[wert].produktionsauftraege =
      +zwischenprodukt_daten[wert].vertriebswunsch
      + +zwischenprodukt_daten[wert].geplanter_endbestand
      - +zwischenprodukt_daten[wert].aktueller_lagerbestand
      - +zwischenprodukt_daten[wert].in_bearbeitung
      - +zwischenprodukt_daten[wert].in_warteschlange;
  };

  berechnungEndprodukte(data_warehousestock?: warehousestock | undefined,
    data_ordersinwork?: ordersinwork | undefined,
    data_waitingListWorkstations?: waitinglistworkstations | undefined,
    data_forecast?: forecast | undefined,
    data_wishlist?: Selldirect | undefined) {

    data_waitingListWorkstations!.workplace.forEach((workplace: waiting_workplace) => {
      const temp_workplace: waiting_workplace = { id: 0, timeneed: 0, waitinglist: [], };


      temp_workplace.id = workplace.id;
      temp_workplace.timeneed = workplace.timeneed;
      const wt = workplace.waitinglist;

      if (!(workplace.waitinglist == undefined)) {
        if (Array.isArray(wt)) {
          this.total_waitinglist.push(...wt);
        } else {
          this.total_waitinglist.push(wt)
        }
      }

    });

    var sum_bearbeitung: number = 0;
    if (typeof (data_warehousestock) === typeof (this.warehousestock$)) {
      //Schleife berechnet die Werte für die drei Endproukte 
      for (let i = 0; i <= 2; i++) {
        endprodukt_daten[i].in_warteschlange = 0;
        endprodukt_daten[i].artikelnummer = data_warehousestock!.article[i]?.id;

        console.log(endprodukt_daten[i].artikelnummer);
        if (data_warehousestock!.article[i] != undefined) {
          console.log('wtf:' + data_warehousestock!.article[i]);
          console.log('wtf2:' + data_warehousestock!.article[i].amount);
          endprodukt_daten[i].aktueller_lagerbestand = data_warehousestock!.article[i].amount;

          data_ordersinwork?.workplace!.forEach(element => {
            if (element.item === data_warehousestock!.article[i].id) {
              sum_bearbeitung = +sum_bearbeitung + +element.amount;
            }
          });

          endprodukt_daten[i].in_bearbeitung = sum_bearbeitung;

          this.total_waitinglist.forEach(waiting_item => {

            if (data_warehousestock!.article[i].id == waiting_item.item) {

              var filter = (this.vorhanden.filter(waiting_i => waiting_i.period === waiting_item.period && waiting_i.firstbatch === waiting_item.firstbatch
                && waiting_i.lastbatch === waiting_item.lastbatch && waiting_i.item === waiting_item.item && waiting_i.amount === waiting_item.amount
                && waiting_item.order === waiting_i.order));

              if (filter.length === 0) {
                endprodukt_daten[i].in_warteschlange = +endprodukt_daten[i].in_warteschlange + +waiting_item.amount;
                this.vorhanden.push(waiting_item);
              };
            }
          }
          )

          endprodukt_daten[i].geplanter_endbestand = 120;
          endprodukt_daten[i].artikelnummer = data_warehousestock!.article[i]?.id;

          switch (i) {
            case 0: {
              endprodukt_daten[i].vertriebswunsch = data_forecast!.p1;
              break;
            }
            case 1: {
              endprodukt_daten[i].vertriebswunsch = data_forecast!.p2;
              break;
            }
            case 2: {
              endprodukt_daten[i].vertriebswunsch = data_forecast!.p3;
              break;
            }
            default:
              {
                console.log('default');
              }
          }

          // endprodukt_daten[i].direktverkauf = 1; //TODO
          // endprodukt_daten[i].direktverkauf = data_wishlist!.item
          if (data_wishlist!.item[i].attr_quantity) {
            endprodukt_daten[i].direktverkauf = data_wishlist!.item[i].attr_quantity;
          }

          endprodukt_daten[i].produktionsauftraege = +endprodukt_daten[i].vertriebswunsch + +endprodukt_daten[i].geplanter_endbestand - +endprodukt_daten[i].aktueller_lagerbestand
            - +endprodukt_daten[i].in_bearbeitung - +endprodukt_daten[i].in_warteschlange;
          sum_bearbeitung = 0;
        };
      }

      // SERGIO Code



      // console.log("total waitlingist");
      // console.log(this.total_waitinglist)

      // this.dataSource.forEach(produkt =>{


      // })
    }
  }
  berechnungZwischenprodukte(data_warehousestock?: warehousestock | undefined,
    data_ordersinwork?: ordersinwork | undefined,
    data_waitingListWorkstations?: waitinglistworkstations | undefined,
    data_forecast?: forecast | undefined) {
    zwischenprodukt_daten.length = 0;



    // for (let i = 0; i <= 25; i++) {
    zwischen_artikel.forEach(element => {
      const temp_zwischenprodukt: Endprodukte =
      {
        artikelnummer: 4, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0,
        geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0
      };

      temp_zwischenprodukt.artikelnummer = element;

      if (data_warehousestock!.article[temp_zwischenprodukt.artikelnummer - 1] != undefined) {
        temp_zwischenprodukt.aktueller_lagerbestand = data_warehousestock!.article[temp_zwischenprodukt.artikelnummer - 1].amount;
      }

      var sum_bearbeitung: number = 0;

      data_ordersinwork?.workplace!.forEach(element => {
        if (element.item == temp_zwischenprodukt.artikelnummer) {
          sum_bearbeitung = +sum_bearbeitung + +element.amount;
        }
      });
      temp_zwischenprodukt.in_bearbeitung = sum_bearbeitung;



      this.total_waitinglist.forEach(waiting_item => {

        if (temp_zwischenprodukt.artikelnummer == waiting_item.item) {

          var filter = (this.vorhanden.filter(waiting_i => waiting_i.period === waiting_item.period && waiting_i.firstbatch === waiting_item.firstbatch
            && waiting_i.lastbatch === waiting_item.lastbatch && waiting_i.item === waiting_item.item && waiting_i.amount === waiting_item.amount
            && waiting_item.order === waiting_i.order));

          if (filter.length === 0) {
            temp_zwischenprodukt.in_warteschlange = +temp_zwischenprodukt.in_warteschlange + +waiting_item.amount;
            this.vorhanden.push(waiting_item);
          };
        }
      })

      console.log('26: asfcdofpoafaf: ' + artikelZuordnung.get(26));
      if (temp_zwischenprodukt.artikelnummer == 26) {
        artikelZuordnung.get(temp_zwischenprodukt.artikelnummer)?.forEach(element => {
          temp_zwischenprodukt.vertriebswunsch = temp_zwischenprodukt.vertriebswunsch + endprodukt_daten[element - 1].produktionsauftraege;
        })
      } else if (temp_zwischenprodukt.artikelnummer == 16 || temp_zwischenprodukt.artikelnummer == 17) {
        artikelZuordnung.get(temp_zwischenprodukt.artikelnummer)?.forEach(element => {
          var ver = zwischenprodukt_daten.find(x => x.artikelnummer == element);
          // temp_zwischenprodukt.vertriebswunsch = temp_zwischenprodukt.vertriebswunsch + zwischenprodukt_daten[element - 1].produktionsauftraege;
          if (ver != undefined) {
            temp_zwischenprodukt.vertriebswunsch = temp_zwischenprodukt.vertriebswunsch + ver!.produktionsauftraege;
          }
        })
      }
      else if (temp_zwischenprodukt.artikelnummer == 51 || temp_zwischenprodukt.artikelnummer == 56
        || temp_zwischenprodukt.artikelnummer == 31) {
        temp_zwischenprodukt.vertriebswunsch = endprodukt_daten[artikelZuordnung.get(temp_zwischenprodukt.artikelnummer)![0] - 1].produktionsauftraege;
      } else {
        var ver = zwischenprodukt_daten.find(x => x.artikelnummer == artikelZuordnung.get(temp_zwischenprodukt.artikelnummer)![0]);
        if (ver != undefined) {
          temp_zwischenprodukt.vertriebswunsch = ver!.produktionsauftraege;
        }
      };

      temp_zwischenprodukt.produktionsauftraege = +temp_zwischenprodukt.vertriebswunsch
        + +temp_zwischenprodukt.geplanter_endbestand - +temp_zwischenprodukt.aktueller_lagerbestand
        - +temp_zwischenprodukt.in_bearbeitung - +temp_zwischenprodukt.in_warteschlange;
      sum_bearbeitung = 0;

      zwischenprodukt_daten.push(temp_zwischenprodukt);

      //console.log(zwischenprodukt_daten);

    })

    console.log('qrweqafdkcpoa');
    console.log(zwischenprodukt_daten);
    zwischenprodukt_daten.sort((a, b) => {
      if (b.artikelnummer < a.artikelnummer) return 1;
      if (b.artikelnummer > a.artikelnummer) return -1;
      return 0;
    });
    console.log(zwischenprodukt_daten);

  }
}