import {createSelector} from "@ngrx/store";
import {ImportModel} from "../../model/import.model";
import {ImportState} from "./import.reducer";

export const selectImportXml = createSelector(
  (state: ImportState) => state.importModel,
  (importModel:  ImportModel) => importModel
);

export const selectImportResults = createSelector(
  (state: ImportState) => state.importModel,
  (importModel:  ImportModel) => importModel.results
);

export const selectImportForecast = createSelector(
  (state: ImportState) => state.importModel,
  (importModel:  ImportModel) => importModel.results?.forecast
);

export const selectImportWarehousestock = createSelector(
  (state: ImportState) => state.importModel,
  (importModel:  ImportModel) => importModel.results?.warehousestock
);

export const selectImportArticle = createSelector(
  (state: ImportState) => state.importModel,
  (importModel:  ImportModel) => importModel.results?.warehousestock?.article
);
