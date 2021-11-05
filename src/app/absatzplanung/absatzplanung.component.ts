import { Component, OnInit } from '@angular/core';
import { Daten } from '../daten';
import { select, Store } from '@ngrx/store';
import { selectImportResults, selectImportForecast } from '../store/import/import.selector';
import { ImportState } from '../store/import/import.reducer';
import { forecast, Results } from '../model/import.model';
import { Sellwish, Item, Item2, Selldirect } from '../model/export.model';
import { ExportState } from '../store/export/export.reducer';
import { addSelldirect, addSellwish, addSellwishItem } from '../store/export/export.actions';
import { Router } from '@angular/router';



@Component({
  selector: 'app-absatzplanung',
  templateUrl: './absatzplanung.component.html',
  styleUrls: ['./absatzplanung.component.scss']
})
export class AbsatzplanungComponent implements OnInit {


  Vabsatzplan_p1: number = 0;
  Vabsatzplan_p2: number = 0;
  Vabsatzplan_p3: number = 0;

  V_direkt_menge_p1: number = 0;
  V_direkt_menge_p2: number = 0;
  V_direkt_menge_p3: number = 0;

  V_direkt_preis_p1: number = 0;
  V_direkt_preis_p2: number = 0;
  V_direkt_preis_p3: number = 0;

  V_direkt_strafe_p1: number = 0;
  V_direkt_strafe_p2: number = 0;
  V_direkt_strafe_p3: number = 0;




 
  forecast$ = this.store.pipe(select(selectImportForecast));
  restults$ = this.store.pipe(select(selectImportResults));

  constructor(public D: Daten, private store : Store<ImportState>, private exportstore: Store<ExportState>, private router: Router) {

   }

  ngOnInit(): void {

    // Prognose Werte auslesen
    let data: forecast | undefined;
    this.forecast$.forEach( i => data = i)
    this.Vabsatzplan_p1 = data!.p1;
    this.Vabsatzplan_p2 = data!.p2;
    this.Vabsatzplan_p3 = data!.p3;

  

  }



  speichern(){
    let list_verkauf_item: Item[] = [];
    let temp_verkauf_item: Item = {attr_article: 0, attr_quantity: 0};

    if(this.Vabsatzplan_p1 > 0){
      temp_verkauf_item.attr_article = 1;
      temp_verkauf_item.attr_quantity = this.Vabsatzplan_p1;
      list_verkauf_item.push(temp_verkauf_item);
    }
    if(this.Vabsatzplan_p2 > 0){
      temp_verkauf_item.attr_article = 2;
      temp_verkauf_item.attr_quantity = this.Vabsatzplan_p2;
      list_verkauf_item.push(temp_verkauf_item);
    }
    if(this.Vabsatzplan_p3 > 0){
      temp_verkauf_item.attr_article = 3;
      temp_verkauf_item.attr_quantity = this.Vabsatzplan_p3;
      list_verkauf_item.push(temp_verkauf_item);
    }

    let sellwishliste: Sellwish = {item: list_verkauf_item};

   //this.exportstore.dispatch(addSellwish(sellwishliste))

   let list_verkauf_item2: Item2[] = [];
   let temp_verkauf_item2: Item2 = {attr_article: 0, attr_quantity:0, attr_penalty:0, attr_price:0}

   if(this.V_direkt_menge_p1 > 0){
     temp_verkauf_item2.attr_article = 1;
     temp_verkauf_item2.attr_price = this.V_direkt_preis_p1
     temp_verkauf_item2.attr_quantity = this.V_direkt_menge_p1;
     temp_verkauf_item2.attr_penalty = this.V_direkt_strafe_p1
     list_verkauf_item2.push(temp_verkauf_item2);
   }
   if(this.V_direkt_menge_p2 > 0){
    temp_verkauf_item2.attr_article = 2;
    temp_verkauf_item2.attr_price = this.V_direkt_preis_p2
    temp_verkauf_item2.attr_quantity = this.V_direkt_menge_p2;
    temp_verkauf_item2.attr_penalty = this.V_direkt_strafe_p2
    list_verkauf_item2.push(temp_verkauf_item2);
  }
  if(this.V_direkt_menge_p3 > 0){
    temp_verkauf_item2.attr_article = 3;
    temp_verkauf_item2.attr_price = this.V_direkt_preis_p3
    temp_verkauf_item2.attr_quantity = this.V_direkt_menge_p3;
    temp_verkauf_item2.attr_penalty = this.V_direkt_strafe_p3
    list_verkauf_item2.push(temp_verkauf_item2);
  }

  let sellwishliste2: Selldirect = {item: list_verkauf_item2};

  //this.exportstore.dispatch(addSelldirect(sellwishliste2))

   //this.router.navigate(['programmplanung'])

  }

}
