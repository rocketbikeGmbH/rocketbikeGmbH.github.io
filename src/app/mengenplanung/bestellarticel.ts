export class BestellArtikel {
  constructor(
    id: number,
    lieferfrist: number,
    abweichung: number,
    verwendung: ProduktType,
    diskont: number,
  ) {
    this._id = id;
    this._lieferfrist = lieferfrist;
    this._abweichung = abweichung;
    this._verwendung = verwendung;
    this._diskont = diskont;
  }

  private readonly _id: number;
  private readonly _lieferfrist: number;
  private readonly _abweichung: number;
  private readonly _verwendung: ProduktType;
  private readonly _diskont: number;
  private _anfangsbestand: number | undefined;
  private _bruttobedarf: number | undefined;
  private _offeneBestellung: number | undefined;

  set anfangsbestand(value: number | undefined) {
    this._anfangsbestand = value;
  }

  set bruttobedarf(value: number | undefined) {
    this._bruttobedarf = value;
  }

  set offeneBestellung(value: number | undefined) {
    this._offeneBestellung = value;
  }

  get id(): number {
    return this._id;
  }

  get lieferfrist(): number {
    return this._lieferfrist;
  }

  get abweichung(): number {
    return this._abweichung;
  }

  get verwendung(): ProduktType {
    return this._verwendung;
  }

  get diskont(): number {
    return this._diskont;
  }

  get anfangsbestand(): number | undefined {
    return this._anfangsbestand;
  }

  get bruttobedarf(): number | undefined {
    return this._bruttobedarf;
  }

  get offeneBestellung(): number | undefined {
    return this._offeneBestellung;
  }
}

export class ProduktType {

  constructor(p1: number, p2: number, p3: number) {
    this._p1 = p1;
    this._p2 = p2;
    this._p3 = p3;
  }

  private readonly _p1 : number;
  private readonly _p2: number;
  private readonly _p3: number;

  get p1(): number {
    return this._p1;
  }

  get p2(): number {
    return this._p2;
  }

  get p3(): number {
    return this._p3;
  }
}
