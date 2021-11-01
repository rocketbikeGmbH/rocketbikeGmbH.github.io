import { Action, createReducer, on } from '@ngrx/store';
import { addExportXml, addInput } from './export.actions';
import { ExportModel } from '../../model/export.model';

export interface ExportState {
  exportModel: ExportModel;
}

export const initialState: ExportModel = {
  input: {
    qualitycontrol: {
      attr_type: '',
      attr_losequantity: 0,
      attr_delay: 0,
    },
    orderlist: {
      order: [
        {
          attr_article: 0,
          attr_quantity: 0,
          attr_modus: 0,
        },
      ],
    },
    productionlist: {
      production: [
        {
          attr_article: 0,
          attr_quantity: 0,
        },
      ],
    },
    sellwish: {
      item: [
        {
          attr_quantity: 0,
          attr_article: 0,
        },
      ],
    },
    selldirect: {
      item: [
        {
          attr_article: 0,
          attr_quantity: 0,
          attr_price: 0,
          attr_penalty: 0,
        },
      ],
    },
    workingtimelist: {
      workingtime: [
        {
          attr_station: 0,
          attr_shift: 0,
          attr_overtime: 0,
        },
      ],
    },
  },
};

const _exportReducer = createReducer(
  initialState,
  on(addExportXml, (state, { exportModel }) => exportModel),
  on(addInput, (state, { input }) => ({input: input})),
  //on(addSellwish2, (state, {sellwish}) => ({...state, input: {sellwish: sellwish}}))
);

export function exportReducer(state: ExportModel | undefined, action: Action) {
  return _exportReducer(state, action);
}
