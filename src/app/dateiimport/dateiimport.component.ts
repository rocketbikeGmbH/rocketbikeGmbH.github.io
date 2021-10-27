import { Component } from '@angular/core';
import { parse } from 'fast-xml-parser';
import { select, Store } from '@ngrx/store';
import { addImportXml } from '../store/import/import.actions';
import { ImportState } from '../store/import/import.reducer';
import { selectImportForecast, selectImportResults, selectImportXml } from '../store/import/import.selector';

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

  constructor(private store: Store<ImportState>) {}

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

        let data: {} | undefined = undefined;
        this.forecast$.subscribe((i) => (data = i));
        this.fileContentAsJson = JSON.stringify(data);
      };
      console.log(this.fileName);
    }
  }
}
