const ChitterClient = require("./chitterClient");
const ChitterModel = require("./chitterModel");
const ChitterView = require("./chitterView");

const client = new ChitterClient();
const model = new ChitterModel();
const view = new ChitterView(model, client);