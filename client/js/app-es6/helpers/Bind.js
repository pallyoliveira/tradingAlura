// associação entre o modelo e a View, ou seja, sempre que alterarmos o modelo, queremos disparar a atualização da View.
// mecanismo de data binding, semelhante aos frameworks como AngularJS 
import { ProxyFactory } from "../services/Proxy.Factory";
export class Bind {
  // rest operator: se torna um array
  constructor(model, view, ...props) {
    let proxy = ProxyFactory.create(model, props, model => 
    view.update(model));
    view.update(model);
    return proxy;
  }
}