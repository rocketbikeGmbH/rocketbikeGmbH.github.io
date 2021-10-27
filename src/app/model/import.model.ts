// export class ImportModel {
//   results: {}
//   constructor(results?: {}) {
//     this.results = results || {};
//   }
// }

export interface ImportModel {
  results?: Results | undefined;
}

export interface Results {
  forecast: {};
  warehousestock: {};
  inwardstockmovement: {};
  futureinwardstockmovement: {};
  idletimecosts: {};
  waitinglistworkstations: {};
  waitingliststock: {};
  ordersinwork: {};
  completedorders: {};
  cycletimes: {};
  result: {};
  _game: string;
  _group: string;
  _period: string;
}
