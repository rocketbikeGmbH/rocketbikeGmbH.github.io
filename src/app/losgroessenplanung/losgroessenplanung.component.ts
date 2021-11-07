import { Component, OnInit, ViewChild } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragHandle} from '@angular/cdk/drag-drop';
import {MatTable} from '@angular/material/table';
import {Production} from "../model/export.model";
import {FormGroup} from "@angular/forms";

export interface LosgrossenElement {
  attr_article: string,
  attr_quantity: number,
}

let Element_Data: Production[] = [
  { attr_article: 13, attr_quantity: 210 },
  { attr_article: 14, attr_quantity: 140 },
  { attr_article: 15, attr_quantity: 100 },
  { attr_article: 18, attr_quantity: 200 },
  { attr_article: 19, attr_quantity: 150 },
  { attr_article: 20, attr_quantity: 100 },
  { attr_article: 7, attr_quantity: 200 },
  { attr_article: 8, attr_quantity: 150 },
  { attr_article: 9, attr_quantity: 100 },
  { attr_article: 49, attr_quantity: 200 },
  { attr_article: 54, attr_quantity: 150 },
  { attr_article: 29, attr_quantity: 100 },
  { attr_article: 4, attr_quantity: 200 },
  { attr_article: 5, attr_quantity: 150 },
  { attr_article: 6, attr_quantity: 100 },
  { attr_article: 10, attr_quantity: 200 },
  { attr_article: 11, attr_quantity: 150 },
  { attr_article: 12, attr_quantity: 100 },
  { attr_article: 17, attr_quantity: 450 },
  { attr_article: 16, attr_quantity: 460 },
  { attr_article: 50, attr_quantity: 200 },
  { attr_article: 55, attr_quantity: 150 },
  { attr_article: 30, attr_quantity: 100 },
  { attr_article: 51, attr_quantity: 200 },
  { attr_article: 56, attr_quantity: 150 },
  { attr_article: 31, attr_quantity: 100 },
  { attr_article: 26, attr_quantity: 449 },
  { attr_article: 1, attr_quantity: 200 },
  { attr_article: 2, attr_quantity: 150 },
  { attr_article: 3, attr_quantity: 100 },
];

@Component({
  selector: 'app-losgroessenplanung',
  templateUrl: './losgroessenplanung.component.html',
  styleUrls: ['./losgroessenplanung.component.scss']
})
export class LosgroessenplanungComponent implements OnInit {
  @ViewChild('table')
  table!: MatTable<LosgrossenElement>;
  displayedColumns: string[] = ['Artikel', 'Produktionsmenge', 'Aufteilen', 'Löschen'];
  dataSource = Element_Data;

  dropTable(event: CdkDragDrop<Production[]>) {
    const prevIndex = this.dataSource.findIndex((d) => d === event.item.data);
    moveItemInArray(this.dataSource, prevIndex, event.currentIndex);
    this.table.renderRows();
  }

  constructor() { }

  ngOnInit(): void {
  }


}
