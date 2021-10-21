import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AbsatzplanungComponent } from './absatzplanung/absatzplanung.component';
import { DateiexportComponent } from './dateiexport/dateiexport.component';
import { DateiimportComponent } from './dateiimport/dateiimport.component';
import { KapazitaetsplanungComponent } from './kapazitaetsplanung/kapazitaetsplanung.component';
import { LosgroessenplanungComponent } from './losgroessenplanung/losgroessenplanung.component';
import { MengenplanungComponent } from './mengenplanung/mengenplanung.component';
import { ProgrammplanungComponent } from './programmplanung/programmplanung.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AbsatzplanungComponent,
    DateiexportComponent,
    DateiimportComponent,
    KapazitaetsplanungComponent,
    LosgroessenplanungComponent,
    MengenplanungComponent,
    ProgrammplanungComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
