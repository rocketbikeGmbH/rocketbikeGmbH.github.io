import { createAction } from '@ngrx/store';

export const addImportXml = createAction('[Dateiimport Component] Add XML_IMPORT', (xmlImport: {}) => ({xmlImport}))


