import { Component, enableProdMode, OnInit, ViewChild } from '@angular/core';
import { orders_workplace, warehousestock, ordersinwork, waitinglist, waitinglistworkstations, waiting_workplace, forecast } from '../model/import.model';
import { selectImportForecast, selectImportOrdersInWork, selectImportWarehousestock, selectWaitingListWorkstations } from '../store/import/import.selector';
import { select, Store } from '@ngrx/store';
import { ImportState } from '../store/import/import.reducer';
import { ExportState } from '../store/export/export.reducer';
import { Selldirect } from '../model/export.model';
import { selectWishList } from '../store/export/export.selector';
import { MatTable } from '@angular/material/table';
import { addProductionlist } from '../store/export/export.actions';
import { Production, Productionlist } from '../model/export.model';
import { Router } from '@angular/router';

export interface Endprodukte {
  artikelnummer: number;
  aktueller_lagerbestand: number;
  in_bearbeitung: number;
  in_warteschlange: number;
  geplanter_endbestand: number;
  vertriebswunsch: number;
  direktverkauf: number;
  produktionsauftraege: number;
  bedarfsmenge: number;
}

//TODO: Wie kann man den Array eleganter implementieren?
// var endprodukt_daten: Array<Endprodukte>;
var endprodukt_daten: Endprodukte[] = [
  { artikelnummer: 1, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0 },
  { artikelnummer: 2, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0 },
  { artikelnummer: 3, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0 }
];

var zwischenprodukt_daten: Endprodukte[] = [
  {artikelnummer: 26, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0},
  {artikelnummer: 51, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0},
  {artikelnummer: 56, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0},
  {artikelnummer: 31, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0},
  {artikelnummer: 16, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0},
  {artikelnummer: 17, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0},
  {artikelnummer: 50, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0},
  {artikelnummer: 55, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0},
  {artikelnummer: 30, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0},
  {artikelnummer: 4, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0},
  {artikelnummer: 10, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0},
  {artikelnummer: 49, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0},
  {artikelnummer: 5, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0},
  {artikelnummer: 11, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0},
  {artikelnummer: 54, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0},
  {artikelnummer: 6, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0},
  {artikelnummer: 12, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0},
  {artikelnummer: 29, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0},
  {artikelnummer: 7, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0},
  {artikelnummer: 13, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0},
  {artikelnummer: 18, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0},
  {artikelnummer: 8, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0},
  {artikelnummer: 14, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0},
  {artikelnummer: 19, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0},
  {artikelnummer: 9, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0},
  {artikelnummer: 15, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0},
  {artikelnummer: 20, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0},
];
const zwischen_artikel_sort: number[] = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 26, 29, 30, 31, 49, 50, 51, 54, 55, 56];
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
  [17, [51, 56, 31]],
  [18, [49]],
  [19, [54]],
  [20, [29]],
  [26, [1, 2, 3]],
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

const wunsch_lager: number[] = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
  100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,]


@Component({
  selector: 'app-programmplanung',
  templateUrl: './programmplanung.component.html',
  styleUrls: ['./programmplanung.component.scss']
})

export class ProgrammplanungComponent implements OnInit {
  @ViewChild(MatTable) tableZwi!: MatTable<any>;
  // Tabelle
  displayedColumns: string[] = ['artikelnummer', 'vertriebswunsch', 'direktverkauf', 'aktueller_lagerbestand', 'in_bearbeitung', 'in_warteschlange', 'geplanter_endbestand', 'produktionsauftraege'];
  displayedColumnsZwi: string[] = ['artikelnummer', 'vertriebswunsch', 'bedarfsmenge', 'aktueller_lagerbestand', 'in_bearbeitung', 'in_warteschlange', 'geplanter_endbestand', 'produktionsauftraege'];
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

  data_warehousestock: warehousestock | undefined;
  data_ordersinwork: ordersinwork | undefined;
  data_waitingListWorkstations: waitinglistworkstations | undefined;
  data_forecast: forecast | undefined;
  data_wishlist: Selldirect | undefined;

    
  constructor(private store: Store<ImportState>, private exportstore: Store<ExportState>, private router: Router) {
    this.warehousestock$.subscribe((i) => (this.data_warehousestock = i));

    this.ordersInWork$.subscribe((i) => (this.data_ordersinwork = i));

    // let data_waitingListWorkstations: waitinglistworkstations | undefined;
    // this.waitingListWorkstations$.subscribe((i) => (data_waitingListWorkstations!= i));


    this.waitingListWorkstations$.subscribe((i) => (this.data_waitingListWorkstations = i));


    this.forecast$.subscribe((i) => (this.data_forecast = i));


    this.wishlist$.subscribe((i) => (this.data_wishlist = i));



    this.berechnungEndprodukte(this.data_warehousestock, this.data_ordersinwork, this.data_waitingListWorkstations, this.data_forecast, this.data_wishlist);
    this.berechnungZwischenprodukte(this.data_warehousestock, this.data_ordersinwork, this.data_waitingListWorkstations, this.data_forecast);
  }

  ngOnInit(): void {
    
  }

  changeend(newValue: number, artikel: number) {
    // No longer need to cast to any - hooray for react!
    // this.setState({temperature: e.target.value});
    endprodukt_daten[artikel - 1].geplanter_endbestand = newValue;

    wunsch_lager[artikel - 1] = newValue;

    endprodukt_daten[artikel - 1].produktionsauftraege =
      +endprodukt_daten[artikel - 1].vertriebswunsch
      + +endprodukt_daten[artikel - 1].geplanter_endbestand
      - +endprodukt_daten[artikel - 1].aktueller_lagerbestand
      - +endprodukt_daten[artikel - 1].in_bearbeitung
      - +endprodukt_daten[artikel - 1].in_warteschlange;
 
    //this.berechnungEndprodukte(this.data_warehousestock, this.data_ordersinwork, this.data_waitingListWorkstations, this.data_forecast, this.data_wishlist);
    // this.store.dispatch(addWorkingtimelist({workingtimelist: future_working_list}))
    console.log('berechnungszwischenprodukte')
    this.berechnungZwischenprodukte(this.data_warehousestock, this.data_ordersinwork, this.data_waitingListWorkstations, this.data_forecast);
    // this.tableZwi.renderRows();
  };

  changezwi(newValue: number, artikel: number) {
    var wert = zwischen_artikel_sort.indexOf(artikel);
    // var wert = artikel - 1;
    console.log('wert' + wert)
    console.log(zwischenprodukt_daten[wert].artikelnummer);
    zwischenprodukt_daten[wert].geplanter_endbestand = newValue;
    console.log('val' + zwischenprodukt_daten[wert].geplanter_endbestand)

    zwischenprodukt_daten[wert].produktionsauftraege =
      +zwischenprodukt_daten[wert].vertriebswunsch
      + +zwischenprodukt_daten[wert].geplanter_endbestand
      - +zwischenprodukt_daten[wert].aktueller_lagerbestand
      - +zwischenprodukt_daten[wert].in_bearbeitung
      - +zwischenprodukt_daten[wert].in_warteschlange;
      this.tableZwi.renderRows();
  };

  berechnungEndprodukte(data_warehousestock?: warehousestock | undefined,
    data_ordersinwork?: ordersinwork | undefined,
    data_waitingListWorkstations?: waitinglistworkstations | undefined,
    data_forecast?: forecast | undefined,
    data_wishlist?: Selldirect | undefined) {
      console.log('END')

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

        if (data_warehousestock!.article[i] != undefined) {
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

          endprodukt_daten[i].geplanter_endbestand = wunsch_lager[endprodukt_daten[i].artikelnummer - 1];
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
              }
          }

          if (data_wishlist!.item[i].attr_quantity) {
            endprodukt_daten[i].direktverkauf = data_wishlist!.item[i].attr_quantity;
          }

          endprodukt_daten[i].produktionsauftraege = +endprodukt_daten[i].vertriebswunsch + +endprodukt_daten[i].geplanter_endbestand - +endprodukt_daten[i].aktueller_lagerbestand
            - +endprodukt_daten[i].in_bearbeitung - +endprodukt_daten[i].in_warteschlange;
          sum_bearbeitung = 0;
        };
      }
    }
  }
  berechnungZwischenprodukte(data_warehousestock?: warehousestock | undefined,
    data_ordersinwork?: ordersinwork | undefined,
    data_waitingListWorkstations?: waitinglistworkstations | undefined,
    data_forecast?: forecast | undefined) {

    // zwischenprodukt_daten.length = 0;
      console.log(zwischenprodukt_daten);

      zwischenprodukt_daten.forEach(zwiprodukt => {

      if (data_warehousestock!.article[zwiprodukt.artikelnummer - 1] != undefined) {
        zwiprodukt.aktueller_lagerbestand = data_warehousestock!.article[zwiprodukt.artikelnummer - 1].amount;
      }

      var sum_bearbeitung: number = 0;

      data_ordersinwork?.workplace!.forEach(element => {
        if (element.item == zwiprodukt.artikelnummer) {
          sum_bearbeitung = +sum_bearbeitung + +element.amount;
        }
      });
      zwiprodukt.in_bearbeitung = sum_bearbeitung;



      this.total_waitinglist.forEach(waiting_item => {

        if (zwiprodukt.artikelnummer == waiting_item.item) {

          var filter = (this.vorhanden.filter(waiting_i => waiting_i.period === waiting_item.period && waiting_i.firstbatch === waiting_item.firstbatch
            && waiting_i.lastbatch === waiting_item.lastbatch && waiting_i.item === waiting_item.item && waiting_i.amount === waiting_item.amount
            && waiting_item.order === waiting_i.order));

          if (filter.length === 0) {
            zwiprodukt.in_warteschlange = +zwiprodukt.in_warteschlange + +waiting_item.amount;
            this.vorhanden.push(waiting_item);
          };
        }
      })

      //Vertriebswunsch
      if (zwiprodukt.artikelnummer == 26) {
        artikelZuordnung.get(zwiprodukt.artikelnummer)?.forEach(element => {
          console.log(element + ' ' + endprodukt_daten[element - 1 ].produktionsauftraege);
          zwiprodukt.vertriebswunsch = zwiprodukt.vertriebswunsch + endprodukt_daten[element - 1].produktionsauftraege;
          console.log('vertriebswunsch' + zwiprodukt.vertriebswunsch);
        })
      } else if (zwiprodukt.artikelnummer == 16 || zwiprodukt.artikelnummer == 17) {
        artikelZuordnung.get(zwiprodukt.artikelnummer)?.forEach(element => {
          var ver = zwischenprodukt_daten.find(x => x.artikelnummer == element);
          // temp_zwischenprodukt.vertriebswunsch = temp_zwischenprodukt.vertriebswunsch + zwischenprodukt_daten[element - 1].produktionsauftraege;
          if (ver != undefined) {
            zwiprodukt.vertriebswunsch = zwiprodukt.vertriebswunsch + ver!.produktionsauftraege;
          }
        })
      }
      else if (zwiprodukt.artikelnummer == 51 || zwiprodukt.artikelnummer == 56
        || zwiprodukt.artikelnummer == 31) {
          zwiprodukt.vertriebswunsch = endprodukt_daten[artikelZuordnung.get(zwiprodukt.artikelnummer)![0] - 1].produktionsauftraege;
      } else {
        var ver = zwischenprodukt_daten.find(x => x.artikelnummer == artikelZuordnung.get(zwiprodukt.artikelnummer)![0]);
        if (ver != undefined) {
          zwiprodukt.vertriebswunsch = ver!.produktionsauftraege;
        }
      };

      //Bedarfsmenge
      if (zwiprodukt.artikelnummer == 26) {
        artikelZuordnung.get(zwiprodukt.artikelnummer)?.forEach(element => {
          zwiprodukt.bedarfsmenge = zwiprodukt.bedarfsmenge + endprodukt_daten[element - 1].in_warteschlange;
        })
      } else if (zwiprodukt.artikelnummer == 16 || zwiprodukt.artikelnummer == 17) {
        artikelZuordnung.get(zwiprodukt.artikelnummer)?.forEach(element => {
          var ver = zwischenprodukt_daten.find(x => x.artikelnummer == element);
          if (ver != undefined) {
            zwiprodukt.bedarfsmenge = zwiprodukt.bedarfsmenge + ver!.in_warteschlange;
          }
        })
      }
      else if (zwiprodukt.artikelnummer == 51 || zwiprodukt.artikelnummer == 56
        || zwiprodukt.artikelnummer == 31) {
          zwiprodukt.bedarfsmenge = endprodukt_daten[artikelZuordnung.get(zwiprodukt.artikelnummer)![0] - 1].in_warteschlange;
      } else {
        var ver = zwischenprodukt_daten.find(x => x.artikelnummer == artikelZuordnung.get(zwiprodukt.artikelnummer)![0]);
        if (ver != undefined) {
          zwiprodukt.bedarfsmenge = ver!.in_warteschlange;
        }
      };

      zwiprodukt.produktionsauftraege = +zwiprodukt.vertriebswunsch
        + +zwiprodukt.geplanter_endbestand - +zwiprodukt.aktueller_lagerbestand
        - +zwiprodukt.in_bearbeitung - +zwiprodukt.in_warteschlange;
      sum_bearbeitung = 0;

      //zwischenprodukt_daten.push(zwiprodukt);
      // zwischenprodukt_daten = zwischenprodukt_daten.concat([temp_zwischenprodukt]);
      if (zwiprodukt.artikelnummer == 26){
      console.log('vertriebswunsch' + zwiprodukt.vertriebswunsch);
      console.log('artikel' + zwiprodukt.artikelnummer);
      }
    })


   
    zwischenprodukt_daten.sort((a, b) => {
      if (b.artikelnummer < a.artikelnummer) return 1;
      if (b.artikelnummer > a.artikelnummer) return -1;
      return 0;
    });

 
    // this.tableZwi.renderRows();
  }

  speichern(){
    const produkttionliste: Production[] = [];

    endprodukt_daten.forEach(endprodukt =>{
      const temp_item: Production = { attr_article: endprodukt.artikelnummer, attr_quantity: endprodukt.produktionsauftraege}
      produkttionliste.push(temp_item);
    })

    zwischenprodukt_daten.forEach(zwischenp =>{
      const temp_z: Production = { attr_article: zwischenp.artikelnummer, attr_quantity: zwischenp.produktionsauftraege}
      produkttionliste.push(temp_z)
    })

    let PL: Productionlist | undefined;
    PL = { production: produkttionliste}

    this.exportstore.dispatch(addProductionlist({productionlist: PL}))

    this.router.navigate(['kapazitaetsplanung'])

  }
}