import { createAction, props } from '@ngrx/store';
import {
  ExportModel,
  Sellwish,
  Input,
  Item,
  Selldirect,
  Orderlist,
  Qualitycontrol,
  Productionlist, Workingtimelist
} from '../../model/export.model';

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

export const addSellwishItem = createAction(
  '[Dateiexport Component] ADD Sellwish-Item', (props<{ item: Item }>())
);

export const addSelldirect = createAction(
  '[Dateiexport Component] ADD Selldirect', (props<{ selldirect: Selldirect }>())
);

export const addOrderlist = createAction(
  '[Dateiexport Component] ADD Orderlist', (props<{ orderlist: Orderlist }>())
);

export const addQualitycontrol = createAction(
  '[Dateiexport Component] ADD Qualitycontrol', (props<{ qualitycontrol: Qualitycontrol }>())
);

export const addProductionlist = createAction(
  '[Dateiexport Component] ADD Productionlist', (props<{ productionlist: Productionlist }>())
);

export const addWorkingtimelist = createAction(
  '[Dateiexport Component] ADD Workingtimelist', (props<{ workingtimelist: Workingtimelist }>())
);
