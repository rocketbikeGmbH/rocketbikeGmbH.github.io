export interface Qualitycontrol {
  type: string;
  losequantity: number;
  delay: number;
}

export interface Item {
  article: number;
  quantity: number;
}

export interface Sellwish {
  item: Item[];
}

export interface Item2 {
  article: number;
  quantity: number;
  price: number;
  penalty: number;
}

export interface Selldirect {
  item: Item2[];
}

export interface Order {
  article: number;
  quantity: number;
  modus: number;
}

export interface Orderlist {
  order: Order[];
}

export interface Production {
  article: number;
  quantity: number;
}

export interface Productionlist {
  production: Production[];
}

export interface Workingtime {
  station: number;
  shift: number;
  overtime: number;
}

export interface Workingtimelist {
  workingtime: Workingtime[];
}

export interface Input {
  qualitycontrol: Qualitycontrol;
  sellwish: Sellwish;
  selldirect: Selldirect;
  orderlist: Orderlist;
  productionlist: Productionlist;
  workingtimelist: Workingtimelist;
}

export interface ExportModel {
  input: Input;
}
