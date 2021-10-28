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
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { importReducer } from './store/import/import.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { exportReducer } from './store/export/export.reducer';

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
    ProgrammplanungComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatTableModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ importModel: importReducer,  exportModel: exportReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
