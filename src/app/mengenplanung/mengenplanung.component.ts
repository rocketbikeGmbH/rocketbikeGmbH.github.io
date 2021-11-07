import { Component, OnInit } from '@angular/core';
import { ImportState } from '../store/import/import.reducer';
import { ExportState } from '../store/export/export.reducer';
import { select, Store } from '@ngrx/store';
import { selectImportArticle } from '../store/import/import.selector';
import { article } from '../model/import.model';
import { BestellArtikel } from '../kapazitaetsplanung/bestellarticel';

@Component({
  selector: 'app-mengenplanung',
  templateUrl: './mengenplanung.component.html',
  styleUrls: ['./mengenplanung.component.scss'],
})
export class MengenplanungComponent implements OnInit {
  dataSource: Array<BestellArtikel> = [
    // new BestellArtikel(21, 1.8, 0.4, "P1", 300),
    // new BestellArtikel(22, 1.7, 0.4, "P2", 300),
    // new BestellArtikel(23, 1.2, 0.2, "P3"),
    // new BestellArtikel(24, 3.2, 0.3),
    // new BestellArtikel(25, 0.9),
    // new BestellArtikel(27, 0.9),
    // new BestellArtikel(28, 1.7),
    // new BestellArtikel(32, 2.1),
    // new BestellArtikel(33, 1.9),
    // new BestellArtikel(34, 1.6),
    // new BestellArtikel(35, 2.2),
    // new BestellArtikel(36, 1.2),
    // new BestellArtikel(37, 1.5),
    // new BestellArtikel(38, 1.7),
    // new BestellArtikel(39, 1.5),
    // new BestellArtikel(40, 1.7),
    // new BestellArtikel(41, 0.9),
    // new BestellArtikel(42, 1.2),
    // new BestellArtikel(43, 2),
    // new BestellArtikel(44, 1),
    // new BestellArtikel(45, 1.7),
    // new BestellArtikel(46, 0.9),
    // new BestellArtikel(47, 1.1),
    // new BestellArtikel(48, 1),
    // new BestellArtikel(52, 1.6),
    // new BestellArtikel(53, 1.6),
    // new BestellArtikel(57, 1.7),
    // new BestellArtikel(58, 1.6),
    // new BestellArtikel(59, 1.7),
  ];
  displayedColumns = ["seqNo", "description", "duration"];
  articles$ = this.importStore.pipe(select(selectImportArticle));

  constructor(
    private importStore: Store<ImportState>,
    private exportStore: Store<ExportState>
  ) {}

  ngOnInit(): void {
    let _article: Array<article> | undefined;
    this.articles$.subscribe((i) => (_article = i));
    //this.dataSource.push(..._article || []);
    console.log(_article);
  }
}
