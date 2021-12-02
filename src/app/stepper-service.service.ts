import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StepperServiceService {

  action = new Subject<boolean>();
  actionObservable = this.action.asObservable();

  dateiimport_done = false;
  absatzplan_done = false;
  programmplan_done = false;
  kapaplan_done = false;
  mengenplan_done = false;
  losgroessenplan_done = false;
  
  typer = '';

  constructor() { }

  set_dateiimport(type: string) {

    switch(type) {
      case 'dateiimport': {
        this.dateiimport_done = true;
        this.typer = type;
        this.action.next(true);
        break;
      }
      case 'absatzplanung': {
        this.absatzplan_done = true;
        this.typer = type;
        this.action.next(true);
        break;
      }
      case 'programmplanung': {
        this.programmplan_done = true;
        this.typer = type;
        this.action.next(true);
        break;
      }
      case 'kapaplanung': {
        this.kapaplan_done = true;
        this.typer = type;
        this.action.next(true);
        break;
      }
      case 'mengenplanung': {
        this.mengenplan_done  = true;
        this.typer = type;
        this.action.next(true);
        break;
      }
      case 'losgroessenplanung': {
        this.losgroessenplan_done = true;
        this.typer = type;
        this.action.next(true);
        break;
      }
    }

  }
}
