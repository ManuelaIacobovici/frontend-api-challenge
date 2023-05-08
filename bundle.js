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
        createNewSession(username, pass, callback) {
          const urlSuffix = "sessions";
          fetch(`${this.baseURL}${urlSuffix}`, {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ "session": { handle: username, password: pass } })
          }).then((response) => response.json()).then((data) => {
            callback(data);
          });
        }
        getAllPeeps(callback) {
          const urlSuffix = "peeps";
          fetch(`${this.baseURL}${urlSuffix}`).then((response) => response.json()).then((data) => {
            callback(data);
          });
        }
        createNewPeep(peepBody, callback) {
          const urlSuffix = "peeps";
          const token = sessionStorage.getItem("token");
          const userId = sessionStorage.getItem("userId");
          if (token !== void 0 && token !== null) {
            fetch(`${this.baseURL}${urlSuffix}`, {
              method: "POST",
              headers: new Headers({
                "Authorization": "Token  token=" + token,
                "Content-Type": "application/json"
              }),
              body: JSON.stringify({ "peep": { user_id: userId, body: peepBody } })
            }).then((response) => response.json()).then((data) => {
              callback(data);
            });
          }
        }
        getPeepById(id) {
          const urlSuffix = `peeps/${id}`;
        }
        deletePeepById(id, callback) {
          const urlSuffix = `peeps/${id}`;
          const token = sessionStorage.getItem("token");
          const userId = sessionStorage.getItem("userId");
          if (token !== void 0 && token !== null) {
            fetch(`${this.baseURL}${urlSuffix}`, {
              method: "DELETE",
              headers: new Headers({
                "Authorization": "Token  token=" + token
              })
            }).then((data) => {
              callback(data);
            });
          }
        }
        // setPeepLike(id, token, userId) {
        //   const urlSuffix = `peeps/${id}/likes/1`;
        // }
        // setPeepUnlike(id, token, userId) {
        //   const urlSuffix = `peeps/${id}/likes/1`;
        // }
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
          const submitButtonLoginUserEl = document.querySelector("#submit-button-login-user");
          submitButtonLoginUserEl.addEventListener("click", () => this.viewLoginUser());
          const submitButtonLogoutUserEl = document.querySelector("#submit-button-logout-user");
          submitButtonLogoutUserEl.addEventListener("click", () => this.viewLogoutUser());
          const submitButtonPeepEl = document.querySelector("#submit-button-peep");
          submitButtonPeepEl.addEventListener("click", () => this.viewCreatePeep());
          const token = sessionStorage.getItem("token");
          if (token !== void 0 && token !== null) {
            this.userIsLoggedIn();
          }
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
        viewLoginUser() {
          const userNameEl = document.querySelector("#user-name-input");
          const userPasswordEl = document.querySelector("#user-password-input");
          if (userNameEl.value !== "" && userPasswordEl.value !== "") {
            this.client.createNewSession(userNameEl.value, userPasswordEl.value, (repoData) => {
              if (Object.keys(repoData).includes("session_key")) {
                userNameEl.value = "";
                userPasswordEl.value = "";
                this.userIsLoggedIn();
                sessionStorage.setItem("userId", repoData.user_id);
                sessionStorage.setItem("token", repoData.session_key);
                this.viewGetAllPeeps();
              } else {
                this.displayMessage("Login failure! Please check the user name and password.", "failure");
              }
            });
          }
        }
        viewLogoutUser() {
          sessionStorage.removeItem("token");
          location.reload();
        }
        viewCreatePeep() {
          const peepEl = document.querySelector("#peep-body");
          this.client.createNewPeep(peepEl.value, () => {
            const peepEl2 = document.querySelector("#peep-body");
            peepEl2.value = "";
            this.viewGetAllPeeps();
          });
        }
        userIsLoggedIn() {
          const loginCreateEl = document.querySelector("#login-create");
          loginCreateEl.style.display = "none";
          const logoutEl = document.querySelector("#submit-button-logout-user");
          logoutEl.style.display = "inline-block";
          const peepGroupEL = document.querySelector("#peep-group");
          peepGroupEL.style.display = "inline-block";
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
          const container = document.querySelector("#peeps-container");
          container.innerHTML = "";
          allPeepsCollection.forEach((peep) => {
            const peepContainer = document.createElement("div");
            peepContainer.style.cssText = "margin-left: 0.25rem;width: calc(100% - 4rem); padding: 1rem 2rem 0.75rem 1.25rem; border-bottom:solid 1px lightgrey";
            this.addPeeper(peep, peepContainer);
            this.addPeepBody(peep, peepContainer);
            this.addLikes(peep, peepContainer);
            const token = sessionStorage.getItem("token");
            if (token !== void 0 && token !== null) {
              this.addDeleteButton(peep, peepContainer);
            }
            container.append(peepContainer);
          });
        }
        addPeeper(peep, peepContainer) {
          const userNameEl = document.createElement("div");
          userNameEl.style.cssText = "font-family: arial;  opacity: 0.9;";
          userNameEl.insertAdjacentText("afterbegin", `${peep.user.handle}: `);
          peepContainer.insertAdjacentElement("beforeend", userNameEl);
        }
        addPeepBody(peep, peepContainer) {
          const peepEl = document.createElement("div");
          peepEl.style.cssText = "padding: 0.75rem 1rem 0rem 9rem; font-size:1.15em; font-family: Helvetica; color: grey";
          peepEl.insertAdjacentText("afterbegin", `${peep.body}`);
          peepContainer.insertAdjacentElement("beforeend", peepEl);
        }
        addLikes(peep, peepContainer) {
          const likesEl = document.createElement("div");
          likesEl.style.cssText = "font-family: arial;  opacity: 0.9; ";
          likesEl.insertAdjacentHTML("afterbegin", '<i class="fa fa-thumbs-up" style="font-size:1.25em; color: #185dcc"></i>');
          likesEl.insertAdjacentText("afterbegin", `${peep.likes.length} `);
          peepContainer.insertAdjacentElement("beforeend", likesEl);
        }
        addDeleteButton(peep, peepContainer) {
          if (peep.user.id == sessionStorage.getItem("userId")) {
            const deleteButtonEl = document.createElement("input");
            deleteButtonEl.setAttribute("type", "button");
            deleteButtonEl.setAttribute("value", "X");
            deleteButtonEl.setAttribute("style", "float: right; color: red; margin-right: -1.5rem; margin-top: -1rem;");
            const newButton = peepContainer.insertAdjacentElement("beforeend", deleteButtonEl);
            newButton.addEventListener("click", () => {
              this.client.deletePeepById(peep.id, () => {
                this.viewGetAllPeeps();
              });
            });
          }
        }
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
