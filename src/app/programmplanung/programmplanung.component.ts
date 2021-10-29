import { Component, OnInit } from '@angular/core';

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
const ENDPRODUKT_DATEN: Endprodukte[] = [
  {artikelnummer: 1, aktueller_lagerbestand: 300, in_bearbeitung: 100, in_warteschlange: 0, geplanter_endbestand: 100, vertriebswunsch: 50, direktverkauf: 200, produktionsauftraege: 300},
  {artikelnummer: 2, aktueller_lagerbestand: 200, in_bearbeitung: 50, in_warteschlange: 0, geplanter_endbestand: 50, vertriebswunsch: 50, direktverkauf: 10, produktionsauftraege: 300},
  {artikelnummer: 3, aktueller_lagerbestand: 150, in_bearbeitung: 100, in_warteschlange: 50, geplanter_endbestand: 60, vertriebswunsch: 50, direktverkauf: 80, produktionsauftraege: 250}
];

@Component({
  selector: 'app-programmplanung',
  templateUrl: './programmplanung.component.html',
  styleUrls: ['./programmplanung.component.scss']
})

export class ProgrammplanungComponent implements OnInit {


  // Tabelle
  displayedColumns: string[] = ['artikelnummer', 'aktueller_lagerbestand', 'in_bearbeitung', 'in_warteschlange', 'geplanter_endbestand', 'vertriebswunsch', 'direktverkauf', 'produktionsauftraege'];
  dataSource = ENDPRODUKT_DATEN;
  
  constructor() { 
  }

  ngOnInit(): void {
  }

}
