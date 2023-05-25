// a sintaxe do ES6 (de importação e exportação de módulos),
import { ListaNegociacoes } from "../models/ListaNegociacoes";
import { Mensagem } from "../models/Mensagem";
import { NegociacoesView } from "../views/NegociacoesView";
import { MensagemView } from "../views/MensagemView";
import { NegociacaoService } from "../services/NegociacaoService";
import { DateHelper } from "../helpers/DateHelper";
import { Bind } from "../helpers/Bind";
import { Negociacao } from "../models/Negociacao";

class NegociacaoController {
  constructor() {
    let $ = document.querySelector.bind(document);
    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');
    this._ordemAtual = '';
    this._listaNegociacoes = new Bind(
      new ListaNegociacoes(),
      new NegociacoesView($('#negociacoesView')), 'adiciona', 'esvazia', 'ordena', 'inverteOrdem')
    this._mensagem = new Bind(
      new Mensagem(),
      new MensagemView($('#mensagemView')), 'texto');
    this._ordemAtual = '';
    this._service = new NegociacaoService();
    // invocando o método getConnection da nossa ConnectionFactory. Como o método retorna uma promise, quando encadeamos uma chamada à função then temos acesso à conexão. Veja, não queremos trabalhar com uma conexão diretamente, queremos um dao, é por isso que no mesmo then em que obtemos a conexão retornamos implicitamente (arrow function sem block) uma instância de NegociacaoDao
    this._init();
  }

  _init() {
    this._service
      .lista()
      .then(negociacoes =>
        negociacoes.forEach(negociacao =>
          this._listaNegociacoes.adiciona(negociacao)))
      .catch(erro => this._mensagem.texto = erro);
    setInterval(() => {
      this.importaNegociacoes();
    }, 3000);
  }

  adiciona(event) {
    event.preventDefault();
    let negociacao = this._criaNegociacao();
    this._service
      .cadastra(negociacao)
      .then(mensagem => {
        this._listaNegociacoes.adiciona(negociacao);
        this._mensagem.texto = mensagem;
        this._limpaFormulario();
      })
      .catch(erro => this._mensagem.texto = erro);
  }

  apaga() {
    this._service
      .apaga()
      .then(mensagem => {
        this._mensagem.texto = mensagem;
        this._listaNegociacoes.esvazia()
      })
      .catch(erro => this._mensagem.texto = erro);
  }

  _criaNegociacao() {
    return new Negociacao(DateHelper.textoParaData(
      this._inputData.value),
      parseInt(this._inputQuantidade.value),
      parseFloat(this._inputValor.value));
  }

  _limpaFormulario() {
    this._inputData.value = '';
    this._inputQuantidade.value = '';
    this._inputValor.value = '';
    this._inputData.focus();
  }

  ordena(coluna) {
    if (this._ordemAtual == coluna) {
      this._listaNegociacoes.inverteOrdem();
    } else {
      this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
    }
    this._ordemAtual = coluna;
  }

  importaNegociacoes() {
    this._service
      .importa(this._listaNegociacoes.negociacoes)
      .then(negociacoes => negociacoes.forEach(negociacao => {
        this._listaNegociacoes.adiciona(negociacao);
        this._mensagem.texto = 'Negociações do período importadas'
      }))
      .catch(erro => this._mensagem.texto = erro);
  }
}

let negociacaoController = new NegociacaoController();
export function currentInstance() {
  return negociacaoController;
}