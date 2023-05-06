(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // chitterClient.js
  var require_chitterClient = __commonJS({
    "chitterClient.js"(exports, module) {
      var GithubClient2 = class {
        getRepoInfo(repoName, callback) {
          fetch("https://api.github.com/repos/" + repoName).then((response) => response.json()).then((data) => {
            callback(data);
          });
        }
      };
      module.exports = GithubClient2;
    }
  });

  // chitterModel.js
  var require_chitterModel = __commonJS({
    "chitterModel.js"(exports, module) {
      var GithubModel2 = class {
        constructor() {
          this.repoInfo = null;
        }
        setRepoInfo(repoInfo) {
          this.repoInfo = repoInfo;
        }
        getRepoInfo() {
          return this.repoInfo;
        }
      };
      module.exports = GithubModel2;
    }
  });

  // chitterView.js
  var require_chitterView = __commonJS({
    "chitterView.js"(exports, module) {
      var GithubView2 = class {
        constructor(model2, client2) {
          this.model = model2;
          this.client = client2;
          const submitButtonEl = document.querySelector("#submit-button");
          const repoInputEl = document.querySelector("#repo-name-input");
          submitButtonEl.addEventListener("click", () => {
            const repoName = repoInputEl.value;
            this.client.getRepoInfo(repoName, (repoData) => {
              console.log(repoData);
              this.display(repoData);
            });
          });
        }
        display(repoData) {
          const repoNameEl = document.querySelector("#repo-name");
          const fullName = repoData.full_name;
          repoNameEl.innerText = fullName.split("/")[1];
          const repoDescriptionEl = document.querySelector("#repo-description");
          const description = repoData["description"];
          repoDescriptionEl.innerText = description;
          const repoImageEl = document.querySelector("#repo-image");
          const imageSource = repoData.organization.avatar_url;
          repoImageEl.setAttribute("src", imageSource);
        }
      };
      module.exports = GithubView2;
    }
  });

  // index.js
  var GithubClient = require_chitterClient();
  var GithubModel = require_chitterModel();
  var GithubView = require_chitterView();
  var client = new GithubClient();
  var model = new GithubModel();
  var view = new GithubView(model, client);
})();
