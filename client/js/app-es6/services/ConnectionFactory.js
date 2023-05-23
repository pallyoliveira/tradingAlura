
const stores = ['negociacoes'];
const version = 4;
const dbName = 'aluraframe';
let connection = null;

let close = null;
export class ConnectionFactory {
  constructor() {
    // Para não permitir que sejam criadas instâncias de uma classe, podemos lançar uma exceção em seu constructor
    throw new Error("Não é possível criar instancias de connectionfactory")
  }

  // A obtenção de uma conexão é um processo assíncrono, sendo assim, nada mais justo do que nosso método getConnection retornar uma promise para nos ajudar com a complexidade de códigos assíncronos.
  static getConnection() {
    return new Promise((resolve, reject) => {
      let openRequest = window.indexedDB.open(dbName, version);
      openRequest.onupgradeneeded = e => {
        ConectionFactory._createStores(e.target.result);
      }

      openRequest.onsuccess = e => {
        if (!connection) {
          connection = e.target.result;
          close = connection.close.bind(connection);
          connection.close = function () {
            throw new Error('voce não pode fechar diretamente a conexão')
          }
        }
        resolve(connection);
      }
      openRequest.onerror = e => {
        console.log(e.target.error)
        reject(e.target.error.name);
      }
    });
  }
  static _createStores(connection) {
    stores.forEach(store => {
      if (connection.objectStoreNames.contains(store))
        connection.deleteObjectStore(store)
      connection.createObjectStore(store, { autoincrement: true })
    })
  }

  static closeConnection() {
    if (connection) {
      close();
      connection = null;
      close = null;
    }
  }
}


