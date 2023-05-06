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
        createNewUser(username, pass, callback) {
          const urlSuffix = "users";
          fetch(`${this.baseURL}${urlSuffix}`, {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ "user": { handle: username, password: pass } })
          }).then((response) => response.json()).then((data) => {
            callback(data);
          });
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
          const submitButtonCreateUserEl = document.querySelector("#submit-button-create-user");
          submitButtonCreateUserEl.addEventListener("click", () => this.viewCreateNewUser());
        }
        viewGetAllPeeps() {
          this.client.getAllPeeps((repoData) => {
            this.displayAllPeeps(repoData);
          });
        }
        viewCreateNewUser() {
          const userNameEl = document.querySelector("#user-name-input");
          const userPasswordEl = document.querySelector("#user-password-input");
          const userName = userNameEl.value;
          if (userNameEl.value !== "" && userPasswordEl.value !== "") {
            this.client.createNewUser(userNameEl.value, userPasswordEl.value, (repoData) => {
              if (Object.values(repoData).includes(userName)) {
                userNameEl.value = "";
                userPasswordEl.value = "";
                this.displayMessage("Welcome to Chitter!", "success");
              } else {
                this.displayMessage("Registration failed, try another user name.", "failure");
              }
            });
          }
        }
        displayMessage(message, status) {
          const messageEl = document.querySelector("#message");
          if (status === "success") {
            messageEl.style.color = "darkblue";
          } else {
            messageEl.style.color = "red";
          }
          messageEl.innerText = message;
          setTimeout(() => {
            messageEl.innerText = "";
          }, 3e3);
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
