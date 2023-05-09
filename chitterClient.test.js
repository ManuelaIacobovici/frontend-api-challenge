/**
 *  @jest-environment jsdom
 */

const fs = require('fs');
const ChitterClient = require('./chitterClient');

// This makes `fetch` available to our test
// (it is not by default, as normally `fetch` is only
// available within the browser)
require('jest-fetch-mock').enableMocks()
// const jestFetchMock = require("jest-fetch-mock");
//  jestFetchMock.enableMocks();

describe('ChitterClient class', () => {
  it('calls fetch and loads repo info', (done) => {
    expect(screen.queryByText('#')).not.toBeVisible();
  });
});