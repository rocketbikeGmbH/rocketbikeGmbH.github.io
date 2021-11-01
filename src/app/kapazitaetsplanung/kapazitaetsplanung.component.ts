import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectImportIdleTimeCosts, selectImportResults, selectWaitingListWorkstations } from '../store/import/import.selector';
import { ImportState } from '../store/import/import.reducer';
//import { Kapaelement } from '../model/import.model';
import { productionlist } from '../model/export.model';
import { idletimecosts, waitinglistworkstations, waiting_workplace, waitinglist } from '../model/import.model';
import { not } from '@angular/compiler/src/output/output_ast';
import { async } from 'rxjs';



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

export interface idle{
  id: number;
  setupevents: number;
}

export interface ruest_dauer{
  id: number;
  dauer:number;
}

let ruest_dauern: ruest_dauer[] = [
  {id: 1, dauer:20},
  {id: 2, dauer:27},
  {id: 3, dauer:20},
  {id: 4, dauer:27},
  {id: 6, dauer:15},
  {id: 7, dauer:23},
  {id: 8, dauer:18},
  {id: 9, dauer:16},
  {id: 10, dauer:20},
  {id: 11, dauer:17},
  {id: 12, dauer:0},
  {id: 13, dauer:0},
  {id: 14, dauer:0},
  {id: 15, dauer:15},
]

export interface sum_gesamt{
  id: number;
  sum: number;
}



let ELEMENT_DATA: Kapaelement[] = [
  {arbeitsplatz: 1, kapa_new: 5000, ruest_new: 1, kapa_old: 0, ruest_old: 2, kapa_gesamt: 0, anzahl_schichten: 1, ueberstunden_min_tag: 0, zusatz_ueberstunden: 2},
  {arbeitsplatz: 2, kapa_new: 0, ruest_new: 1, kapa_old: 0, ruest_old: 2, kapa_gesamt: 0, anzahl_schichten: 1, ueberstunden_min_tag: 0, zusatz_ueberstunden: 2},
  {arbeitsplatz: 3, kapa_new: 0, ruest_new: 1, kapa_old: 0, ruest_old: 2, kapa_gesamt: 0, anzahl_schichten: 1, ueberstunden_min_tag: 0, zusatz_ueberstunden: 2},
  {arbeitsplatz: 4, kapa_new: 0, ruest_new: 1, kapa_old: 0, ruest_old: 2, kapa_gesamt: 0, anzahl_schichten: 1, ueberstunden_min_tag: 0, zusatz_ueberstunden: 2},
  {arbeitsplatz: 6, kapa_new: 0, ruest_new: 1, kapa_old: 0, ruest_old: 2, kapa_gesamt: 0, anzahl_schichten: 1, ueberstunden_min_tag: 0, zusatz_ueberstunden: 2},
  {arbeitsplatz: 7, kapa_new: 0, ruest_new: 1, kapa_old: 0, ruest_old: 2, kapa_gesamt: 0, anzahl_schichten: 1, ueberstunden_min_tag: 0, zusatz_ueberstunden: 2},
  {arbeitsplatz: 8, kapa_new: 0, ruest_new: 1, kapa_old: 0, ruest_old: 2, kapa_gesamt: 0, anzahl_schichten: 1, ueberstunden_min_tag: 0, zusatz_ueberstunden: 2},
  {arbeitsplatz: 9, kapa_new: 0, ruest_new: 1, kapa_old: 0, ruest_old: 2, kapa_gesamt: 0, anzahl_schichten: 1, ueberstunden_min_tag: 0, zusatz_ueberstunden: 2},
  {arbeitsplatz: 10, kapa_new: 0, ruest_new: 1, kapa_old: 0, ruest_old: 2, kapa_gesamt: 0, anzahl_schichten: 1, ueberstunden_min_tag: 0, zusatz_ueberstunden: 2},
  {arbeitsplatz: 11, kapa_new: 0, ruest_new: 1, kapa_old: 0, ruest_old: 2, kapa_gesamt: 0, anzahl_schichten: 1, ueberstunden_min_tag: 0, zusatz_ueberstunden: 2},
  {arbeitsplatz: 12, kapa_new: 0, ruest_new: 1, kapa_old: 0, ruest_old: 2, kapa_gesamt: 0, anzahl_schichten: 1, ueberstunden_min_tag: 0, zusatz_ueberstunden: 2},
  {arbeitsplatz: 13, kapa_new: 0, ruest_new: 1, kapa_old: 0, ruest_old: 2, kapa_gesamt: 0, anzahl_schichten: 1, ueberstunden_min_tag: 0, zusatz_ueberstunden: 2},
  {arbeitsplatz: 14, kapa_new: 0, ruest_new: 1, kapa_old: 0, ruest_old: 2, kapa_gesamt: 0, anzahl_schichten: 1, ueberstunden_min_tag: 0, zusatz_ueberstunden: 2},
  {arbeitsplatz: 15, kapa_new: 0, ruest_new: 1, kapa_old: 0, ruest_old: 2, kapa_gesamt: 0, anzahl_schichten: 1, ueberstunden_min_tag: 0, zusatz_ueberstunden: 2},
];




@Component({
  selector: 'app-kapazitaetsplanung',
  templateUrl: './kapazitaetsplanung.component.html',
  styleUrls: ['./kapazitaetsplanung.component.scss']
})
export class KapazitaetsplanungComponent implements OnInit {


  idletimecosts$ = this.store.pipe(select(selectImportIdleTimeCosts));
  waitinglistworkstations$ = this.store.pipe(select(selectWaitingListWorkstations));


  displayedColumns: string[] = ['arbeitsplatz', 'kapa_new', 'ruest_new', 'kapa_old', 'ruest_old', 'kapa_gesamt','anzahl_schichten', 'ueberstunden_min_tag', 'zusatz_ueberstunden'];
  dataSource = ELEMENT_DATA;
  ruest_dauern = ruest_dauern;
  idlewerte: idle[] = [];
  sum_gesamt: sum_gesamt[] = [];
  waiting_workplace: waiting_workplace[] = [];
  waitinglist: waitinglist[] = [];


  temp_workplace: waiting_workplace = {id:0, timeneed:0, waitinglist: this.waitinglist}


  

  constructor(private store: Store<ImportState>) { }

   ngOnInit(): void {}

     async initialisieren(){

    // Neuen Kapa bedarf berechnen OHNE Rüstzeit

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
    this.waitinglistworkstations$.subscribe((i) => (waiting_workstations=i));
    console.log("WAITINGWORKSTATIONS")
    console.log(waiting_workstations?.workplace)

    

   let i:number = 0;
    waiting_workstations!.workplace.forEach((workplace: waiting_workplace) =>{
         
         this.temp_workplace.id = workplace.id;
        this.temp_workplace.timeneed = workplace.timeneed;
        this.temp_workplace.waitinglist = [];


        if(!(workplace.waitinglist === undefined)){
          this.temp_workplace.waitinglist = workplace.waitinglist;
          // this.workplace.waitinglist.push(worklpace.waitinglist);
        }

       // console.log(this..id)
        //console.log(this.workplace.timeneed)
        //console.log(this.workplace.waitinglist)
       
       this.waiting_workplace.push(this.temp_workplace);

        console.log("NEU ANGELEGTER DATENSATZ")
        //console.log(this.waiting_workplace);
        console.log(this.waiting_workplace[i].id)
        console.log(this.waiting_workplace[i].timeneed)
        console.log(this.waiting_workplace[i].waitinglist)


      //console.log("laenge")
      //console.log(this.waiting_workplace.length)
      i = i +1
    })

  }
  

      async kapa_old_berechnen() {

            console.log("kapa_old_berechnen_start")

            this.dataSource.forEach(element =>{


                for(let i = 0; i < 14; i++){

                  console.log(this.waiting_workplace[i].id)
                  console.log(this.waiting_workplace[i].timeneed)
                  console.log(this.waiting_workplace[i].waitinglist)
                  // console.log("arbeitsplatz" + e.arbeitsplatz)
                  // console.log("i" + i);
        
                  if(element.arbeitsplatz == this.waiting_workplace[i].id){ 
                    console.log("ID IDENTISCH")
                    element.kapa_old = this.waiting_workplace[i].timeneed;
                    console.log(element.kapa_old);
                    break;
                  }
               }
            })
        
      
            console.log("kapa_old_berechnen_ENDE")
      
            // console.log(this.waiting_workplace[6].id)
    }
 
    
      //  this.waiting_workplace.forEach(element =>{
      //    console.log("id " + element.id)
      //    console.log("timeneed " + element.timeneed)
      //    console.log(element.waitinglist)
      //  })
 

    // //   console.log("wl" + wl.waitinglist)
    //     // wl.waitinglist.forEach(wll =>{
    //     //   console.log('wll:' + wll)
    //     //   //this.waitinglist.push(wll);
    //     // })
      
   


  
    stammwerte_berechnen(){

      console.log("STAMMWERTE_berechnen_start")
    // Anzahl Rüstevents aus vorperiode übernehmen. (Zwischenspeichern in ruest_new und dann noch multiplizieren mit durschnittliche Dauer des Rüstvorgangs)
          let data: idletimecosts | undefined;
          this.idletimecosts$.subscribe((i) => (data= i));
          data!.workplace.forEach(d =>{

            this.dataSource.forEach(e =>{
              if(e.arbeitsplatz == d.id){
                e.ruest_new = d.setupevents;
              }
            })
         })

          // Neue Rüstzeit berechnen
        this.dataSource.forEach(d =>{
            this.ruest_dauern.forEach(r =>{
              if(d.arbeitsplatz == r.id){
                d.ruest_new = d.ruest_new * r.dauer
              }
            })
        })


// Alte Kapa aus Warteschlange berechnen

// Alte Rüstzeit aus Warteschlange berechnen

      // Gesamtbedarf berechnen
      this.dataSource.forEach(d =>{
          d.kapa_gesamt = Number(d.kapa_new) + Number(d.ruest_new) + Number(d.kapa_old) + Number(d.ruest_old) + Number(d.zusatz_ueberstunden) * 5;
      })

// Anzahl an Schichten + Überstunden Minuten ermitteln

      this.dataSource.forEach(d =>{

        if(d.kapa_gesamt > 2400){

              // 1 Schicht + nur Überstunden
              if((d.kapa_gesamt - 2400) < 1200){
                d.ueberstunden_min_tag = Math.round((d.kapa_gesamt - 2400) / 5);
              }

              // 2 Schichten + Überstunden
              if((d.kapa_gesamt - 2400) >= 1200){
                d.anzahl_schichten = 2;

                d.ueberstunden_min_tag = Math.round(((d.kapa_gesamt - 4800)/2) / 5); 
                if(d.ueberstunden_min_tag < 0){ d.ueberstunden_min_tag = 0;}
              }

              // 3 Schichten + Überstunden
              if((d.kapa_gesamt - 2400) >= 4800){
                d.anzahl_schichten = 3;

                d.ueberstunden_min_tag = Math.round(((d.kapa_gesamt - 7200)/3) / 5);  
                if(d.ueberstunden_min_tag < 0){ d.ueberstunden_min_tag = 0;}
              }

          }
        })
 }
    


    // Gewünschte Extra Zeit addieren auf Kapa_Gesamt (mit 5 multiplizieren!)



   speichern(){
     this.initialisieren();
     this.kapa_old_berechnen();
     this.stammwerte_berechnen();

  }
  
}
