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
  private _lagerbestand: number | undefined;
  private _bruttobedarf: number | undefined;
  private _offeneBestellung: Array<Bestellungen> | undefined;
  private _eintreffendeBestellung: number | undefined;
  private _laufendeAuftraege: number | undefined;
  private _bestellpunkt: number | undefined;
  private _bestellungen: Array<Bestellungen> | undefined;
  private _bestellmenge: number | undefined;


  get bestellungen(): Array<Bestellungen> | undefined {
    return this._bestellungen;
  }

  set bestellungen(value: Array<Bestellungen> | undefined) {
    this._bestellungen = value;
  }

  get bestellmenge(): number | undefined {
    return this._bestellmenge;
  }

  set bestellmenge(value: number | undefined) {
    this._bestellmenge = value;
  }

  get bestellpunkt(): number | undefined {
    return this._bestellpunkt;
  }

  set bestellpunkt(value: number | undefined) {
    this._bestellpunkt = value;
  }
  get laufendeAuftraege(): number | undefined {
    return this._laufendeAuftraege;
  }

  set laufendeAuftraege(value: number | undefined) {
    this._laufendeAuftraege = value;
  }

  set lagerbestand(value: number | undefined) {
    this._lagerbestand = value;
  }

  set bruttobedarf(value: number | undefined) {
    this._bruttobedarf = value;
  }

  get eintreffendeBestellung(): number | undefined {
    return this._eintreffendeBestellung;
  }

  set eintreffendeBestellung(value: number | undefined) {
    this._eintreffendeBestellung = value;
  }

  set offeneBestellung(value: Array<Bestellungen> | undefined) {
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

  get lagerbestand(): number | undefined {
    return this._lagerbestand;
  }

  get bruttobedarf(): number | undefined {
    return this._bruttobedarf;
  }

  get offeneBestellung(): Array<Bestellungen> | undefined {
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

export class Bestellungen {
  constructor(anzahl: number, periode: number, modus: string) {
    this._anzahl = anzahl;
    this._periode = periode;
    this._modus = modus;
  }

  private _anzahl: number = 0;
  private _modus: string  = "";
  private readonly _periode: number;
  private _id: number  = 0;

  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }

  set modus(value: string ) {
    this._modus = value;
  }
  get modus(): string {
    return this._modus;
  }

  set anzahl(value: number ) {
    this._anzahl = value;
  }
  get anzahl(): number {
    return this._anzahl;
  }

  get periode(): number {
    return this._periode;
  }
}
