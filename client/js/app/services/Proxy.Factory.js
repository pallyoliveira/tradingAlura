
// Factory que consiste em uma classe ser especializada em criar 
// determinado tipo de objeto

class ProxyFactory {
  static create(objeto, props, acao) {
    return new Proxy(objeto, {
      get(target, prop, receiver) {
        if (props.includes(prop) &&
          ProxyFactory._ehFuncao(target[prop])) {
          return function () {
            console.log(`interceptando ${prop}`);
            Reflect.apply(target[prop], target, arguments);
            return acao(target);
          }
        }
        return Reflect.get(target, prop, receiver);
      },
      set(target, prop, value, receiver) {
        if (props.includes(prop)) {
          acao(target); // target(prop) = value;          
        }
        return Reflect.set(target, prop, value, receiver);
      }
    });
  }

  static _ehFuncao(func) {
    return typeof (func) == typeof (Function);
  }
}
// O padrão de projeto Factory ocorre quando temos uma classe que nos ajuda a criar um objeto complexo, ou seja, ela esconde de nós os detalhes de criação desse objeto. É por isso que uma classe Factory possui apenas um método.
// O padrão de projeto Factory é um dos padrões mais utilizados no desenvolvimento. Ele é mais um da categoria dos patterns responsáveis por criar objetos, como o Builder e o Prototype.