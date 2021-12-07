import { LocationStrategy } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

export let browserRefresh = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  title = 'ITool';

  temp : string = '';
  tester : boolean = false;
  header_anzeigen : boolean = false;

  subscription: Subscription;

  constructor(private translate: TranslateService, private route: Router, private route2: ActivatedRoute, private url: LocationStrategy){
    translate.addLangs(['de', 'en'])
    translate.setDefaultLang('de');

    this.subscription = route.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !route.navigated;
        console.log(browserRefresh)
      }
  });
  }

  useLanguage(language: string){
    this.translate.use(language)
  }

  // Funktion um Pfad auszulesen und auf Basis davon zu entscheiden, wann der Header angezeigt wird
  ngOnInit() {

    this.route.events.subscribe((event) => {
      
      if (event instanceof NavigationStart) {
          this.temp = ((event as NavigationStart).url)

          if (this.temp == '/mengenplanung' || this.temp == '/programmplanung' || this.temp == '/absatzplanung' || this.temp == '/kapazitaetsplanung'
          || this.temp == '/losgroessenplanung' || this.temp == '/dateiimport' || this.temp == '/dateiexport') {
            this.tester = true;
          } else {
            this.tester = false;
          }
      }
    });
  }
}