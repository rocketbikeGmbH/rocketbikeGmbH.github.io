import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectImportIdleTimeCosts, selectImportResults } from '../store/import/import.selector';
import { ImportState } from '../store/import/import.reducer';
//import { Kapaelement } from '../model/import.model';
import { productionlist } from '../model/export.model';
import { idletimecosts } from '../model/import.model';


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
  {arbeitsplatz: 1, kapa_new: 0, ruest_new: 1, kapa_old: 2, ruest_old: 2, kapa_gesamt: 3, anzahl_schichten: 2, ueberstunden_min_tag: 2, zusatz_ueberstunden: 2},
  {arbeitsplatz: 2, kapa_new: 0, ruest_new: 1, kapa_old: 2, ruest_old: 2, kapa_gesamt: 3, anzahl_schichten: 2, ueberstunden_min_tag: 2, zusatz_ueberstunden: 2},
  {arbeitsplatz: 3, kapa_new: 0, ruest_new: 1, kapa_old: 2, ruest_old: 2, kapa_gesamt: 3, anzahl_schichten: 2, ueberstunden_min_tag: 2, zusatz_ueberstunden: 2},
  {arbeitsplatz: 4, kapa_new: 0, ruest_new: 1, kapa_old: 2, ruest_old: 2, kapa_gesamt: 3, anzahl_schichten: 2, ueberstunden_min_tag: 2, zusatz_ueberstunden: 2},
  {arbeitsplatz: 6, kapa_new: 0, ruest_new: 1, kapa_old: 2, ruest_old: 2, kapa_gesamt: 3, anzahl_schichten: 2, ueberstunden_min_tag: 2, zusatz_ueberstunden: 2},
  {arbeitsplatz: 7, kapa_new: 0, ruest_new: 1, kapa_old: 2, ruest_old: 2, kapa_gesamt: 3, anzahl_schichten: 2, ueberstunden_min_tag: 2, zusatz_ueberstunden: 2},
  {arbeitsplatz: 8, kapa_new: 0, ruest_new: 1, kapa_old: 2, ruest_old: 2, kapa_gesamt: 3, anzahl_schichten: 2, ueberstunden_min_tag: 2, zusatz_ueberstunden: 2},
  {arbeitsplatz: 9, kapa_new: 0, ruest_new: 1, kapa_old: 2, ruest_old: 2, kapa_gesamt: 3, anzahl_schichten: 2, ueberstunden_min_tag: 2, zusatz_ueberstunden: 2},
  {arbeitsplatz: 10, kapa_new: 0, ruest_new: 1, kapa_old: 2, ruest_old: 2, kapa_gesamt: 3, anzahl_schichten: 2, ueberstunden_min_tag: 2, zusatz_ueberstunden: 2},
  {arbeitsplatz: 11, kapa_new: 0, ruest_new: 1, kapa_old: 2, ruest_old: 2, kapa_gesamt: 3, anzahl_schichten: 2, ueberstunden_min_tag: 2, zusatz_ueberstunden: 2},
  {arbeitsplatz: 12, kapa_new: 0, ruest_new: 1, kapa_old: 2, ruest_old: 2, kapa_gesamt: 3, anzahl_schichten: 2, ueberstunden_min_tag: 2, zusatz_ueberstunden: 2},
  {arbeitsplatz: 13, kapa_new: 0, ruest_new: 1, kapa_old: 2, ruest_old: 2, kapa_gesamt: 3, anzahl_schichten: 2, ueberstunden_min_tag: 2, zusatz_ueberstunden: 2},
  {arbeitsplatz: 14, kapa_new: 0, ruest_new: 1, kapa_old: 2, ruest_old: 2, kapa_gesamt: 3, anzahl_schichten: 2, ueberstunden_min_tag: 2, zusatz_ueberstunden: 2},
  {arbeitsplatz: 15, kapa_new: 0, ruest_new: 1, kapa_old: 2, ruest_old: 2, kapa_gesamt: 3, anzahl_schichten: 2, ueberstunden_min_tag: 2, zusatz_ueberstunden: 2},
];



@Component({
  selector: 'app-kapazitaetsplanung',
  templateUrl: './kapazitaetsplanung.component.html',
  styleUrls: ['./kapazitaetsplanung.component.scss']
})
export class KapazitaetsplanungComponent implements OnInit {


  idletimecosts$ = this.store.pipe(select(selectImportIdleTimeCosts));


  displayedColumns: string[] = ['arbeitsplatz', 'kapa_new', 'ruest_new', 'kapa_old', 'ruest_old', 'kapa_gesamt','anzahl_schichten', 'ueberstunden_min_tag', 'zusatz_ueberstunden'];
  dataSource = ELEMENT_DATA;
  ruest_dauern = ruest_dauern;
  idlewerte: idle[] = [];
  sum_gesamt: sum_gesamt[] = [];

  


 


  constructor(private store: Store<ImportState>) { }

  ngOnInit(): void {


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


    // Anzahl Rüstevents aus vorperiode übernehmen
    let data: idletimecosts | undefined;
    this.idletimecosts$.subscribe((i) => (data= i));
    console.log("Kapa Plan")
    console.log(data?.workplace[1])


    // Rüstvorgänge der letzten Periode auslesen
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
        d.kapa_gesamt = d.kapa_new + d.ruest_new + d.kapa_old + d.ruest_old + d.zusatz_ueberstunden
    })

    // Anzahl an Schichten ermitteln (falls Zeit > 2.400 und Restwert > 1.200 dann zusatzschicht )

    this.dataSource.forEach(d =>{


    })

    // Überstunden Minuten ermitteln (durch 5 teilen!)

    // Gewünschte Extra Zeit addieren auf Überstunden (mit 5 multiplizieren!)





    



}



  speichern(){

  }
  
  

}
