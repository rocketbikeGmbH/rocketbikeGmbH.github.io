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



const ELEMENT_DATA: Kapaelement[] = [
  {arbeitsplatz: 1, kapa_new: 100, ruest_new: 1, kapa_old: 2, ruest_old: 2, kapa_gesamt: 3, anzahl_schichten: 2, ueberstunden_min_tag: 2, zusatz_ueberstunden: 2},
  {arbeitsplatz: 2, kapa_new: 100, ruest_new: 1, kapa_old: 2, ruest_old: 2, kapa_gesamt: 3, anzahl_schichten: 2, ueberstunden_min_tag: 2, zusatz_ueberstunden: 2},
  {arbeitsplatz: 3, kapa_new: 100, ruest_new: 1, kapa_old: 2, ruest_old: 2, kapa_gesamt: 3, anzahl_schichten: 2, ueberstunden_min_tag: 2, zusatz_ueberstunden: 2},
  {arbeitsplatz: 4, kapa_new: 100, ruest_new: 1, kapa_old: 2, ruest_old: 2, kapa_gesamt: 3, anzahl_schichten: 2, ueberstunden_min_tag: 2, zusatz_ueberstunden: 2},
  {arbeitsplatz: 4, kapa_new: 100, ruest_new: 1, kapa_old: 2, ruest_old: 2, kapa_gesamt: 3, anzahl_schichten: 2, ueberstunden_min_tag: 2, zusatz_ueberstunden: 2},


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
  
  sum_m1: number = 0;
  sum_m2: number = 0;
  sum_m3: number = 0;
  sum_m4: number = 0;
  sum_m6: number = 0;
  sum_m7: number = 0;
  sum_m8: number = 0;
  sum_m9: number = 0;
  sum_m10: number = 0;
  sum_m11: number = 0;
  sum_m12: number = 0;
  sum_m13: number = 0;
  sum_m14: number = 0;
  sum_m15: number = 0;

  // M12 bis M14 haben Rüstzeit = 0
  ruest_dauer_m1: number = 20;
  ruest_dauer_m2: number = 27;
  ruest_dauer_m3: number = 20;
  ruest_dauer_m4: number = 27;
  ruest_dauer_m6: number = 15;
  ruest_dauer_m7: number = 23;
  ruest_dauer_m8: number = 18;
  ruest_dauer_m9:number = 16;
  ruest_dauer_m10:number = 20;
  ruest_dauer_m11: number = 17;
  ruest_dauer_m15:number = 15;


  constructor(private store: Store<ImportState>) { }

  ngOnInit(): void {

    let data: idletimecosts | undefined;
        this.idletimecosts$.subscribe((i) => (data= i));
        console.log("Kapa Plan")
        console.log(data?.workplace[1])

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

    // Neue Rüstzeit berechnen

    // Alte Kapa aus Warteschlange berechnen

    // Alte Rüstzeit aus Warteschlange berechnen

    // Gesamtbedarf berechnen

    // Anzahl an Schichten ermitteln (falls Zeit > 2.400 und Restwert > 1.200 dann zusatzschicht )

    // Überstunden Minuten ermitteln (durch 5 teilen!)

    // Gewünschte Extra Zeit addieren auf Überstunden





    



  }



  speichern(){

  }
  
  

}
