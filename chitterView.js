class ChitterView {
  constructor(model, client) {
    this.model = model;
    this.client = client;

    const submitButtonEl = document.querySelector('#submit-button');
    const repoInputEl = document.querySelector('#repo-name-input');

    submitButtonEl.addEventListener('click', () => {
      const repoName = repoInputEl.value;

      this.client.getRepoInfo(repoName, repoData => {
        console.log(repoData);
        this.display(repoData)
      });
    });
  }

  display(repoData) {
     const repoNameEl = document.querySelector('#repo-name');
     const fullName = repoData.full_name;
     repoNameEl.innerText = fullName.split("/")[1];

     const repoDescriptionEl = document.querySelector('#repo-description');
     const description = repoData['description'];
     repoDescriptionEl.innerText = description;

     const repoImageEl = document.querySelector('#repo-image');
     const imageSource = repoData.organization.avatar_url;
     repoImageEl.setAttribute('src', imageSource);
  }
}

module.exports = ChitterView;