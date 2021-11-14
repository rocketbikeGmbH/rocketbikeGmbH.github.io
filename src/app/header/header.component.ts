import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {Router} from '@angular/router';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Daten } from '../daten';
import { AppComponent } from '../app.component';
/*
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
*/

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {

  // stepperOrientation: Observable<StepperOrientation>;

  constructor(private route:Router /*, breakpointObserver: BreakpointObserver*/) {
    /*this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));*/
   }

  ngAfterViewInit() {
  }


  header_anzeigen = true;

  
  onStepChange(event: any): void {
    var change = event.selectedIndex;

    if (change == 0){
      this.route.navigate(['/dateiimport']);
    }

    if (change == 1){
      this.route.navigate(['/absatzplanung']);
    }

    if (change == 2){
      this.route.navigate(['/programmplanung']);
    }

    if (change == 3){
      this.route.navigate(['/kapazitaetsplanung']);
    }

    if (change == 4){
      this.route.navigate(['/mengenplanung']);
    }

    if (change == 5){
      this.route.navigate(['/losgroessenplanung']);
    }

    if (change == 6){
      this.route.navigate(['/dateiexport']);
    }

  }

  ngOnInit() {
  }

}