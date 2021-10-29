import { Action, createReducer, on} from '@ngrx/store';
import {addImportXml } from './export.actions';
import {ImportModel} from "../../model/import.model";
import { ExportModel } from '../../model/export.model';

export interface ExportState {
  exportModel: ExportModel,
}

export const initialState: ExportModel = {
};

const _exportReducer = createReducer(
  initialState,
  on(addImportXml, (state, {exportModel} ) => exportModel),
);

export function exportReducer(state: ImportModel | undefined, action: Action) {
  return _exportReducer(state, action);
}

