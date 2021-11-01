import { Action, createReducer, on } from '@ngrx/store';
import { addExportXml } from './export.actions';
import { ExportModel } from '../../model/export.model';

export interface ExportState {
  exportModel: ExportModel;
}

export const initialState: ExportModel = {
  input: {
    qualitycontrol: {
      type: '',
      losequantity: 0,
      delay: 0,
    },
    orderlist: {
      order: [
        {
          article: 0,
          quantity: 0,
          modus: 0,
        },
      ],
    },
    productionlist: {
      production: [
        {
          article: 0,
          quantity: 0,
        },
      ],
    },
    sellwish: {
      item: [
        {
          article: 0,
          quantity: 0,
        },
      ],
    },
    selldirect: {
      item: [
        {
          article: 0,
          quantity: 0,
          price: 0,
          penalty: 0,
        },
      ],
    },
    workingtimelist: {
      workingtime: [ {
        station: 0,
        shift: 0,
        overtime: 0,
      },]
    },
  },
};

const _exportReducer = createReducer(
  initialState,
  on(addExportXml, (state, { exportModel }) => exportModel)
);

export function exportReducer(state: ExportModel | undefined, action: Action) {
  return _exportReducer(state, action);
}
