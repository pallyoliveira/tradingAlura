export class HttpService {
    _handleErros(res) {
        if (!res.ok) throw new Error(res.statusText);
        return res;        
    }
    // Fetch API, uma API de busca do JS
    get(url) {
        return fetch(url)
            .then(res => this._handleErros(res))
            .then(res => res.json());
    }
    // localhost:3000/post.html
    // recomendado que as requisições sejam feitas de forma assíncrona, usando o terceiro parâmetro "true" do método open()
    post(url, dado) {
        return fetch(url, {
            headers: {'Content-type' : 'application/json'},
            method: 'post',
            body: JSON.stringify(dado)
        })        
        .then(res => this._handleErros(res));
    }
}