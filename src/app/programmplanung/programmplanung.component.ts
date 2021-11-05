import { Component, enableProdMode, OnInit } from '@angular/core';
import { orders_workplace, warehousestock, ordersinwork, waitinglist, waitinglistworkstations, waiting_workplace, forecast } from '../model/import.model';
import { selectImportForecast, selectImportOrdersInWork, selectImportWarehousestock, selectWaitingListWorkstations } from '../store/import/import.selector';
import { select, Store } from '@ngrx/store';
import { ImportState } from '../store/import/import.reducer';



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
  {artikelnummer: 1, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0},
  {artikelnummer: 2, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0},
  {artikelnummer: 3, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 120, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0}
];


@Component({
  selector: 'app-programmplanung',
  templateUrl: './programmplanung.component.html',
  styleUrls: ['./programmplanung.component.scss']
})

export class ProgrammplanungComponent implements OnInit {

  // Tabelle
  displayedColumns: string[] = ['artikelnummer', 'aktueller_lagerbestand', 'in_bearbeitung', 'in_warteschlange', 'geplanter_endbestand', 'vertriebswunsch', 'direktverkauf', 'produktionsauftraege'];
  dataSource = endprodukt_daten;
  warehousestock$ = this.store.pipe(select(selectImportWarehousestock));
  ordersInWork$ = this.store.pipe(select(selectImportOrdersInWork));
  waitingListWorkstations$ = this.store.pipe(select(selectWaitingListWorkstations));
  forecast$ = this.store.pipe(select(selectImportForecast))
  //SERGIO
  total_waitinglist: waitinglist[] = [];
  vorhanden: waitinglist[] = [];

  constructor(private store: Store<ImportState>) {

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



    this.berechnungEndprodukte(data_warehousestock, data_ordersinwork, data_waitingListWorkstations, data_forecast);
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

  berechnungEndprodukte(data_warehousestock?: warehousestock | undefined,
    data_ordersinwork?:   ordersinwork | undefined,
    data_waitingListWorkstations?: waitinglistworkstations | undefined,
    data_forecast?: forecast | undefined) {

      data_waitingListWorkstations!.workplace.forEach((workplace: waiting_workplace) => {
        const temp_workplace: waiting_workplace = {id: 0, timeneed: 0, waitinglist: [],};
  
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
    if (typeof(data_warehousestock) === typeof(this.warehousestock$)){
      //Schleife berechnet die Werte für die drei Endproukte 
    for (let i = 0; i <= 2; i++) {
      endprodukt_daten[i].artikelnummer = data_warehousestock!.article[i]?.id;

      console.log(endprodukt_daten[i].artikelnummer);
      if (data_warehousestock!.article[i] != undefined){
        console.log('wtf:' + data_warehousestock!.article[i]);
        console.log('wtf2:' + data_warehousestock!.article[i].amount);
      endprodukt_daten[i].aktueller_lagerbestand = data_warehousestock!.article[i].amount;
      
      data_ordersinwork?.workplace!.forEach(element => {
        if (element.item === data_warehousestock!.article[i].id){
          sum_bearbeitung = +sum_bearbeitung + +element.amount;
        }
      });

      endprodukt_daten[i].in_bearbeitung = sum_bearbeitung;

      this.total_waitinglist.forEach(waiting_item =>{

        if(data_warehousestock!.article[i].id == waiting_item.item){

        var filter = (this.vorhanden.filter(waiting_i => waiting_i.period === waiting_item.period && waiting_i.firstbatch === waiting_item.firstbatch
          && waiting_i.lastbatch === waiting_item.lastbatch && waiting_i.item === waiting_item.item && waiting_i.amount === waiting_item.amount 
          && waiting_item.order === waiting_i.order));

            if(filter.length === 0){
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

      endprodukt_daten[i].direktverkauf = 1; //TODO


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
}