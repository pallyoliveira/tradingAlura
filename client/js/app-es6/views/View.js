export class View {
  constructor(elemento) {
    this._elemento = elemento;
  }

  template() {
    throw new Errror("O método template deve ser implementado");
  }

  update(model) {
    this._elemento.innerHTML = this.template(model);
  }
}