class HttpService {
  get(url) {
      return new Promise((resolve, reject) => {
          let xhr = new XMLHttpRequest();
          xhr.open('GET', url);
          xhr.onreadystatechange = () => {
              if (xhr.readyState == 4) {
                  if (xhr.status == 200) {
                      resolve(JSON.parse(xhr.responseText));
                  } else {
                      reject(xhr.responseText);
                  }
              }
          };
          xhr.send();
      });
  }
  // localhost:3000/post.html
  // recomendado que as requisições sejam feitas de forma assíncrona, usando o terceiro parâmetro "true" do método open()
  post(url, dado) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(xhr.responseText);
                }
            }
        };
        xhr.send(JSON.stringify(dado)); // usando JSON.stringify para converter objeto em uma string no formato JSON.
    });
}
}