'use strict';

System.register([], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      if (!Array.prototype.includes) {
        console.log('Polyfill para Array.includes aplicado.');
        Array.prototype.includes = function (elemento) {
          return this.indexOf(elemento) != -1;
        };
      }

      // Um transpiler é um compilador de código fonte para código fonte. é um compilador que traduz o código fonte de uma linguagem para outra.
      //  que emulará com fidelidade o Fetch API, criando no escopo global do navegador esta funcionalidade:
      // Você pode usar este polyfill, baixando-o da pasta https://github.com/github/fetch/blob/master/fetch.js. O script deve ser carregado como primeiro script da nossa página em body.
    }
  };
});
//# sourceMappingURL=polyfill.js.map