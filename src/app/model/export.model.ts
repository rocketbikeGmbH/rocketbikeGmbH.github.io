export interface Qualitycontrol {
  attr_type: string;
  attr_losequantity: number;
  attr_delay: number;
}

export interface Item {
  attr_article: number;
  attr_quantity: number;
}

export interface Sellwish {
  item: Item[];
}

export interface Item2 {
  attr_article: number;
  attr_quantity: number;
  attr_price: number;
  attr_penalty: number;
}

export interface Selldirect {
  item: Item2[];
}

export interface Order {
  attr_article: number;
  attr_quantity: number;
  attr_modus: number;
}

export interface Orderlist {
  order: Order[];
}

export interface Production {
  attr_article: number;
  attr_quantity: number;
}

export interface Productionlist {
  production: Production[];
}

export interface Workingtime {
  attr_station: number;
  attr_shift: number;
  attr_overtime: number;
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
