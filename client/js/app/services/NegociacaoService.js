class NegociacaoService {
  constructor() {
    this.http = new HttpService();
  }

  obterNegociacoesDaSemana() {
    return new Promise((resolve, reject) => {
      this.http
        .get('negociacoes/semana')
        .then(negociacoes => {
          resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
        })
        .catch(erro => {
          console.log(erro);
          reject('Não foi possível obter as negociações da semana');
        })
    });
  }

  obterNegociacoesDaSemanaRetrasada() {
    return new Promise((resolve, reject) => {
      this.http
        .get('negociacoes/retrasada')
        .then(negociacoes => {
          resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
        })
        .catch(erro => {
          console.log(erro);
          reject('Não foi possível obter as negociações da semana');
        })
    });
  }

  obterNegociacoesDaSemanaAnterior() {
    return new Promise((resolve) => {
      this.http
        .get('negociacoes/anterior')
        .then(negociacoes => {
          resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
        })
        .catch(erro => {
          console.log(erro);
          throw new Error('Não foi possível obter as negociações da semana');
        });
    });
  }

  obterNegociacoes() {
    return Promise.all([
      this.obterNegociacoesDaSemana(),
      this.obterNegociacoesDaSemanaAnterior(),
      this.obterNegociacoesDaSemanaRetrasada()
    ]).then(periodos => {
      let negociacoes = periodos
        .reduce((dados, periodo) => dados.concat(periodo), []);
      return negociacoes;
    }).catch(erro => {
      throw new Error(erro);
    });
  }
}