(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // chitterClient.js
  var require_chitterClient = __commonJS({
    "chitterClient.js"(exports, module) {
      var ChitterClient2 = class {
        baseURL = "https://chitter-backend-api-v2.herokuapp.com/";
        getRepoInfo(repoName, callback) {
          fetch("https://api.github.com/repos/" + repoName).then((response) => response.json()).then((data) => {
            callback(data);
          });
        }
        createNewUser(handle, password) {
          const urlSuffix = "users";
        }
        createNewSession(handle, password) {
          const urlSuffix = "sessions";
        }
        getAllPeeps(callback) {
          const urlSuffix = "peeps";
          fetch(`${this.baseURL}${urlSuffix}`).then((response) => response.json()).then((data) => {
            callback(data);
          });
        }
        createNewPeep(userId, body) {
          const urlSuffix = "peeps";
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
      };
      module.exports = ChitterClient2;
    }
  });

  // chitterModel.js
  var require_chitterModel = __commonJS({
    "chitterModel.js"(exports, module) {
      var ChitterModel2 = class {
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
      module.exports = ChitterModel2;
    }
  });

  // chitterView.js
  var require_chitterView = __commonJS({
    "chitterView.js"(exports, module) {
      var ChitterView2 = class {
        constructor(model2, client2) {
          this.model = model2;
          this.client = client2;
          this.viewGetAllPeeps();
        }
        viewGetAllPeeps() {
          this.client.getAllPeeps((repoData) => {
            this.displayAllPeeps(repoData);
          });
        }
        displayAllPeeps(allPeepsCollection) {
          console.log(allPeepsCollection);
          const container = document.querySelector("#peeps-container");
          container.innerHTML = "";
          allPeepsCollection.forEach((peep) => {
            const peepContainer = document.createElement("div");
            peepContainer.insertAdjacentText("afterbegin", peep.body);
            peepContainer.style.cssText = "width: calc(100% - 4rem); padding: 1.25rem 2rem; border-bottom:solid 1px lightgrey";
            container.append(peepContainer);
          });
        }
        // display(repoData) {
        //    const repoNameEl = document.querySelector('#repo-name');
        //    const fullName = repoData.full_name;
        //    repoNameEl.innerText = fullName.split("/")[1];
        //    const repoDescriptionEl = document.querySelector('#repo-description');
        //    const description = repoData['description'];
        //    repoDescriptionEl.innerText = description;
        //    const repoImageEl = document.querySelector('#repo-image');
        //    const imageSource = repoData.organization.avatar_url;
        //    repoImageEl.setAttribute('src', imageSource);
        // }
      };
      module.exports = ChitterView2;
    }
  });

  // index.js
  var ChitterClient = require_chitterClient();
  var ChitterModel = require_chitterModel();
  var ChitterView = require_chitterView();
  var client = new ChitterClient();
  var model = new ChitterModel();
  var view = new ChitterView(model, client);
})();
