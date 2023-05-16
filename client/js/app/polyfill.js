if(!Array.prototype.includes) {
  console.log('Polyfill para Array.includes aplicado.');
  Array.prototype.includes = function(elemento) {
      return this.indexOf(elemento) != -1;
  };
}

// Um transpiler é um compilador de código fonte para código fonte. é um compilador que traduz o código fonte de uma linguagem para outra.