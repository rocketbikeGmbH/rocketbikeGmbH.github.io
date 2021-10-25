import { Component, OnInit } from '@angular/core';
import {parse} from 'fast-xml-parser';
import { Observable } from 'rxjs';
import {Store} from "@ngrx/store";
import {addImportXml} from "../store/import.actions";

@Component({
  selector: 'app-dateiimport',
  templateUrl: './dateiimport.component.html',
  styleUrls: ['./dateiimport.component.scss']
})
export class DateiimportComponent implements OnInit {

  fileName = '';
  fileContentAsJson = '';

  xmlImport$: Observable<Object>;

  constructor(private store: Store<{ xmlImport: Object }>) {
    this.xmlImport$ = store.select('xmlImport');
  }

  // @ts-ignore
  onFileSelected({target}) {

    const file:File = target.files[0];

    if (file) {

      this.fileName = file.name;
      const reader = new FileReader();

      const options = {
        attributeNamePrefix: "",
        ignoreAttributes: false,
      }

      reader.readAsText(file);
      reader.onload = () =>  {
        const xmlDataAsJson = parse(reader.result as string, options);
        this.store.dispatch(addImportXml(xmlDataAsJson));
        console.log(this.xmlImport$);
        this.fileContentAsJson = JSON.stringify(xmlDataAsJson);
      };
      console.log(this.fileName);
    }
  }
  ngOnInit(): void {
  }

}
