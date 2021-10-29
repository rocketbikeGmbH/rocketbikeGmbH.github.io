import { Action, createReducer, on} from '@ngrx/store';
import {addImportXml } from './import.actions';
import {ImportModel} from "../../model/import.model";

export interface ImportState {
  importModel: ImportModel,
}

export const initialState: ImportModel = {
  results: {
    forecast: {},
    warehousestock: {},
    inwardstockmovement: {},
    futureinwardstockmovement: {},
    idletimecosts: {},
    waitinglistworkstations: {},
    waitingliststock: {},
    ordersinwork: {},
    completedorders: {},
    cycletimes: {},
    result: {},
    _game: "",
    _group: "",
    _period: "",
  },
};

const _importReducer = createReducer(
  initialState,
  on(addImportXml, (state, {importModel} ) => importModel),
);

export function importReducer(state: ImportModel | undefined, action: Action) {
  return _importReducer(state, action);
}

