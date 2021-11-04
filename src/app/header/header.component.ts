import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { StepperSelectionEvent } from '@angular/cdk/stepper';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private route:Router) { }

  goto_dateiimport() {
    this.route.navigate(['/']);
  }

  goto_absatzplanung() {
      this.route.navigate(['/absatzplanung']);
  }

  goto_programmplanung() {
    this.route.navigate(['/programmplanung']);
  }

  goto_kapazitaetsplanung() {
    this.route.navigate(['/kapazitaetsplanung']);
  }
 
  goto_mengenplanung() {
    this.route.navigate(['/mengenplanung']);
  }

  goto_losgroessenplanung() {
    this.route.navigate(['/losgroessenplanung']);
  }

  goto_dateiexport() {
    this.route.navigate(['/dateiexport']);
  }

  ngOnInit() {
  }

}
