import { Component, OnInit } from '@angular/core';
import { Daten } from '../daten';
import { select, Store } from '@ngrx/store';
import { selectImportResults, selectImportForecast } from '../store/import/import.selector';
import { ImportState } from '../store/import/import.reducer';
import { forecast, Results } from '../model/import.model';



@Component({
  selector: 'app-absatzplanung',
  templateUrl: './absatzplanung.component.html',
  styleUrls: ['./absatzplanung.component.scss']
})
export class AbsatzplanungComponent implements OnInit {


  Vabsatzplan_p1!: number;
  Vabsatzplan_p2!: number;
  Vabsatzplan_p3!: number;
  next_period!: number;
  forecast$ = this.store.pipe(select(selectImportForecast));
  restults$ = this.store.pipe(select(selectImportResults));

  constructor(public D: Daten, private store : Store<ImportState>) {

   }

  ngOnInit(): void {

    // Prognose Werte auslesen
    let data: forecast | undefined;
    this.forecast$.forEach( i => data = i)
    this.Vabsatzplan_p1 = data!.p1;
    this.Vabsatzplan_p2 = data!.p2;
    this.Vabsatzplan_p3 = data!.p3;

    // Nächste Periode ausgeben
    //this.next_period
    /*
     let p: Results | undefined;
    this.results$.forEach(i => p);
    this.next_period = p!._period + 1;
    console.log(this.next_period);
    */

  }



  speichern(){

   


  }

}
