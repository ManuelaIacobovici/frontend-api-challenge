const GithubClient = require("./chitterClient");
const GithubModel = require("./chitterModel");
const GithubView = require("./chitterView");

const client = new GithubClient();
const model = new GithubModel();
const view = new GithubView(model, client);