class ChitterView {
  constructor(model, client) {
    this.model = model;
    this.client = client;

    // const submitButtonEl = document.querySelector('#submit-button');
    // const repoInputEl = document.querySelector('#repo-name-input');
  
    this.viewGetAllPeeps()

    const submitButtonCreateUserEl = document.querySelector('#submit-button-create-user');
    submitButtonCreateUserEl.addEventListener('click', () => this.viewCreateNewUser());

    const submitButtonLoginUserEl = document.querySelector('#submit-button-login-user');
    submitButtonLoginUserEl.addEventListener('click', () => this.viewLoginUser());

    
    const submitButtonLogoutUserEl = document.querySelector('#submit-button-logout-user');
    submitButtonLogoutUserEl.addEventListener('click', () => this.viewLogoutUser());

    if(sessionStorage.getItem('token') !== undefined && sessionStorage.getItem('token') !== null){
      this.userIsLoggedIn()
    }
  }

  viewGetAllPeeps(){
    this.client.getAllPeeps( repoData => {
      this.displayAllPeeps(repoData)
    });
  }

  viewCreateNewUser() {
    const userNameEl = document.querySelector('#user-name-input');
    const userPasswordEl = document.querySelector('#user-password-input');
    const userName = userNameEl.value
    if (userNameEl.value !== '' && userPasswordEl.value !== ''){
      this.client.createNewUser(userNameEl.value, userPasswordEl.value, repoData => {
        if (Object.values(repoData).includes(userName)) {
          userNameEl.value = '';
          userPasswordEl.value = '';
          this.displayMessage("Welcome to Chitter!", "success")
        } else {
          this.displayMessage("Registration failed, try another user name.", "failure")
        }
      });
    }
  }

  viewLoginUser() {
    const userNameEl = document.querySelector('#user-name-input');
    const userPasswordEl = document.querySelector('#user-password-input');
    
    if (userNameEl.value !== '' && userPasswordEl.value !== ''){
      this.client.createNewSession(userNameEl.value, userPasswordEl.value, repoData => {
        if (Object.keys(repoData).includes('session_key')) {
          userNameEl.value = '';
          userPasswordEl.value = '';
          this.userIsLoggedIn()
          sessionStorage.setItem('token', repoData.session_key)
        } else {
          this.displayMessage("Login failure! Please check the user name and password.", "failure")
        }
      });
    }
  }

  viewLogoutUser(){
    sessionStorage.removeItem('token')
    location.reload()
  }

  userIsLoggedIn(){
    const loginCreateEl = document.querySelector('#login-create');
    loginCreateEl.style.display = "none";
    const logoutEl = document.querySelector('#submit-button-logout-user');
    logoutEl.style.display = "inline-block";
  }

  displayMessage(message, status) {
    const messageEl = document.querySelector('#message');
    if (status === "success") {
      messageEl.style.color = 'darkblue';
    }else {
      messageEl.style.color = 'red';
    }
    messageEl.innerText = message
    setTimeout(() => {
      messageEl.innerText = '';
    }, 3000);
  }

  displayAllPeeps(allPeepsCollection){
    console.log(allPeepsCollection)

    const container = document.querySelector('#peeps-container');
    container.innerHTML = '';

    allPeepsCollection.forEach( peep => {
      const peepContainer = document.createElement('div');
      peepContainer.insertAdjacentText('afterbegin', peep.body)
      peepContainer.style.cssText = 'width: calc(100% - 4rem); padding: 1.25rem 2rem; border-bottom:solid 1px lightgrey'

      container.append(peepContainer)
    })


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
}

module.exports = ChitterView;