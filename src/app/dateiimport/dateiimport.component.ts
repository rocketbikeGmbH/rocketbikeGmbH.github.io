import { Component } from '@angular/core';
import { parse } from 'fast-xml-parser';
import { Store } from '@ngrx/store';
import { addImportXml } from '../store/import/import.actions';
import { ImportState } from '../store/import/import.reducer';
import { ImportModel } from '../model/import.model';
import { StepperServiceService } from '../stepper-service.service';
import { browserRefresh } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dateiimport',
  templateUrl: './dateiimport.component.html',
  styleUrls: ['./dateiimport.component.scss'],
})
export class DateiimportComponent {
  fileName = '';
  dateiimport_file_auswahl = '';

  type = 'dateiimport'
  browserRefresh: boolean = true;

  constructor(private store: Store<ImportState>, private stepperservice: StepperServiceService, private route: Router) {}

  // @ts-ignore
  onFileSelected({ target }): void {
    const file: File = target.files[0];

    if (file) {
      this.fileName = file.name;
      const reader = new FileReader();
      const options = {
        attributeNamePrefix: '',
        ignoreAttributes: false,
        // arrayMode: true,
      };
      reader.readAsText(file);
      reader.onload = () => {
        const xmlDataAsJson: ImportModel = parse(reader.result as string, options, true);
        this.store.dispatch(addImportXml(xmlDataAsJson));
        this.stepperservice.set_dateiimport(this.type);
      };
    }
  }

  ngOnInit() {
    this.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);
    if (browserRefresh == false) {
      // window.location.reload();
      this.browserRefresh = true;
    }
  }
}
