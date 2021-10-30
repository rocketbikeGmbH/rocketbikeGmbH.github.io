import { Action, createReducer, on} from '@ngrx/store';
import {addImportXml } from './import.actions';
import {ImportModel} from "../../model/import.model";

export interface ImportState {
  importModel: ImportModel,
}

export const initialState: ImportModel = {
  results: {
    forecast: {
      p1: 0,
      p2: 0,
      p3: 0,
    },
    warehousestock: {
      article:[{
        id: 0,
        amount: 0,
        startamount: 0,
        pct: 0,
        price: 0,
        stockvalue: 0,
      }],
      
    },
    inwardstockmovement: {},
    futureinwardstockmovement: {
      order: [{
        orderperiod: 0,
        id: 0,
        mode: 0,
        article: 0,
        amount: 0,
      }]
    },
    idletimecosts: {
      workplace:[{
        id: 0,
        setupevents: 0,
        idletime: 0,
        wageidltimecosts: 0,
        wagecosts: 0,
        machineidletimecosts: 0,
      }],
      sum:{
        setupevents: 0,
        idletime: 0,
        wageidltimecosts: 0,
        wagecosts: 0,
        machineidletimecosts: 0,
      }
    },
    waitinglistworkstations: {
      workplace:[{
        id: 0,
        timeneed: 0,
        waitinglist:[{
          period: 0,
          order: 0,
          firstbatch: 0,
          lastbatch:0,
          item: 0,
          amount: 0,
          timeneed: 0,
                }]
      }]
    },
    waitingliststock: {
      missingpart: [{
        id: 0,
      }]
    },
    ordersinwork: {
      workplace:[{
        id:0,
        period: 0,
        order: 0,
        batch: 0,
        item:0,
        amount: 0,
        timeneed:0,
      }]
    },
    completedorders: {},
    cycletimes: {},
    result: {},
    _game: 0,
    _group: 0,
    _period: 0,
  },
};

const _importReducer = createReducer(
  initialState,
  on(addImportXml, (state, {importModel} ) => importModel),
);

export function importReducer(state: ImportModel | undefined, action: Action) {
  return _importReducer(state, action);
}

