import {
  Component,
  OnInit,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  selectImportIdleTimeCosts,
  selectWaitingListWorkstations,
} from '../store/import/import.selector';
import { selectProductionlist} from '../store/export/export.selector'
import { ImportState } from '../store/import/import.reducer';
import { ExportState } from '../store/export/export.reducer';
import { Productionlist, Production } from '../model/export.model';
import {
  idletimecosts,
  waitinglistworkstations,
  waiting_workplace,
  waitinglist,
} from '../model/import.model';
import { EMPTY } from 'rxjs';


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

let test_produktion: Production[] = [
  { attr_article: 13, attr_quantity: 210 },
  { attr_article: 14, attr_quantity: 140 },
  { attr_article: 15, attr_quantity: 100 },
  { attr_article: 18, attr_quantity: 200 },
  { attr_article: 19, attr_quantity: 150 },
  { attr_article: 20, attr_quantity: 100 },
  { attr_article: 7, attr_quantity: 200 },
  { attr_article: 8, attr_quantity: 150 },
  { attr_article: 9, attr_quantity: 100 },
  { attr_article: 49, attr_quantity: 200 },
  { attr_article: 54, attr_quantity: 150 },
  { attr_article: 29, attr_quantity: 100 },
  { attr_article: 4, attr_quantity: 200 },
  { attr_article: 5, attr_quantity: 150 },
  { attr_article: 6, attr_quantity: 100 },
  { attr_article: 10, attr_quantity: 200 },
  { attr_article: 11, attr_quantity: 150 },
  { attr_article: 12, attr_quantity: 100 },
  { attr_article: 17, attr_quantity: 450 },
  { attr_article: 16, attr_quantity: 460 },
  { attr_article: 50, attr_quantity: 200 },
  { attr_article: 55, attr_quantity: 150 },
  { attr_article: 30, attr_quantity: 100 },
  { attr_article: 51, attr_quantity: 200 },
  { attr_article: 56, attr_quantity: 150 },
  { attr_article: 31, attr_quantity: 100 },
  { attr_article: 26, attr_quantity: 449 },
  { attr_article: 1, attr_quantity: 200 },
  { attr_article: 2, attr_quantity: 150 },
  { attr_article: 3, attr_quantity: 100 },
]


export interface summe_maschine {
  id: number;
  summe: number;
}


 let list_summe_maschine: summe_maschine[] = [
   { id: 1, summe: 0, },
   { id: 2, summe: 0,},
   { id: 3, summe: 0, },
   { id: 4, summe: 0,},
   { id: 6, summe: 0,},
   { id: 7, summe: 0,},
   { id: 8, summe: 0, },
   { id: 9, summe: 0, },
   { id: 10, summe: 0, },
   { id: 11, summe: 0, },
   { id: 12, summe: 0, },
   { id: 13, summe: 0, },
   { id: 14, summe: 0,},
   { id: 15, summe: 0,}
 ]


let ELEMENT_DATA: Kapaelement[] = [
  {
    arbeitsplatz: 1,
    kapa_new: 0,
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
    kapa_new: 0,
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
    kapa_new: 0,
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
    kapa_new: 0,
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
    kapa_new: 0,
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
    kapa_new: 0,
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
    kapa_new: 0,
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
    kapa_new: 0,
    ruest_new: 1,
    kapa_old: 0,
    ruest_old: 0,
    kapa_gesamt: 0,
    anzahl_schichten: 1,
    ueberstunden_min_tag: 0,
    zusatz_ueberstunden: 0,
  },
  { arbeitsplatz: 10, 
    kapa_new: 0, 
    ruest_new: 1,
    kapa_old: 0,
    ruest_old: 0,
    kapa_gesamt: 0,
    anzahl_schichten: 1,
    ueberstunden_min_tag: 0,
    zusatz_ueberstunden: 0,},
  {
    arbeitsplatz: 11,
    kapa_new: 0,
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
    kapa_new: 0,
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
    kapa_new: 0,
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
    kapa_new: 0,
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
    kapa_new: 0,
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
  waitinglistworkstations$ = this.store.pipe(select(selectWaitingListWorkstations));
  productionlist$ = this.exportstore.pipe(select(selectProductionlist));

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
  summe_maschine = list_summe_maschine;
  waiting_workplace: waiting_workplace[] = [];
  total_waitinglist: waitinglist[] = [];
  productionlist: Production[] = [];
  testproduktion = test_produktion;
  dataloaded: boolean = false;


  constructor(private store: Store<ImportState>, private exportstore: Store<ExportState>) {}

  ngOnInit(): void {
    console.log(this.summe_maschine)
    this.initialisieren();
    this.Bedarf_und_Schichten_berechnen();
    
  }

  initialisieren() {

    // Neuen Kapa bedarf berechnen OHNE Rüstzeit

    this.productionlist$.subscribe((i) => (this.productionlist = i));
    console.log("PRODUKTIONLISTE")
    console.log(this.productionlist);

    //this.dataSource.forEach(element =>{
      for(let x = 0; x < 14; x++){


          for(let i = 0; i < this.testproduktion.length; i++){

              console.log("Maschine " + this.dataSource[x].arbeitsplatz)
              console.log("Produkt " + this.testproduktion[i].attr_article)

            // M1
                if([49,54,29].includes(this.testproduktion[i].attr_article) && this.dataSource[x].arbeitsplatz == 1){
                console.log("M1 bevor " + this.dataSource[x].kapa_new) 
                this.dataSource[x].kapa_new = this.dataSource[x].kapa_new + this.testproduktion[i].attr_quantity * 6; 
                  console.log("M1 " + this.dataSource[x].kapa_new)}


          }

    }

    
    // if(this.productionlist.length < 2 && this.dataloaded == true){
    //   console.log("leer oder geladen")}
    // else{
    //     console.log("startet berechnung")

       
    
    // //this.productionlist?.forEach(product =>{
    //  // this.dataSource.forEach(maschine =>{
        

        

    //     this.testproduktion.forEach(product =>{
    //       console.log("TESTDATEN")
    //       console.log(this.testproduktion)

          
          
    //       for(let i = 0; i < 15; i++){
    //         console.log("MASCHINE " + this.dataSource[i].arbeitsplatz)
        
    //         console.log("Produktnummer" + product.attr_article)
    //           // M1
    //          if([49,54,29].includes(product.attr_article)){
    //           console.log("M1 bevor " + this.dataSource[i].kapa_new) 
    //           this.dataSource[i].kapa_new = this.dataSource[i].kapa_new + product.attr_quantity * 6; 
    //           console.log("M1 " + this.dataSource[i].kapa_new)}

            //   // M2
            //   if(product.attr_article in [50,55,30]){maschine.summe = maschine.summe + product.attr_quantity * 5}

            //   //M3 
            //   if(product.attr_article in [51,56,31]){

            //       if(product.attr_article != 51){
            //       maschine.summe = maschine.summe + product.attr_quantity * 6
            //       }
            //       else{
            //         maschine.summe = maschine.summe + product.attr_quantity * 5 }
            //   }

            //   //M4
            //   if(product.attr_article in [1,2,3]){

            //         if(product.attr_article != 1){
            //         maschine.summe = maschine.summe + product.attr_quantity * 7
            //         }
            //         else{
            //           maschine.summe = maschine.summe + product.attr_quantity * 6 }
            //   }

            //    //M6
            //    if(product.attr_article in [16,18,19,20]){

            //         if(product.attr_article != 16){
            //         maschine.summe = maschine.summe + product.attr_quantity * 3
            //         }
            //         else{
            //           maschine.summe = maschine.summe + product.attr_quantity * 2 }
            //       }

            //     // M7
            //     if(product.attr_article in [10,11,12,13,14,15,18,19,20,26]){maschine.summe = maschine.summe + product.attr_quantity * 2}

            //    //M8
            //    if(product.attr_article in [10,13,11,12,14,15,18,19,20]){

            //         if(product.attr_article in [10,13]){
            //         maschine.summe = maschine.summe + product.attr_quantity
            //         }
            //         if(product.attr_article in [11,12,14,15]){
            //           maschine.summe = maschine.summe + product.attr_quantity * 2
            //           }
            //         if(product.attr_article in [18,19,20]){
            //             maschine.summe = maschine.summe + product.attr_quantity * 3
            //           }
                
            //    }

            //     //M9
            //     if(product.attr_article in [18,19,20,10,11,12,13,14,15]){

            //       if(product.attr_article in [18,19,20]){
            //       maschine.summe = maschine.summe + product.attr_quantity * 2
            //       }
            //       else{
            //         maschine.summe = maschine.summe + product.attr_quantity * 3 }
            //     }

            //      // M10
            //  if(product.attr_article in [4,5,6,7,8,9]){maschine.summe = maschine.summe + product.attr_quantity * 4}

            //   // M11
            //   if(product.attr_article in [4,5,6,7,8,9]){maschine.summe = maschine.summe + product.attr_quantity * 3}

            //    // M12
            //  if(product.attr_article in [10,11,12,13,14,15]){maschine.summe = maschine.summe + product.attr_quantity * 3}

            //   // M13
            //   if(product.attr_article in [10,11,12,13,14,15]){maschine.summe = maschine.summe + product.attr_quantity * 2}

            //    // M14
            //  if(product.attr_article == 16){ maschine.summe = maschine.summe + product.attr_quantity * 3}

          //   //  // M15
          //   //  if(product.attr_article in [17,26]){maschine.summe = maschine.summe + product.attr_quantity * 3}

          //    }
          // })
      
    


      //Ermittelten Kapa New bedarf übegeben an anzuzeigende Fields
      // this.dataSource.forEach(datasource =>{

      //     this.summe_maschine.forEach(bedarf =>{
      //       if(datasource.arbeitsplatz == bedarf.id){datasource.kapa_new = bedarf.summe}
      //     })
      // })

      // this.dataloaded = true;
      // console.log(this.dataloaded)
  

    
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



    // Kapa_old aus Warteschlange berechnen - die in nächster Periode benötigt wird
    this.dataSource.forEach((element) => {


      for (let i = 0; i < this.waiting_workplace.length; i++) {
       

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
