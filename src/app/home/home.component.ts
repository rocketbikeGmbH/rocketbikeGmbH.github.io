import { Component, EventEmitter, OnInit } from '@angular/core';
import { Daten } from '../daten';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  constructor(private daten: Daten, private router: Router) { }

  ngOnInit(): void {
  }
}
