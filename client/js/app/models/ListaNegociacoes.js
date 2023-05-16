class ListaNegociacoes {
  constructor() {
    this._negociacoes = [];
    // this._armadilha = armadilha;
    // this._contexto = contexto;
  }

  adiciona(negociacao) {
    // this._negociacoes = [].concat(this._negociacoes, negociacao);   
    this._negociacoes.push(negociacao);
    // Reflect.apply(this._armadilha, this._contexto, [this]);
  }

  get negociacoes() {
    return [].concat(this._negociacoes);
  }

  inverteOrdem() {
    this._negociacoes.reverse();
}


  esvazia() {
    this._negociacoes = [];
    // this._armadilha(this);
    // Reflect.apply(this._armadilha, this._contexto, [this]);
  }

  ordena(criterio) {
    this._negociacoes.sort(criterio);        
}
    // novo método
    get volumeTotal() {
      return this._negociacoes.reduce((total, n) => total + n.volume, 0.0);
   }
}
// Reflect.apply é um método estático em JavaScript que permite chamar uma função com um determinado valor this e um conjunto de argumentos passados como um array.
// A sintaxe básica do Reflect.apply é a seguinte
// Reflect.apply(target, thisArg, args)
// Onde:
// target: A função que será chamada.
// thisArg: O valor que será atribuído ao this dentro da função.
// args: Um array contendo os argumentos que serão passados para a função.