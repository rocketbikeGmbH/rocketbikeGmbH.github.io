import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Daten } from '../daten';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private route:Router, private daten: Daten) { 
    
  }

  onStepChange(event: any): void {
    var change = event.selectedIndex;

    if (change == 0){
      this.route.navigate(['/']);
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