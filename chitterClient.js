class ChitterClient {
  baseURL = 'https://chitter-backend-api-v2.herokuapp.com/';
  getRepoInfo(repoName, callback) {
    fetch('https://api.github.com/repos/' + repoName)
      .then(response => response.json()) // 1. convert JSON to JS object
      .then(data => {
        // 2. `data` is now a full JS object, so we can access its properties
        callback(data)
      });
  }

  createNewUser(username, pass, callback) {
    const urlSuffix = 'users';
    fetch(`${this.baseURL}${urlSuffix}`,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"user": {handle: username, password: pass}})
    })
      .then(response => response.json()) // 1. convert JSON to JS object
      .then(data => {
        // 2. `data` is now a full JS object, so we can access its properties
        callback(data)
      });
  }

  createNewSession(username, pass, callback) {
    const urlSuffix = 'sessions';
    fetch(`${this.baseURL}${urlSuffix}`,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"session": {handle: username, password: pass}})
    })
      .then(response => response.json()) // 1. convert JSON to JS object
      .then(data => {
        // 2. `data` is now a full JS object, so we can access its properties
        callback(data)
      });
  }

  getAllPeeps(callback) {
    const urlSuffix = 'peeps';
    fetch(`${this.baseURL}${urlSuffix}`)
      .then(response => response.json()) // 1. convert JSON to JS object
      .then(data => {
        // 2. `data` is now a full JS object, so we can access its properties
        callback(data)
      });
  }

  createNewPeep(peepBody, callback) {
    const urlSuffix = 'peeps';
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId'); 
    if(token !== undefined && token !== null){
      fetch(`${this.baseURL}${urlSuffix}`,{
        method: 'POST',
        headers: new Headers({
          'Authorization': 'Token  token=' + token, 
          'Content-Type': 'application/json'
      }),
        body: JSON.stringify({"peep": {user_id: userId, body: peepBody}})
      })
        .then(response => response.json()) // 1. convert JSON to JS object
        .then(data => {
          // 2. `data` is now a full JS object, so we can access its properties
          callback(data)
        });
    }
  }

  getPeepById(id) {
    const urlSuffix = `peeps/${id}`;
  }

  deletePeepById(id, token, userId) {
    const urlSuffix = `peeps/${id}`;
  }
  
  setPeepLike(id, token, userId) {
    const urlSuffix = `peeps/${id}/likes/1`;
  }

  setPeepUnlike(id, token, userId) {
    const urlSuffix = `peeps/${id}/likes/1`;
  }
}

module.exports = ChitterClient;