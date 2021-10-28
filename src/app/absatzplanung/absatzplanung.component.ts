import { Component, OnInit } from '@angular/core';
import { Daten } from '../daten';


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


  constructor(public D: Daten) {

   }

  ngOnInit(): void {

    this.Vabsatzplan_p1 = this.D.absatzplan_p1;
    this.Vabsatzplan_p2 = this.D.absatzplan_p2;
    this.Vabsatzplan_p3 = this.D.absatzplan_p3;
    this.next_period = this.D.next_period;
  }



  speichern(){

    this.D.absatzplan_p1 = this.Vabsatzplan_p1;
    this.D.absatzplan_p2 = this.Vabsatzplan_p2;
    this.D.absatzplan_p3 = this.Vabsatzplan_p3;


  }

}
