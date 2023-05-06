class GithubClient {
  getRepoInfo(repoName, callback) {
    fetch('https://api.github.com/repos/' + repoName)
      .then(response => response.json()) // 1. convert JSON to JS object
      .then(data => {
        // 2. `data` is now a full JS object, so we can access its properties
        callback(data)
      });
  }
}

module.exports = GithubClient;