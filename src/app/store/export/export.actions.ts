import { createAction, props } from '@ngrx/store';
import { ExportModel, Sellwish, Input } from '../../model/export.model';

export const addExportXml = createAction(
  '[Dateiexport Component] Add XML_EXPORT',
  (exportModel: ExportModel) => ({ exportModel })
);

export const addInput = createAction(
  '[Dateiexport Component] ADD Input', (props<{ input: Input }>())
);

export const addSellwish = createAction(
  '[Dateiexport Component] ADD Sellwish', (props<{ sellwish: Sellwish }>())
);
