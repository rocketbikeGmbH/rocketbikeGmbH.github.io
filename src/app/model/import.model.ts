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
  warehousestock: {
    article: {
      id: string;
      amount: number;
      startamount: number;
      pct: number;
      price: number;
      stockvalue: number;
    };
  };
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

export interface warehousestock {
  article: {
      id: string;
      amount: number;
      startamount: number;
      pct: number;
      price: number;
      stockvalue: number;
  };
}

export interface article {
  id: string;
  amount: number;
  startamount: number;
  pct: number;
  price: number;
  stockvalue: number;

}

export interface forecast {
  p1: number;
  p2: number;
  p3: number;
}




