import { Component } from '@angular/core';
import { parse } from 'fast-xml-parser';
import { select, Store } from '@ngrx/store';
import { addImportXml } from '../store/import/import.actions';
import { ImportState } from '../store/import/import.reducer';
import { selectImportArticle, selectImportForecast, selectImportResults, selectImportWarehousestock, selectImportXml } from '../store/import/import.selector';
import { Daten } from '../daten';
import { warehousestock } from '../model/import.model';
import { article } from '../model/import.model';


@Component({
  selector: 'app-dateiimport',
  templateUrl: './dateiimport.component.html',
  styleUrls: ['./dateiimport.component.scss'],
})
export class DateiimportComponent {
  fileName = '';
  fileContentAsJson = '';
  xmlImport$ = this.store.pipe(select(selectImportXml));
  results$ = this.store.pipe(select(selectImportResults));
  forecast$ = this.store.pipe(select(selectImportForecast));
  warehouse$ = this.store.pipe(select(selectImportWarehousestock));
  article$ = this.store.pipe(select(selectImportArticle));
  

  constructor(private store: Store<ImportState>) {}

/*
 xmlImport$: Observable<Object>;

  constructor(private store: Store<{ xmlImport: Object }>, public D: Daten) {
    this.xmlImport$ = store.select('xmlImport');
  }
  */

  // @ts-ignore
  onFileSelected({ target }): void {
    const file: File = target.files[0];

    if (file) {
      this.fileName = file.name;
      const reader = new FileReader();
      const options = {
        attributeNamePrefix: '',
        ignoreAttributes: false,
      };
      reader.readAsText(file);
      reader.onload = () => {
        const xmlDataAsJson = parse(reader.result as string, options);
        this.store.dispatch(addImportXml(xmlDataAsJson));

        //let data: {} | undefined = undefined;
        //this.forecast$.subscribe((i) => (data = i));

        //this.fileContentAsJson = JSON.stringify(data);
        
        //var obj = JSON.parse(data)
        //console.log(data);

        //var obj = JSON.parse(JSON.stringify(data));

        //console.log(obj.p1)

       let data: any | warehousestock;
        this.warehouse$.subscribe((i) => (data= i));

        console.log("jetzt")
        console.log(data.article)

        let art: any| article;
        console.log("artikel")
        this.article$.subscribe((i) => (art = i))
        console.log(art)



        //this.fileContentAsJson = JSON.stringify(data);
        
        //var obj = JSON.parse(JSON.stringify(data));

        //gibt von Array an Stelle 0 den Wert aus 
       // console.log(obj.article[0].amount)

        //console.log(obj.article.id['4'].amount)


        //console.log(data);


        
        
        
      };
      //console.log(this.fileName);
      
      
      

     // this.zahltest = this.fileContentAsJson.
    }
  }
}
