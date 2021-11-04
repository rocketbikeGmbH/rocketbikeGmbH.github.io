import {
  Component,
  OnInit,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  selectImportIdleTimeCosts,
  selectWaitingListWorkstations,
} from '../store/import/import.selector';
import { ImportState } from '../store/import/import.reducer';
import { ExportState } from '../store/export/export.reducer';
import { Productionlist } from '../model/export.model';
import {
  idletimecosts,
  waitinglistworkstations,
  waiting_workplace,
  waitinglist,
} from '../model/import.model';


export interface Kapaelement {
  arbeitsplatz: number;
  kapa_new: number;
  ruest_new: number;
  kapa_old: number;
  ruest_old: number;
  kapa_gesamt: number;
  anzahl_schichten: number;
  ueberstunden_min_tag: number;
  zusatz_ueberstunden: number;
}

export interface idle {
  id: number;
  setupevents: number;
}

export interface ruest_dauer {
  id: number;
  dauer: number;
}

let ruest_dauern: ruest_dauer[] = [
  { id: 1, dauer: 20 },
  { id: 2, dauer: 27 },
  { id: 3, dauer: 20 },
  { id: 4, dauer: 27 },
  { id: 6, dauer: 15 },
  { id: 7, dauer: 23 },
  { id: 8, dauer: 18 },
  { id: 9, dauer: 16 },
  { id: 10, dauer: 20 },
  { id: 11, dauer: 17 },
  { id: 12, dauer: 0 },
  { id: 13, dauer: 0 },
  { id: 14, dauer: 0 },
  { id: 15, dauer: 15 },
];

// let ruest_dauern: ruest_dauer[] = [
//   { id: 1, dauer: 20 },
//   { id: 2, dauer: 27 },
//   { id: 3, dauer: 20 },
//   { id: 4, dauer: 27 },
//   { id: 6, dauer: 15 },
//   { id: 7, dauer: 23 },
//   { id: 8, dauer: 18 },
//   { id: 9, dauer: 16 },
//   { id: 10, dauer: 20 },
//   { id: 11, dauer: 17 },
//   { id: 12, dauer: 0 },
//   { id: 13, dauer: 0 },
//   { id: 14, dauer: 0 },
//   { id: 15, dauer: 15 },
// ];


export interface summe_maschine {
  id: number;
  summe: number;
  produkte: produkt_bearbeitung[];
}

export interface produkt_bearbeitung{
  id: number;
  zeit: number;
}

// let list_summe_maschine: summe_maschine[] = [
//   { id: 1, summe: 0, produkte: [{id: 49, zeit: 54,29] },
//   { id: 2, summe: 0,produkte: [50,55,30] },
//   { id: 3, summe: 0,produkte: [51,56,31] },
//   { id: 4, summe: 0,produkte: [49,54,29] },
//   { id: 6, summe: 0,produkte: [49,54,29] },
//   { id: 7, summe: 0,produkte: [49,54,29] },
//   { id: 8, summe: 0,produkte: [49,54,29] },
//   { id: 9, summe: 0,produkte: [49,54,29] },
//   { id: 10, summe: 0,produkte: [49,54,29] },
//   { id: 11, summe: 0,produkte: [49,54,29] },
//   { id: 12, summe: 0,produkte: [49,54,29] },
//   { id: 13, summe: 0,produkte: [49,54,29] },
//   { id: 14, summe: 0,produkte: [49,54,29] },
//   { id: 15, summe: 0,produkte: [49,54,29] },
// ]
// sum_m1 = (E49+E54+E29) * 6
    // sum_m2 = (E50+E55+E30) * 5
    // sum_m3 = E51 * 5 + (E56+31) * 6
    // sum_m4 = E1 * 6 + (E2+E3) * 7
    // sum_m6 = E16 * 2 + (E18+E19+E20) * 3
    // sum_m7 = (E10+E11+E12+E13+E14+E15+E18+E19+E20+E26) *2
    // sum_m8 = (E10+E13) + (E11+E12+E14+E15) * 2 + (E18+E19+E20) * 3
    // sum_m9 = (E18+E19+E20) * 2 + (E10+E11+E12+E13+E14+E15) * 3
    // sum_m10 = (E4+E5+E6+E7+E8+E9) * 4
    // sum_m11 = (E4+E5+E6+E7+E8+E9) * 3
    // sum_m12 = (E10+E11+E12+E13+E14+E15) * 3
    // sum_m13 = (E10+E11+E12+E13+E14+E15) * 2
    // sum_m14 = E16 * 3
    // sum_m15 = (E17+E26) * 3

let ELEMENT_DATA: Kapaelement[] = [
  {
    arbeitsplatz: 1,
    kapa_new: 2700,
    ruest_new: 1,
    kapa_old: 0,
    ruest_old: 0,
    kapa_gesamt: 0,
    anzahl_schichten: 1,
    ueberstunden_min_tag: 0,
    zusatz_ueberstunden: 0,
  },
  {
    arbeitsplatz: 2,
    kapa_new: 2250,
    ruest_new: 1,
    kapa_old: 0,
    ruest_old: 0,
    kapa_gesamt: 0,
    anzahl_schichten: 1,
    ueberstunden_min_tag: 0,
    zusatz_ueberstunden: 0,
  },
  {
    arbeitsplatz: 3,
    kapa_new: 2500,
    ruest_new: 1,
    kapa_old: 0,
    ruest_old: 0,
    kapa_gesamt: 0,
    anzahl_schichten: 1,
    ueberstunden_min_tag: 0,
    zusatz_ueberstunden: 0,
  },
  {
    arbeitsplatz: 4,
    kapa_new: 2950,
    ruest_new: 1,
    kapa_old: 0,
    ruest_old: 0,
    kapa_gesamt: 0,
    anzahl_schichten: 1,
    ueberstunden_min_tag: 0,
    zusatz_ueberstunden: 0,
  },
  {
    arbeitsplatz: 6,
    kapa_new: 2270,
    ruest_new: 1,
    kapa_old: 0,
    ruest_old: 0,
    kapa_gesamt: 0,
    anzahl_schichten: 1,
    ueberstunden_min_tag: 0,
    zusatz_ueberstunden: 0,
  },
  {
    arbeitsplatz: 7,
    kapa_new: 3598,
    ruest_new: 1,
    kapa_old: 0,
    ruest_old: 0,
    kapa_gesamt: 0,
    anzahl_schichten: 1,
    ueberstunden_min_tag: 0,
    zusatz_ueberstunden: 0,
  },
  {
    arbeitsplatz: 8,
    kapa_new: 2740,
    ruest_new: 1,
    kapa_old: 0,
    ruest_old: 0,
    kapa_gesamt: 0,
    anzahl_schichten: 1,
    ueberstunden_min_tag: 0,
    zusatz_ueberstunden: 0,
  },
  {
    arbeitsplatz: 9,
    kapa_new: 3600,
    ruest_new: 1,
    kapa_old: 0,
    ruest_old: 0,
    kapa_gesamt: 0,
    anzahl_schichten: 1,
    ueberstunden_min_tag: 0,
    zusatz_ueberstunden: 0,
  },
  { arbeitsplatz: 10, 
    kapa_new: 3600, 
    ruest_new: 1,
    kapa_old: 0,
    ruest_old: 0,
    kapa_gesamt: 0,
    anzahl_schichten: 1,
    ueberstunden_min_tag: 0,
    zusatz_ueberstunden: 0,},
  {
    arbeitsplatz: 11,
    kapa_new: 2700,
    ruest_new: 1,
    kapa_old: 0,
    ruest_old: 0,
    kapa_gesamt: 0,
    anzahl_schichten: 1,
    ueberstunden_min_tag: 0,
    zusatz_ueberstunden: 0,
  },
  {
    arbeitsplatz: 12,
    kapa_new: 2700,
    ruest_new: 1,
    kapa_old: 0,
    ruest_old: 0,
    kapa_gesamt: 0,
    anzahl_schichten: 1,
    ueberstunden_min_tag: 0,
    zusatz_ueberstunden: 0,
  },
  {
    arbeitsplatz: 13,
    kapa_new: 1800,
    ruest_new: 1,
    kapa_old: 0,
    ruest_old: 0,
    kapa_gesamt: 0,
    anzahl_schichten: 1,
    ueberstunden_min_tag: 0,
    zusatz_ueberstunden: 0,
  },
  {
    arbeitsplatz: 14,
    kapa_new: 1380,
    ruest_new: 1,
    kapa_old: 0,
    ruest_old: 0,
    kapa_gesamt: 0,
    anzahl_schichten: 1,
    ueberstunden_min_tag: 0,
    zusatz_ueberstunden: 0,
  },
  {
    arbeitsplatz: 15,
    kapa_new: 2697,
    ruest_new: 1,
    kapa_old: 0,
    ruest_old: 0,
    kapa_gesamt: 0,
    anzahl_schichten: 1,
    ueberstunden_min_tag: 0,
    zusatz_ueberstunden: 0,
  },
];

@Component({
  selector: 'app-kapazitaetsplanung',
  templateUrl: './kapazitaetsplanung.component.html',
  styleUrls: ['./kapazitaetsplanung.component.scss'],
})
export class KapazitaetsplanungComponent implements OnInit {
  idletimecosts$ = this.store.pipe(select(selectImportIdleTimeCosts));
  waitinglistworkstations$ = this.store.pipe(
    select(selectWaitingListWorkstations)
  );

  displayedColumns: string[] = [
    'arbeitsplatz',
    'kapa_new',
    'ruest_new',
    'kapa_old',
    'ruest_old',
    'kapa_gesamt',
    'anzahl_schichten',
    'ueberstunden_min_tag',
    'zusatz_ueberstunden',
  ];
  dataSource = ELEMENT_DATA;
  ruest_dauern = ruest_dauern;
  idlewerte: idle[] = [];
  summe_maschine: summe_maschine[] = [];
  waiting_workplace: waiting_workplace[] = [];
  total_waitinglist: waitinglist[] = [];
  productionlist: Productionlist | undefined;


  constructor(private store: Store<ImportState>,private exportstore: Store<ExportState>) {}

  ngOnInit(): void {
    this.initialisieren();
    this.Bedarf_und_Schichten_berechnen();
    
  }

  initialisieren() {
    // Neuen Kapa bedarf berechnen OHNE Rüstzeit

    // this.productionlist?.production.forEach(product =>{

    //     this.summe_maschine.forEach(maschine =>{

    //         if(product.article in [49,54,29]){maschine.summe = maschine.summe + product.quantity * 6}

    //         if(product.article in [49,54,29]){maschine.summe = maschine.summe + product.quantity * 6}

           
    //     })


    // })

    // sum_m1 = (E49+E54+E29) * 6
    // sum_m2 = (E50+E55+E30) * 5
    // sum_m3 = E51 * 5 + (E56+31) * 6
    // sum_m4 = E1 * 6 + (E2+E3) * 7
    // sum_m6 = E16 * 2 + (E18+E19+E20) * 3
    // sum_m7 = (E10+E11+E12+E13+E14+E15+E18+E19+E20+E26) *2
    // sum_m8 = (E10+E13) + (E11+E12+E14+E15) * 2 + (E18+E19+E20) * 3
    // sum_m9 = (E18+E19+E20) * 2 + (E10+E11+E12+E13+E14+E15) * 3
    // sum_m10 = (E4+E5+E6+E7+E8+E9) * 4
    // sum_m11 = (E4+E5+E6+E7+E8+E9) * 3
    // sum_m12 = (E10+E11+E12+E13+E14+E15) * 3
    // sum_m13 = (E10+E11+E12+E13+E14+E15) * 2
    // sum_m14 = E16 * 3
    // sum_m15 = (E17+E26) * 3

    // Waiting List auslesen
    let waiting_workstations: waitinglistworkstations | undefined;
    this.waitinglistworkstations$.subscribe((i) => (waiting_workstations = i));

    waiting_workstations!.workplace.forEach((workplace: waiting_workplace) => {
      const temp_workplace: waiting_workplace = {id: 0, timeneed: 0, waitinglist: [],};

      temp_workplace.id = workplace.id;
      temp_workplace.timeneed = workplace.timeneed;
      const wt = workplace.waitinglist;

      if (!(workplace.waitinglist == undefined)) {
        if (Array.isArray(wt)) {
          temp_workplace.waitinglist.push(...wt);
          this.total_waitinglist.push(...wt);
        } else {
          temp_workplace.waitinglist.push(wt);
          this.total_waitinglist.push(wt)
        }
      }

      this.waiting_workplace.push(temp_workplace);
    });


    console.log("total waitlingist");
    console.log(this.total_waitinglist)



    // Kapa_old aus Warteschlange berechnen - die in nächster Periode benötigt wird
    this.dataSource.forEach((element) => {


      for (let i = 0; i < this.waiting_workplace.length; i++) {
        // console.log(this.waiting_workplace[i].id);
        // console.log(this.waiting_workplace[i].timeneed);
        // console.log(this.waiting_workplace[i].waitinglist);
        // console.log('arbeitsplatz' + element.arbeitsplatz);
        // console.log('i' + i);

        if (element.arbeitsplatz == this.waiting_workplace[i].id) {
          element.kapa_old = this.waiting_workplace[i].timeneed;
         
          break;
        }
      }
    });

    // Anzahl Rüstevents aus vorperiode übernehmen. (Zwischenspeichern in ruest_new und dann noch multiplizieren mit durschnittliche Dauer des Rüstvorgangs)
    let idlelist: idletimecosts | undefined;
    this.idletimecosts$.subscribe((i) => (idlelist = i));
    idlelist!.workplace.forEach((idleItem) => {
      this.dataSource.forEach((data) => {
        if (data.arbeitsplatz == idleItem.id) {
          data.ruest_new = idleItem.setupevents;
        }
      });
    });

    // Neue Rüstzeit berechnen
    this.dataSource.forEach((data) => {
      this.ruest_dauern.forEach((ruest_zeit) => {
        if (data.arbeitsplatz == ruest_zeit.id) {
          data.ruest_new = data.ruest_new * ruest_zeit.dauer;
        }
      });
    });


    // Alte Rüstzeit aus Warteschlange berechnen

    // anzahl an Rüstevents aus Vorperiode zwischenspeichern in ruest_old
    idlelist!.workplace.forEach((idleItem) => {
      this.dataSource.forEach((data) => {
        if (data.arbeitsplatz == idleItem.id) {
          data.ruest_old = idleItem.setupevents;
        }
      });
    });

    this.dataSource.forEach(data =>{
      this.ruest_dauern.forEach((ruest_zeit) => {
        if(data.arbeitsplatz == ruest_zeit.id && data.kapa_old != 0 && data.kapa_new != 0) {
          data.ruest_old = Math.ceil(Number((data.kapa_old/data.kapa_new)*data.ruest_old)) * ruest_zeit.dauer
        }
        
        if(data.arbeitsplatz == ruest_zeit.id && data.kapa_old != 0 && data.kapa_new == 0){
          data.ruest_old = Math.ceil(Number((ruest_zeit.dauer/data.kapa_old)*data.ruest_old)) * ruest_zeit.dauer
        }

        if(data.arbeitsplatz == ruest_zeit.id && data.kapa_old == 0){
          data.ruest_old = 0;
        }
        
      });
    })
  }

      

  Bedarf_und_Schichten_berechnen() {

    // Gesamtbedarf berechnen
    this.dataSource.forEach((d) => {
      d.kapa_gesamt =
        Number(d.kapa_new) +
        Number(d.ruest_new) +
        Number(d.kapa_old) +
        Number(d.ruest_old) +
        Number(d.zusatz_ueberstunden *5) ;
    });

    // Anzahl an Schichten + Überstunden Minuten ermitteln

    this.dataSource.forEach((d) => {
      if (d.kapa_gesamt > 2400) {
        // 1 Schicht + nur Überstunden
        if (d.kapa_gesamt - 2400 < 1200) {
          d.ueberstunden_min_tag = Math.round((d.kapa_gesamt - 2400) / 5);
        }

        // 2 Schichten + Überstunden
        if (d.kapa_gesamt - 2400 >= 1200) {
          d.anzahl_schichten = 2;

          d.ueberstunden_min_tag = Math.round((d.kapa_gesamt - 4800) / 2 / 5);
          if (d.ueberstunden_min_tag < 0) {
            d.ueberstunden_min_tag = 0;
          }
        }

        // 3 Schichten + Überstunden
        if (d.kapa_gesamt - 2400 >= 4800) {
          d.anzahl_schichten = 3;

          d.ueberstunden_min_tag = Math.round((d.kapa_gesamt - 7200) / 3 / 5);
          if (d.ueberstunden_min_tag < 0) {
            d.ueberstunden_min_tag = 0;
          }
        }
      }
    });
  }


  speichern() {
    this.Bedarf_und_Schichten_berechnen();
  }



}
