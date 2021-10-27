import { createAction } from '@ngrx/store';
import { ExportModel } from '../../model/export.model';

export const addImportXml = createAction('[Dateiimport Component] Add XML_EXPORT', (exportModel: ExportModel ) => ({exportModel}));
