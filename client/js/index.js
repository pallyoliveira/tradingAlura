var campos = [
  document.querySelector('#data'),
  document.querySelector('#quantidade'),
  document.querySelector('#valor')
];

console.log(campos);

var tbody = document.querySelector('table tbody');

document.querySelector('.form').addEventListener('submit', function (event) {
  event.preventDefault();
  var tr = document.createElement('tr');
  campos.forEach(function (campo) {
    var td = document.createElement('td');
    td.textContent = campo.value;
    tr.appendChild(td);
  });

  var tdVolume = document.createElement('td');
  tdVolume.textContent = campos[1].value * campos[2].value;

  tr.appendChild(tdVolume);
  tbody.appendChild(tr);
  campos[0].value = '';
  campos[1].value = 1;
  campos[2].value = 0;
  campos[0].focus();
});

/* MODELO MVC - SEPARAÇÃO ENTRE MODEL E VIEW
AÇÕES DO USUÁRIO SÃO INTERCEPTADAS POR UM CONTROLLER, ESSE CONTROLLER ALTERA O DADO 
QUE É O MODEL E A VIEW SE ATUALIZA PARA EXIBIR O ESTADO MAIS ATUAL DESSE MODEL, OU SEJA 
AS REGRAS DE NEGÓCIO ESTÃO NO MODELO */

/* FUNCAO DENTRO DE CLASSE É MÉTODO */
