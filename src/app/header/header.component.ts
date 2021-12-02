import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Daten } from '../daten';
import { AppComponent } from '../app.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StepperServiceService } from '../stepper-service.service';
import { MatStepper } from '@angular/material/stepper';
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
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  @ViewChild('stepper') stepper: any;

  // stepperOrientation: Observable<StepperOrientation>;

  constructor(private route: Router /*, breakpointObserver: BreakpointObserver*/, private stepperservice: StepperServiceService) {
    /*this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));*/
  }

  ngAfterViewInit() {
  }

  state = 'done';

  completed_dateiimport = false;
  completed_absatzplanung = false;
  completed_programmplanung = false;
  completed_kapaplanung = false;
  completed_mengenplanung = false;
  completed_lossgroessenplanung = false;

  stepper_index = 0;
  stepper_name!: MatStepper;

  header_anzeigen = true;

  onStepChange(event: any): void {

    var change = event.selectedIndex;

    if (change == 0) {
      this.route.navigate(['/dateiimport']);
    }

    if (change == 1) {
      this.route.navigate(['/absatzplanung']);
    }

    if (change == 2) {
      this.route.navigate(['/programmplanung']);
    }

    if (change == 3) {
      this.route.navigate(['/kapazitaetsplanung']);
    }

    if (change == 4) {
      this.route.navigate(['/mengenplanung']);
    }

    if (change == 5) {
      this.route.navigate(['/losgroessenplanung']);
    }

    if (change == 6) {
      this.route.navigate(['/dateiexport']);
    }

  }

  ngOnInit() {
    this.stepperservice.actionObservable.subscribe(() => {
      this.completed_dateiimport = true;
      switch (this.stepperservice.typer) {
        case 'dateiimport': {
          this.completed_dateiimport = true;
          this.stepper.linear = false
          this.stepper.selectedIndex = 1
          setTimeout(() => {
            this.stepper.linear = true;
          });
          break;
        }
        case 'absatzplanung': {
          this.completed_absatzplanung = true;
          this.stepper.linear = false
          this.stepper.selectedIndex = 2
          setTimeout(() => {
            this.stepper.linear = true;
          });
          break;
        }
        case 'programmplanung': {
          this.completed_programmplanung = true;
          this.stepper.linear = false
          this.stepper.selectedIndex = 3
          setTimeout(() => {
            this.stepper.linear = true;
          });
          break;
        }
        case 'kapaplanung': {
          this.completed_kapaplanung = true;
          this.stepper.linear = false
          this.stepper.selectedIndex = 4
          setTimeout(() => {
            this.stepper.linear = true;
          });
          break;
        }
        case 'mengenplanung': {
          this.completed_mengenplanung = true;
          this.stepper.linear = false
          this.stepper.selectedIndex = 5
          setTimeout(() => {
            this.stepper.linear = true;
          });
          break;
        }
        case 'losgroessenplanung': {
          this.completed_lossgroessenplanung = true;
          this.stepper.linear = false
          this.stepper.selectedIndex = 6
          setTimeout(() => {
            this.stepper.linear = true;
          });
          break;
        }
      }
    });
  }
}