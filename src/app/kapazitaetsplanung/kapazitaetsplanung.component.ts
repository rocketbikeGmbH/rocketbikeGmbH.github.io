import { Component, OnInit } from '@angular/core';
import { Daten } from '../daten';
import { select, Store } from '@ngrx/store';
import { selectImportResults } from '../store/import/import.selector';
import { ImportState } from '../store/import/import.reducer';
//import { Kapaelement } from '../model/import.model';

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

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  test: number;
}

const ELEMENT_DATA: Kapaelement[] = [
  {arbeitsplatz: 1, kapa_new: 100, ruest_new: 1, kapa_old: 2, ruest_old: 2, kapa_gesamt: 3, anzahl_schichten: 2, ueberstunden_min_tag: 2, zusatz_ueberstunden: 2},
  {arbeitsplatz: 2, kapa_new: 100, ruest_new: 1, kapa_old: 2, ruest_old: 2, kapa_gesamt: 3, anzahl_schichten: 2, ueberstunden_min_tag: 2, zusatz_ueberstunden: 2},
  {arbeitsplatz: 3, kapa_new: 100, ruest_new: 1, kapa_old: 2, ruest_old: 2, kapa_gesamt: 3, anzahl_schichten: 2, ueberstunden_min_tag: 2, zusatz_ueberstunden: 2},
  {arbeitsplatz: 4, kapa_new: 100, ruest_new: 1, kapa_old: 2, ruest_old: 2, kapa_gesamt: 3, anzahl_schichten: 2, ueberstunden_min_tag: 2, zusatz_ueberstunden: 2},

];



@Component({
  selector: 'app-kapazitaetsplanung',
  templateUrl: './kapazitaetsplanung.component.html',
  styleUrls: ['./kapazitaetsplanung.component.scss']
})
export class KapazitaetsplanungComponent implements OnInit {

  //  <input matInput type="number" name="Vabsatzplan_p1" [(ngModel)]="Vabsatzplan_p1"/>

  displayedColumns: string[] = ['arbeitsplatz', 'kapa_new', 'ruest_new', 'kapa_old', 'ruest_old', 'kapa_gesamt','anzahl_schichten', 'ueberstunden_min_tag', 'zusatz_ueberstunden'];
  dataSource = ELEMENT_DATA;
  
  bedarf_m1: number = 0;
  bedarf_m2: number = 0;
  bedarf_m3: number = 0;
  bedarf_m4: number = 0;
  bedarf_m6: number = 0;
  bedarf_m7: number = 0;
  bedarf_m8: number = 0;
  bedarf_m9: number = 0;
  bedarf_m10: number = 0;
  bedarf_m11: number = 0;
  bedarf_m12: number = 0;
  bedarf_m13: number = 0;
  bedarf_m14: number = 0;
  bedarf_m15: number = 0;

  constructor() { }

  ngOnInit(): void {

    

    



  }




  speichern(){

  }
  
  

}
