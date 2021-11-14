import {createSelector} from "@ngrx/store";
import { ExportModel } from '../../model/export.model';
import { ExportState } from './export.reducer';

export const selectExportModel = createSelector(
  (state: ExportState) => state.exportModel,
  (exportModel:  ExportModel) => exportModel
);

// export const selectWaitingListWorkstations = createSelector(
//   (state: ImportState) => state.importModel,
//   (importModel:  ImportModel) => importModel.results?.waitinglistworkstations
// );

export const selectProductionlist = createSelector(
  (state: ExportState) => state.exportModel,
  (exportModel: ExportModel) => exportModel.input.productionlist.production
);

export const selectWishList = createSelector(
  (state: ExportState) => state.exportModel,
  (exportModel: ExportModel) => exportModel.input?.selldirect
);
