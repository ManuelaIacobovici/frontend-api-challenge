class ChitterView {
  constructor(model, client) {
    this.model = model;
    this.client = client;

    // const submitButtonEl = document.querySelector('#submit-button');
    // const repoInputEl = document.querySelector('#repo-name-input');
  
    this.viewGetAllPeeps()


    // submitButtonEl.addEventListener('click', () => {
    //   const repoName = repoInputEl.value;

    //   this.client.getRepoInfo(repoName, repoData => {
    //     console.log(repoData);
    //     this.display(repoData)
    //   });
    // });
  }

  viewGetAllPeeps(){
    this.client.getAllPeeps( repoData => {
      this.displayAllPeeps(repoData)
    });
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