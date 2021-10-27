import { Component, OnInit } from '@angular/core';
import { Daten } from '../daten';
import { select, Store } from '@ngrx/store';
import { selectImportResults } from '../store/import/import.selector';
import { ImportState } from '../store/import/import.reducer';


@Component({
  selector: 'app-absatzplanung',
  templateUrl: './absatzplanung.component.html',
  styleUrls: ['./absatzplanung.component.scss']
})
export class AbsatzplanungComponent implements OnInit {


  Vabsatzplan_p1!: number;
  Vabsatzplan_p2!: number;
  Vabsatzplan_p3!: number;
  forecast$ = this.store.pipe(select(selectImportResults));

  constructor(public D: Daten, private store : Store<ImportState>) {

   }

  ngOnInit(): void {

    this.Vabsatzplan_p1 = this.D.absatzplan_p1;
    this.Vabsatzplan_p2 = this.D.absatzplan_p2;
    this.Vabsatzplan_p3 = this.D.absatzplan_p3;
    let data = undefined;

    this.forecast$.forEach( i => data = i)
    console.log(data);
  }



  speichern(){

    this.D.absatzplan_p1 = this.Vabsatzplan_p1;
    this.D.absatzplan_p2 = this.Vabsatzplan_p2;
    this.D.absatzplan_p3 = this.Vabsatzplan_p3;


  }

}
