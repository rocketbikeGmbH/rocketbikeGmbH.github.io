import { Action, createReducer, on} from '@ngrx/store';
import { addImportXml } from './import.actions';

export const initialState = {};

const _importReducer = createReducer(
  initialState,
  on(addImportXml, (state, { xmlImport }) => ( xmlImport ))
);

export function importReducer(state: {} | undefined, action: Action) {
  return _importReducer(state, action);
}

