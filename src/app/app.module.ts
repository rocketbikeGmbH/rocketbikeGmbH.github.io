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
import { MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {NgForm} from '@angular/forms';
import { MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

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
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
