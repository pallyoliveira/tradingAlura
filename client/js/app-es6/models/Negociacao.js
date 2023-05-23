export class Negociacao {
  constructor(data, quantidade, valor) {
    this._data = new Date(data.getTime());
    this._quantidade = quantidade;
    this._valor = valor;
    Object.freeze(this);
  }

  isEquals(outraNegociacao) {
    return JSON.stringify(this) == JSON.stringify(outraNegociacao)
    // return this._data.getTime() == outraNegociacao.data.getTime()
    // && this._valor == outraNegociacao.valor;
  }

  get volume() {
    return this._quantidade * this._valor;
  }

  get data() {
    return new Date(this._data.getTime());
  }

  get quantidade() {
    return this._quantidade;
  }

  get valor() {
    return this._valor;
  }

}