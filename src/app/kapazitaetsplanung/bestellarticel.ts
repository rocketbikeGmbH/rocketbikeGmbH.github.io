export class BestellArtikel {
  constructor(
    id: number,
    lieferfrist: number,
    abweichung: number,
    Verwendung: string,
    diskont: number,
  ) {
    this._id = id;
    this._lieferfrist = lieferfrist;
    this._abweichung = abweichung;
    this._Verwendung = Verwendung;
    this._Diskont = diskont;
  }

  private _id: number;
  private _lieferfrist: number;
  private _abweichung: number;
  private _Verwendung: string;
  private _Diskont: number;
  private _Anfangsbestand: number | undefined;
  private _Bruttobedarf: number | undefined;
  private _offeneBestellung: number | undefined;

  set Anfangsbestand(value: number | undefined) {
    this._Anfangsbestand = value;
  }

  set Bruttobedarf(value: number | undefined) {
    this._Bruttobedarf = value;
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

  get Verwendung(): string {
    return this._Verwendung;
  }

  get Diskont(): number {
    return this._Diskont;
  }

  get Anfangsbestand(): number | undefined {
    return this._Anfangsbestand;
  }

  get Bruttobedarf(): number | undefined {
    return this._Bruttobedarf;
  }

  get offeneBestellung(): number | undefined {
    return this._offeneBestellung;
  }
}
