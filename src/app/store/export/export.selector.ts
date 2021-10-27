import {createSelector} from "@ngrx/store";
import { ExportModel } from '../../model/export.model';
import { ExportState } from './export.reducer';

export const selectExportModel = createSelector(
  (state: ExportState) => state.exportModel,
  (exportModel:  ExportModel) => exportModel
);
