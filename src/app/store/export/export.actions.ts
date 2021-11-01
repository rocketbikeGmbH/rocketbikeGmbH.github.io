import { createAction, props } from '@ngrx/store';
import { ExportModel, Sellwish } from '../../model/export.model';

export const addExportXml = createAction(
  '[Dateiexport Component] Add XML_EXPORT',
  (exportModel: ExportModel) => ({ exportModel })
);

export const addSellwish = createAction(
  '[Dateiexport Component] ADD Sellwish', (props<{ sellwish: Sellwish}>())
);
