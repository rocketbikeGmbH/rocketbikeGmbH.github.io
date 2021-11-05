import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class Daten  {

    absatzplan_p1 = 0;
    absatzplan_p2 = 0;
    absatzplan_p3 = 0;
    next_period = 0;

    data_loaded: boolean = false;


    constructor(){}

    

    
}