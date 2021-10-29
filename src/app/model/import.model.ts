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
  forecast: {
    p1: number;
    p2: number;
    p3: number;
  };
  warehousestock: {
    article: {
      id: number;
      amount: number;
      startamount: number;
      pct: number;
      price: number;
      stockvalue: number;
    };
  };
  inwardstockmovement: {};
  futureinwardstockmovement: {
  };
  idletimecosts: {};
  waitinglistworkstations: {};
  waitingliststock: {};
  ordersinwork: {};
  completedorders: {};
  cycletimes: {};
  result: {};
  _game: number;
  _group: number;
  _period: number;
}

export interface warehousestock {
  article: {
      id: number;
      amount: number;
      startamount: number;
      pct: number;
      price: number;
      stockvalue: number;
  };
}

export interface article {
  id: number;
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

export interface futureinwardstockmovement{
  order: {
    orderperiod: number;
    id: number;
    mode: number;
    article: number;
    amount: number;
  }
}

export interface idletimecosts{
  workplace: {
    id: number;
    setupevents: number;
    idletime: number;
    wageidltimecosts: number;
    wagecosts: number;
    machineidletimecosts: number;
  }
  sum:{
    setupevents: number;
    idletime: number;
    wageidltimecosts: number;
    wagecosts: number;
    machineidletimecosts: number;
  }
}

export interface waitinglistworkstations{
  worklplace:{
    id: number;
    timeneed: number;
    waitinglist:{
      period: number;
      order: number;
      firstbatch: number;
      lastbatch:number;
      item: number;
      amount: number;
      timeneed: number
    }
  }
}

  export interface waitingliststock{
     missingpart: {
       id: number;
     }
  }

  export interface ordersinwork{
    worklpace:{
      id:number;
      period: number;
      order: number;
      batch: number;
      item:number;
      amount: number;
      timeneed:number;
    }
  }





