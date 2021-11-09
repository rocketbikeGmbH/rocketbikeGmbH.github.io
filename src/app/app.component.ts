import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ITool';
  constructor(private translate: TranslateService){
    translate.addLangs(['de', 'en'])
    translate.setDefaultLang('de');
  }

  useLanguage(language: string){
    this.translate.use(language)
  }


}
