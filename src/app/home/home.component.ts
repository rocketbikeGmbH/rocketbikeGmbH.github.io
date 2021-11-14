import { Component, EventEmitter, OnInit } from '@angular/core';
import { Daten } from '../daten';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  constructor(private daten: Daten, private router: Router, private translate: TranslateService) {
    translate.addLangs(['de', 'en'])
    translate.setDefaultLang('de');
   }

   useLanguage(language: string){
    this.translate.use(language)
  }

  onClick(event :Event){
    event.preventDefault();
    this.router.navigate(['/dateiimport'])
  }

  ngOnInit(): void {
  }
}
