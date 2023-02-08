/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = (on, config) => {
  if (config.testingType === 'component') {
    const { startDevServer } = require('@cypress/webpack-dev-server');
    const webpackConfig = require('../webpack.cypress.config');

    on('dev-server:start', options => startDevServer({ options, webpackConfig }));
  }
};
