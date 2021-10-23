import { Component, OnInit } from '@angular/core';
import {parse} from 'fast-xml-parser';

@Component({
  selector: 'app-dateiimport',
  templateUrl: './dateiimport.component.html',
  styleUrls: ['./dateiimport.component.scss']
})
export class DateiimportComponent implements OnInit {

  fileName = '';
  fileContentAsJson = '';

  constructor() {}

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
        this.fileContentAsJson = parse(reader.result as string, options);
        console.log(this.fileContentAsJson);
      };
      console.log(this.fileName);
    }
  }
  ngOnInit(): void {
  }

}
