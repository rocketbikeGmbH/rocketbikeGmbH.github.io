import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DateiimportComponent } from './dateiimport/dateiimport.component'
import { AbsatzplanungComponent } from './absatzplanung/absatzplanung.component'
import { ProgrammplanungComponent} from './programmplanung/programmplanung.component'
import { MengenplanungComponent } from './mengenplanung/mengenplanung.component'
import { KapazitaetsplanungComponent} from './kapazitaetsplanung/kapazitaetsplanung.component'
import { LosgroessenplanungComponent} from './losgroessenplanung/losgroessenplanung.component'
import { DateiexportComponent} from './dateiexport/dateiexport.component'

const routes: Routes = [
  { path: '', component: DateiimportComponent },
  { path: 'absatzplanung', component: AbsatzplanungComponent },
  { path: 'programmplanung', component: ProgrammplanungComponent },
  { path: 'mengenplanung', component: MengenplanungComponent },
  { path: 'kapazitaetsplanung', component: KapazitaetsplanungComponent },
  { path: 'losgroessenplanung', component: LosgroessenplanungComponent },
  { path: 'dateiexport', component: DateiexportComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }