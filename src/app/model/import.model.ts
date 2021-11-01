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
    article: Array<article>;
  };
  inwardstockmovement: {};
  futureinwardstockmovement: {
  };
  idletimecosts: idletimecosts;
  waitinglistworkstations: {
    workplace: Array<waiting_workplace>;
  };
  waitingliststock: {};
  ordersinwork: {
    workplace: Array<orders_workplace>;
  };
  completedorders: {};
  cycletimes: {};
  result: {};
  _game: number;
  _group: number;
  _period: number;
}

export interface warehousestock {
  article: Array<article>;
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
  workplace: Array<idle_workplace>,
  sum:{
    setupevents: number;
    idletime: number;
    wageidltimecosts: number;
    wagecosts: number;
    machineidletimecosts: number;
  }
}

export interface idle_workplace {
  id: number;
  setupevents: number;
  idletime: number;
  wageidltimecosts: number;
  wagecosts: number;
  machineidletimecosts: number;
}

export interface waitinglistworkstations{
  workplace: Array<waiting_workplace>;
}


export interface waiting_workplace{
  id: number;
  timeneed: number;
  waitinglist: Array<waitinglist>;
}

  export interface waitingliststock{
     missingpart: {
       id: number;
     }
  }

  export interface waitinglist{
    period: number;
    order: number;
    firstbatch: number;
    lastbatch:number;
    item: number;
    amount: number;
    timeneed: number
  }

  export interface ordersinwork{
    workplace: Array<orders_workplace>;
  }

  export interface orders_workplace{
      id:number;
      period: number;
      order: number;
      batch: number;
      item:number;
      amount: number;
      timeneed:number;
  }





