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

  createNewUser(handle, password) {
    const urlSuffix = 'users';
  }

  createNewSession(handle, password) {
    const urlSuffix = 'sessions';
  }

  getAllPeeps() {
    const urlSuffix = 'peeps';
  }

  createNewPeep(userId, body) {
    const urlSuffix = 'peeps';
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